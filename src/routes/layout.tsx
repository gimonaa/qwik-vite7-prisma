import { component$, Slot } from "@qwik.dev/core";
import {
  type RequestHandler,
  type DocumentHead,
  routeLoader$,
} from "@qwik.dev/router";
// import { prisma } from "~/lib/prismaClient";
// import { PrismaClient } from "@prisma/client";
import { prisma } from '~/lib/prisma.server';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  // cacheControl({
  //   // Always serve a cached response by default, up to a week stale
  //   staleWhileRevalidate: 60,     // 60 * 60 * 24 * 7,
  //   // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
  //   maxAge: 5,
  // });
  cacheControl({
    // public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  });
};

export const useGetLastVersion = routeLoader$(async () => {
  try {
    const version = await prisma.version.findFirst({ orderBy: { id: "desc" } });
    return version;
  } catch (error) {
    console.error(error);
  }
});

export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});

// export const head: DocumentHead = {
//   // title: "Atmodesk",
//   meta: [
//     {
//       name: "description",
//       content: "Atmodesk tools",
//     },
//     {
//       name: "mobile-web-app-capable",
//       content: "yes",
//     },
//     {
//       name: "apple-mobile-web-app-capable",
//       content: "yes",
//     },
//     {
//       name: "apple-mobile-web-app-status-bar-style",
//       content: "black",
//     },
//     {
//       name: "apple-mobile-web-app-title",
//       content: "Atmodesk",
//     },
//     {
//       name: "msapplication-TileColor",
//       content: "#000000",
//     },
//     {
//       name: "msapplication-TileImage",
//       content: "/favicon.svg",
//     },
//     {
//       name: "theme-color",
//       content: "#000000",
//     },
//   ],
//   links: [
//     {
//       rel: "apple-touch-icon",
//       href: "/icon/apple-touch-icon.png",
//     },
//     {
//       rel: "icon",
//       href: "/favicon.svg",
//       type: "image/svg+xml",
//     },
//     {
//       rel: "manifest",
//       href: "/manifest.json",
//     },
//     {
//       rel: "mask-icon",
//       href: "/favicon.svg",
//     },
//   ],
// };

export const head: DocumentHead = ({ head }) => {
  return {
    title: `Atmodesk ${head.title ? `> ${head.title}` : ""}`,
    meta: [
      {
        name: "description",
        content: "Atmodesk tools",
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
      {
        name: "apple-mobile-web-app-title",
        content: "Atmodesk",
      },
      {
        name: "msapplication-TileColor",
        content: "#000000",
      },
      {
        name: "msapplication-TileImage",
        content: "/favicon.svg",
      },
      {
        name: "theme-color",
        content: "#000000",
      },
    ],
    links: [
      {
        rel: "apple-touch-icon",
        href: "/icon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "mask-icon",
        href: "/favicon.svg",
      },
    ],
  };
};
