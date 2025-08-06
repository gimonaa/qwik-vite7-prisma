import { component$, Slot } from "@qwik.dev/core";
import { routeAction$, zod$, z} from "@qwik.dev/router";
import { PrismaClient } from "@prisma/client";

export const useCreateUser = routeAction$(
  async (data) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data,
    });
    return user;
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
  }),
);

export default component$(() => {
  return (
    <>
    Layout
      <Slot></Slot>
    </>
  );
});
