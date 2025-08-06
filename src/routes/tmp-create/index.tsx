// import { component$ } from "@qwik.dev/core";
// import {  Form } from "@qwik.dev/router";
// // import { useCreateUser } from "./layout";

// import { routeAction$, zod$, z} from "@qwik.dev/router";
// // import { PrismaClient } from "@prisma/client";
// import { prisma } from '~/lib/prisma.server';

// // export const prisma = new PrismaClient();

// export const useCreateUser = routeAction$(
//   async (data) => {
//     // const prisma = new PrismaClient();
//     const user = await prisma.user.create({
//       data,
//     });
//     return user;
//   },
//   zod$({
//     name: z.string(),
//     email: z.string().email(),
//   }),
// );

// export default component$(() => {
//   const createUserAction = useCreateUser();
//   return (
//     <section>
//       <h1>Create User</h1>
//       <Form action={createUserAction}>
//         <label>
//           Name
//           <input name="name" value={createUserAction.formData?.get("name")} />
//         </label>
//         <label>
//           Email
//           <input name="email" value={createUserAction.formData?.get("email")} />
//         </label>
//         <button type="submit">Create</button>
//       </Form>
//       {createUserAction.value && (
//         <div>
//           <h2>User created successfully!</h2>
//         </div>
//       )}
//     </section>
//   );
// });
