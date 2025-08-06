import { component$, Slot } from "@qwik.dev/core";
import {
  type RequestHandler,
  routeLoader$,
  routeAction$,
  z,
  zod$,
  server$,
  type DocumentHead,
} from "@qwik.dev/router";
import { prisma } from "~/lib/prisma.server";
import { createHmac } from "crypto";
import { serverSendEmail } from "~/lib/sendMail";
import { type Session } from "@auth/qwik";

// Verifica se l'utente è admin
export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/login?callbackUrl=${event.url.pathname}`);
    // throw event.redirect(302, `/api/auth/signin?callbackUrl=${event.url.pathname}`);
  }
  if (session.user.role !== "ADMIN") {
    throw event.redirect(302, `/error/unauthorized/`);
  }
};

// Loaders per la sezione ADMIN

export const useGetUsersHistory = routeLoader$(async () => {
  const usershistory = await prisma.userHistory.findMany({
    select: {
      user: { select: { email: true } },
      route: true,
      datetime: true,
    },
    orderBy: { datetime: "desc" },
    take: 200,
  });
  const transformedUsersHistory = usershistory.map((history) => ({
    userName: history.user.email || "Unknown",
    route: history.route,
    datetime: history.datetime,
  }));
  return transformedUsersHistory;
});

export const useGetRoles = routeLoader$(async () => {
  const roles = await prisma.role.findMany();
  return roles;
});

export const useGetUsersOrd = routeLoader$(async () => {
  console.log("carico lista utenti");
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      lastlogin: true,
    },
    orderBy: { id: "asc" },
  });
  return users;
});

export const useGetUserByUId = routeLoader$(async ({ params, status }) => {
  const userId = parseInt(params["userId"], 10);
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      // Set the status to 404 if the user is not found
      status(404);
    }
    return user;
  }
});

// Actions per la sezione ADMIN

export const useDelUser = routeAction$(
  async (data) => {
    console.log("deleteing userId: " + data.id);
    const user = await prisma.user.delete({ where: { id: data.id } });
    return {
      success: true,
      user,
    };
  },
  zod$({ id: z.number() }),
);

export const useCreateUser = routeAction$(
  async (data, req) => {
    const secret = String(req.env.get("AUTH_SECRET"));
    const pass = String(data.password);
    const appName = import.meta.env.PUBLIC_NAME;
    const appUrl = import.meta.env.PUBLIC_URL;
    data.password = createHmac("sha256", secret)
      .update(data.password)
      .digest("hex");
    try {
      const user = await prisma.user.create({ data });
      await serverSendEmail(
        {
          to: data.email,
          bcc: "alessandro.gimona@meteo.fvg.it",
          subject: appName + " - Creazione account " + data.name,
          text:
            appName +
            " - Creazione account: " +
            data.name +
            "\n\n" +
            appUrl +
            "\n" +
            "username: " +
            data.email +
            "\n" +
            "password: " +
            pass +
            "\n\n" +
            req.env.get("EMAIL_FOOTER"),
        },
        "useradd",
      );
      return user;
    } catch (e: any) {
      // console.log(e);
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email",
        );
        return {
          error: "Errore creazione utente: indirizzo email già presente",
        };
      }
    }
  },
  zod$({
    name: z.string(),
    email: z.string().email("indirizzo email non valido"),
    password: z
      .string()
      .min(1, "inserisci la password")
      .min(8, "la password deve essere lunga almeno 8 caratteri"),
    role: z.string().min(1, "ruolo mancante"),
  }),
);

export const useUpdatePasswordUserAction = routeAction$(
  async (data, req) => {
    if (data.password != data.password2) {
      return { error: "le password non corrispondono" };
    }
    // console.log(data);
    // data.id = Number(data.id);
    const secret = String(req.env.get("AUTH_SECRET"));
    const appName = import.meta.env.PUBLIC_NAME;
    const appUrl = import.meta.env.PUBLIC_URL;
    // const newpass = String(data.password);
    data.password = createHmac("sha256", secret)
      .update(data.password)
      .digest("hex");
    try {
      const user = await prisma.user.update({
        where: { id: +data.id },
        data: { password: data.password },
      });
      // console.debug("dbg user:",user);
      const email = await serverSendEmail(
        {
          to: data.email,
          bcc: "alessandro.gimona@meteo.fvg.it",
          subject: appName + " - modifica password account " + data.name,
          text:
            appName +
            " - modifica password account: " +
            data.name +
            "\n\n" +
            appUrl +
            "\n" +
            "username: " +
            data.email +
            "\n" +
            "password: " +
            data.password2 +
            "\n\n" +
            req.env.get("EMAIL_FOOTER"),
        },
        "useradd",
      );
      console.log("password changed for userId " + data.id);
      return { success: true, user, email };
    } catch (e: any) {
      console.debug(e);
      return {
        error: "Errore:" + e.message,
      };
    }
  },
  zod$({
    id: z
      .string()
      .refine((value) => !isNaN(Number(value)))
      .transform((value) => Number(value)),
    password: z
      .string()
      .min(1, "inserisci la password")
      .min(8, "la password deve essere lunga almeno 8 caratteri"),
    password2: z
      .string()
      .min(1, "inserisci la password")
      .min(8, "la password deve essere lunga almeno 8 caratteri"),
    email: z.string().email("indirizzo email non valido"),
    name: z.string(),
  }),
);

export const useUpdateUser = routeAction$(
  async (data) => {
    console.log(data);
    // data.id = Number(data.id);
    const user = await prisma.user.update({
      where: { id: +data.id },
      data,
    });
    return user;
  },
  zod$({
    id: z
      .string()
      .refine((value) => !isNaN(Number(value)))
      .transform((value) => Number(value)),
    name: z.string(),
    email: z.string().email("enter a valid email"),
    role: z.string(),
  }),
);

// Server functions

export const serverEmailList = server$(async (order: string) => {
  // Define the orderBy condition dynamically
  const orderByCondition = {} as any;
  if (order) {
    const [field, direction] = order.split(":");
    orderByCondition[field === "user" ? "userId" : field] = direction;
  } else {
    orderByCondition["datetime"] = "desc";
  }
  console.log("carico lista email");
  const email = await prisma.email.findMany({
    select: {
      datetime: true,
      application: true,
      recipient: true,
      subject: true,
      response: true,
      user: { select: { name: true } },
    },
    orderBy: orderByCondition,
    take: 1000,
  });

  const emails = email.map((email) => ({
    ...email,
    user: email.user.name || null,
  }));

  return emails;
});

export const serverGetUsers = server$(async (order: string) => {
  // Define the orderBy condition dynamically
  const orderByCondition = {} as any;
  if (order) {
    const [field, direction] = order.split(":");
    orderByCondition[field] = direction;
  } else {
    orderByCondition["id"] = "asc";
  }

  console.log("carico lista utenti");
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      lastlogin: true,
    },
    orderBy: orderByCondition,
  });
  return users;
});

export default component$(() => {
  return (
    <>
      <div
        class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800"
        role="info"
      >
        <span class="font-medium">Admin Layout</span>
      </div>
      <Slot></Slot>
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: `Admin`,
  };
};
