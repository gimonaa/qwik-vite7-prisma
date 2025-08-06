// declare module "next-auth" {
//     /**
//      * The shape of the user object returned in the OAuth providers' `profile` callback,
//      * or the second parameter of the `session` callback, when using a database.
//      */
//     interface User {
//     }
//     /**
//      * The shape of the account object returned in the OAuth providers' `account` callback,
//      * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
//      */
//     interface Account {}

//     /**
//      * Returned by `useSession`, `auth`, contains information about the active session.
//      */
//     interface Session {}
//   }

//   // The `JWT` interface can be found in the `next-auth/jwt` submodule
//   import { JWT } from "next-auth/jwt"

//   declare module "next-auth/jwt" {
//     /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//     interface JWT {
//       /** OpenID ID Token */
//       idToken?: string
//     }
//   }

// import {type DefaultSession}  from "next-auth";

// // declare module "@auth/qwik" {
// //     interface Session {
// //       user?: {
// //         roles: string;
// //       } & DefaultSession["user"];
// //     }

// //   }

// declare module "@auth/core/jwt" {
//     interface JWT {
//       role: string
//       id: string
//     }
// }

// declare module "@auth/core/types" {

//     interface Session  {
//         user?: {
//             role: string
//             id: string
//         } & DefaultSession["user"];
//     }

//     interface User {
//         role: string
//         id: string
//     }

// }
