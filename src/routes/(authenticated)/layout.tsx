import { 
  // $, 
  component$, 
  // type Signal, 
  Slot } from "@qwik.dev/core";
import {
  routeLoader$,
  // routeAction$,
  // zod$,
  // z,
  server$,
  useLocation,
} from "@qwik.dev/router";
import { type RequestHandler } from "@qwik.dev/router";
import { Navbar } from "~/components/navbar/navbar";
import Footer from "../../components/footer";
// import { prisma } from "~/lib/prismaClient";
// import { PrismaClient } from "@prisma/client";
import { prisma } from '~/lib/prisma.server';
import { useSession } from "~/routes/plugin@auth";
// import { createHmac } from "crypto";
// import fs from "node:fs/promises";
// import moment from "moment";
// import sharp from "sharp";
import { type Session } from "@auth/qwik";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  // cacheControl({
  //   public: true,
  //   maxAge: 5,
  //   sMaxAge: 10,
  //   staleWhileRevalidate: 60 * 60 * 24 * 365,
  // });
  cacheControl({
    // public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 60,
  });
};

export const onRequest: RequestHandler = async (event) => {
  const session: Session | null = event.sharedMap.get("session");

  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/login?callbackUrl=${event.url.pathname}`);
  }

  const role = session.user.role;
  // console.debug("url:",event.url.pathname)
  // const permit = await prisma.menu.findMany({
  //   where: {
  //     OR: [{ permit: { contains: "USER" } }, { permit: { contains: role } }],
  //     url: event.url.pathname,
  //   },
  // });
  // const permit = await permitUser(role, event.url.pathname);
  // console.debug("permit:",permit)

  if (
    role !== "ADMIN" &&
    // permit.length === 0 &&
    !event.url.pathname.match("/iframe/") &&
    !event.url.pathname.match("/dashboard/") &&
    !event.url.pathname.match("/stazioni/dettaglio/") &&
    !event.url.pathname.match("/preweb/edit/") &&
    !event.url.pathname.match("/browse/prodotti/dettaglio/") &&
    !event.url.pathname.match("/edit/info/")
  ) {
    throw event.redirect(302, `/error/unauthorized/`);
  }
};

// Funzioni
// async function permitUser (userRole: string, pathname: string) {
  // const prisma = new PrismaClient();
  // const permit = await prisma.menu.findMany({
  // where: {
  //     OR: [{ permit: { contains: "USER" } }, { permit: { contains: userRole } }],
  //     url: pathname,
  //   },
  // });
  // return permit
  // return []
// }

// export const getLastInSeries = $((min: number, max: number, inc: number) => {
//   if (inc <= 0) throw new Error("Increment must be greater than 0");
//   const steps = Math.floor((max - min) / inc);
//   console.debug("steps", min + steps * inc);
//   return min + steps * inc;
// });

// export const mouseWheelStepSig = $(
//   async (
//     e: WheelEvent,
//     stepCurrSig: Signal,
//     stepMinSig: Signal,
//     stepMaxSig: Signal,
//     stepIncSig: Signal,
//   ) => {
//     e.preventDefault();
//     if (e.deltaY < 0) {
//       stepCurrSig.value =
//         stepCurrSig.value <= stepMinSig.value
//           ? stepMinSig.value
//           : stepCurrSig.value - stepIncSig.value;
//     } else if (e.deltaY > 0) {
//       const lastInSeries = await getLastInSeries(
//         stepMinSig.value,
//         stepMaxSig.value,
//         stepIncSig.value,
//       );
//       stepCurrSig.value =
//         stepCurrSig.value >= lastInSeries
//           ? lastInSeries
//           : stepCurrSig.value + stepIncSig.value;
//     }
//   },
// );

// // Date functions
// export const zeroPad = (num: number, places: number) =>
//   String(num).padStart(places, "0");

// export type dateFormat =
//   | "YYYY-MM-DD"
//   | "YYYYMMDD"
//   | "YYYYMMDDHHmm"
//   | "YYYY"
//   | "MM"
//   | "DD"
//   | "HH:mm";

// export const useymdTime = (
//   time?: Date,
//   inc?: number,
//   format?: dateFormat,
//   hhinc?: number,
// ) => {
//   if (!time) {
//     time = new Date();
//   }

//   if (hhinc) {
//     time.setHours(time.getHours() + hhinc);
//   }

//   const hh = zeroPad(time.getHours(), 2);
//   const mn = zeroPad(time.getMinutes(), 2);

//   if (!hhinc) {
//     time.setUTCHours(0, 0, 0, 0);
//   }

//   if (inc) {
//     time.setDate(time.getDate() + inc);
//   }
//   const y = time.getFullYear();
//   const m = zeroPad(time.getMonth() + 1, 2);
//   const d = zeroPad(time.getDate(), 2);

//   switch (format) {
//     case "YYYYMMDDHHmm":
//       return `${y}${m}${d}${hh}${mn}`;
//     case "YYYY-MM-DD":
//       return `${y}-${m}-${d}`;
//     case "YYYYMMDD":
//       return `${y}${m}${d}`;
//     case "YYYY":
//       return `${y}`;
//     case "MM":
//       return `${m}`;
//     case "DD":
//       return `${d}`;
//     case "HH:mm":
//       return `${hh}:${mn}`;
//     default:
//       return `${y}-${m}-${d}`;
//   }
// };

// export const StrImg2Date = (str: string) => {
//   const regex = /_(\d{10})_(\d{3})_/;
//   const match = str.match(regex);
//   const regex2 = /_(\d{10})_/;
//   const match2 = str.match(regex2);
//   if (match) {
//     const dateString = match[1]; // "2024101800"
//     const hoursOffset = match[2]; // "018"
//     const year = dateString.substring(0, 4);
//     const month = dateString.substring(4, 6);
//     const day = dateString.substring(6, 8);
//     const hour = dateString.substring(8, 10);
//     const baseDate = moment(
//       `${year}-${month}-${day} ${hour}:00`,
//       "YYYY-MM-DD HH:mm",
//     );
//     const finalDate = baseDate.add(parseInt(hoursOffset, 10), "hours");
//     return {
//       baseDate: baseDate.format("YYYY-MM-DD HH:mm"),
//       finalDate: finalDate.format("YYYY-MM-DD HH:mm"),
//     };
//   } else if (match2) {
//     const dateString = match2[1]; // "2024101800"
//     const year = dateString.substring(0, 4);
//     const month = dateString.substring(4, 6);
//     const day = dateString.substring(6, 8);
//     const hour = dateString.substring(8, 10);
//     const baseDate = moment(
//       `${year}-${month}-${day} ${hour}:00`,
//       "YYYY-MM-DD HH:mm",
//     );

//     return {
//       baseDate: baseDate.format("YYYY-MM-DD HH:mm"),
//       finalDate: baseDate.format("YYYY-MM-DD HH:mm"),
//     };
//   }

//   throw new Error("Invalid filename format." + str);
// };

// export const checkRouteRole = async (route: string, role: string) => {
//   const permit = await prisma.menu.findMany({
//     where: {
//       OR: [{ permit: { contains: "USER" } }, { permit: { contains: role } }],
//       url: { contains: route },
//     },
//   });
//   // console.debug("check permit function", route, role, permit.length, permit);
//   if (permit.length > 0) {
//     return true;
//   }
//   return false;
// };

// export const useGetTime = routeLoader$(async () => {
//   return { time: new Date() };
// });

// // Loaders
// export const useGetVersionHistory = routeLoader$(async () => {
//   try {
//     const history = await prisma.version.findMany({
//       orderBy: { id: "desc" },
//       take: 10,
//     });
//     return history;
//   } catch (error) {
//     console.error(error);
//   }
// });

export const useGetMenu = routeLoader$(async ({ sharedMap }) => {
  const session = sharedMap.get("session");
  const role = session.user.role;
  const email = session.user.email;

  const isAdmin = role === "ADMIN"; // Verifica se l'utente è admin
  const menu = await prisma.menu.findMany({
    where: {
      parrentMenuId: null, // Solo i menu principali
      OR: isAdmin
        ? undefined
        : [{ permit: { contains: "USER" } }, { permit: { contains: role } }],
    },
    select: {
      id: true,
      title: true,
      svg: true,
      url: true,
      order: true,
      subMenu: {
        where: isAdmin
          ? undefined
          : {
              OR: [
                { permit: { contains: "USER" } },
                { permit: { contains: role } },
              ],
            },
        select: {
          id: true,
          title: true,
          svg: true,
          url: true,
          order: true,
          subMenu: {
            where: isAdmin
              ? undefined
              : {
                  OR: [
                    { permit: { contains: "USER" } },
                    { permit: { contains: role } },
                  ],
                },
            select: {
              id: true,
              title: true,
              svg: true,
              url: true,
              order: true,
            },
          },
        },
      },
    },
    orderBy: { order: "asc" },
  });

  // const menu = await prisma.menu.findMany({
  //     select: {
  //         id: true,
  //         title: true,
  //         svg: true,
  //         url: true,
  //         order: true,
  //         subMenu: true,
  //       },
  //       where: {
  //         parrentMenuId: null ,
  //         OR: [
  //           {permit: { contains : "USER"}},
  //           {permit: { contains : role}}
  //         ],

  //       },
  //       orderBy:{ order: "asc"},
  // });

  console.log("carico menu for: " + email);
  // console.debug(menu)

  return menu;
});

// // Actions
// export const useUpdatePasswordCurrentUserAction = routeAction$(
//   async (data, req) => {
//     if (data.password != data.password2) {
//       return { error: "le password non corrispondono" };
//     }
//     const secret = String(req.env.get("AUTH_SECRET"));
//     data.currentpassword = createHmac("sha256", secret)
//       .update(data.currentpassword)
//       .digest("hex");
//     data.password = createHmac("sha256", secret)
//       .update(data.password)
//       .digest("hex");
//     const session = req.sharedMap.get("session");

//     const curruser = await prisma.user.findUnique({
//       select: { id: true },
//       where: { id: Number(session.user.id), password: data.currentpassword },
//     });
//     if (curruser) {
//       const user = await prisma.user.update({
//         where: { id: curruser.id },
//         data: { password: data.password },
//       });
//       console.log("password changed for userId " + data.id);
//       return { success: true, user };
//     } else {
//       return { errorCurrentPass: "password non corretta" };
//     }
//   },
//   zod$({
//     id: z.any(),
//     currentpassword: z
//       .string()
//       .min(1, "inserisci la password")
//       .min(8, "la password deve essere lunga almeno 8 caratteri"),
//     password: z
//       .string()
//       .min(1, "inserisci la password")
//       .min(8, "la password deve essere lunga almeno 8 caratteri"),
//     password2: z
//       .string()
//       .min(1, "inserisci la password")
//       .min(8, "la password deve essere lunga almeno 8 caratteri"),
//   }),
// );

// ////  funzioni server$  ////

export const serverLogUserHistory = server$(async function (
  userid: number,
  url: string,
) {
  console.log("logging ... " + url);
  try {
    await prisma.userHistory.create({
      data: {
        userId: +userid,
        route: url,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// export const serverUserHistory = server$(async function (
//   userid: number | string | undefined,
// ) {
//   if (!userid) return null;
//   const history = await prisma.userHistory.findMany({
//     where: {
//       userId: +userid,
//     },
//     orderBy: {
//       datetime: "desc",
//     },
//     distinct: ["route"],
//     take: 10,
//   });
//   return history;
// });

// export const serverJson = server$(async function (url: string) {
//   try {
//     // console.log(url)
//     const data = await fs.readFile(url, "utf-8");

//     // Sostituisce i NaN con null o stringa "NaN"
//     const cleanedData = data.replace(/\bNaN\b/g, "null");

//     const parsedData: any = JSON.parse(cleanedData);
//     // console.debug("parsedData:", parsedData);
//     return parsedData;
//   } catch (err) {
//     console.debug("errore:", err);
//     // return null
//   }
// });

// export const serverPlainText = server$(async function (url: string) {
//   try {
//     const data = await fs.readFile(url, "utf-8");
//     // console.log(data.toString())
//     return Buffer.from(data).toString() as string;
//   } catch (err) {
//     console.debug(err);
//     // return "" as string
//   }
// });

// export const serverText = server$(async function (url: string) {
//   try {
//     const data = await fs.readFile(url, "utf-8");
//     // console.log(data.toString())
//     return Buffer.from(data)
//       .toString()
//       .replace(/\n/g, "<br/>")
//       .replace(/ /g, "&nbsp;") as string;
//   } catch (err) {
//     console.debug(err);
//     // return "" as string
//   }
// });

// export const serverPathExists = server$(async function (url: string) {
//   try {
//     await fs.access(url, fs.constants.R_OK);
//     return true;
//   } catch (err) {
//     console.error(`Error ${url}:`, err);
//     return false;
//   }
// });

// /*
//  *  serverImg: legge un file e restituisce l'immagine come base64
//  */
// export const serverImg = server$(async function (url: string) {
//   const userAgent = this.request.headers.get("User-Agent") || "";
//   // console.debug("userAgent:", userAgent);
//   const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
//   // console.debug("isMobile:", isMobile);

//   try {
//     // console.log(`loading ${url}`)
//     const data = await fs.readFile(url);
//     let image = sharp(data);
//     if (isMobile) {
//       image = image.resize({ width: 600, withoutEnlargement: true });
//     } else {
//       image = image.resize({ width: 1500, withoutEnlargement: true });
//     }

//     const webpBuffer = await image.webp({ quality: 80 }).toBuffer();
//     // const base64Image = Buffer.from(data).toString("base64");
//     const base64Image = webpBuffer.toString("base64");
//     // const base64ImageStr = `data:image/png;base64,${base64Image}`;
//     const base64ImageStr = `data:image/webp;base64,${base64Image}`;
//     console.log(`loaded ${url}`);
//     return base64ImageStr;
//   } catch (err) {
//     console.error(`Error reading file ${url}:`, err);
//     return null;
//   }
// });

// /*
//  *  serverListFiles: legge una cartella e restituisce un array di nomi file
//  */
// export const serverListFiles = server$(async function (path: string) {
//   try {
//     console.log(`loading ${path}`);
//     const list = await fs.readdir(path);
//     const files = list.filter((file) =>
//       file.match(/\.(jpg|jpeg|png|gif|webp)$/i),
//     );
//     console.log(`loaded ${path}`);
//     return files as string[] | null;
//   } catch (err) {
//     console.error(`Error reading directory ${path}:`, err);
//     return null;
//   }
// });

// /*
//  *  serverListImg: legge una cartella e restituisce un array di oggetti {name: nomeFile, image: immagineBase64}
//  */
// export const serverListImg = server$(async function (
//   path: string,
//   limit: number,
//   target: string = "",
//   target1: string = "",
// ) {
//   try {
//     console.log(
//       `loading ${path} limit ${limit} target ${target} target1 ${target1}`,
//     );
//     const list = await fs.readdir(path);
//     const limitedFiltered1 = list.filter((file) => file.includes(target1));
//     const limitedFiltered = limitedFiltered1.filter((file) =>
//       file.includes(target),
//     );
//     const limitedList = limitedFiltered.slice(
//       Math.max(limitedFiltered.length - limit, 0),
//     );
//     const images = await Promise.all(
//       limitedList.map(async (v) => {
//         try {
//           if (v.match(/\.(jpg|jpeg|png|gif)$/i) === null) {
//             const txt = await serverPlainText(path + v);
//             return { name: v, image: null, text: txt };
//           } else {
//             const img = await serverImg(path + v);
//             return { name: v, image: img, text: null };
//           }
//         } catch (err) {
//           console.error(`Error loading image ${v} from ${path}:`, err); // Added error logging
//           // return null;
//         }
//       }),
//     );

//     return images as
//       | { name?: string; image?: string; text?: string | null }[]
//       | null;
//   } catch (err) {
//     console.error(`Error reading directory ${path}:`, err);
//     return null;
//   }
// });

// /*
//  * serverListImgRange: legge una cartella e restituisce un array di oggetti {name: nomeFile, image: immagineBase64}
//  */
// export const serverListImgRange = server$(async function (
//   path: string,
//   ymd: string,
//   hm: string,
//   hours: number,
//   target: string = "",
// ) {
//   try {
//     console.log(
//       `loading imgrange ${path} ymd ${ymd} hm ${hm} past ${hours} target ${target && target}`,
//     );

//     const date = ymd.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
//     const ymdstart = moment(`${date} ${hm}`)
//       .subtract(hours, "hours")
//       .format("YYYYMMDD");
//     const hmstart = moment(`${date} ${hm}`)
//       .subtract(hours, "hours")
//       .format("HHmm");
//     const yend = ymdstart.substring(0, 4);
//     const ymdend = moment(`${date} ${hm}`).format("YYYYMMDD");
//     const hmend = moment(`${date} ${hm}`).format("HHmm");
//     const ystart = ymdstart.substring(0, 4);

//     console.log(
//       `ymdstart ${ymdstart} hh ${hmstart}  ymdend ${ymdend} hh ${hmend} `,
//     );
//     let arraylist = [];
//     if (ymdstart === ymdend) {
//       arraylist = [{ y: yend, ymd: ymdend }];
//     } else {
//       arraylist = [
//         { y: ystart, ymd: ymdstart },
//         { y: yend, ymd: ymdend },
//       ];
//     }

//     /* ciclo per le date */
//     const images = await Promise.all(
//       arraylist.map(async (day) => {
//         // console.debug(`loading path ${path} y ${day.y} ymd ${day.ymd} `)
//         let directory = `${path}${day.y}/${day.ymd}/`;
//         await fs.access(directory, fs.constants.R_OK).catch(() => {
//           // console.debug(`directory not found ${directory}, trying ${path}${day.ymd}/`)
//           directory = `${path}${day.ymd}/`;
//         });
//         // if (target !== undefined) {
//         //   directory = `${path}${day.ymd}/`
//         // }
//         // console.debug(`directory: ${directory}`)
//         const list = await fs.readdir(directory);

//         // console.debug("list:", list)

//         /* filtro per il target */
//         const ext = target === "OPER" ? ".png" : ".";
//         const filteredFiles =
//           target !== "OPER"
//             ? list.filter((file) => file.includes(file.split("-")[0] + target))
//             : list.filter((file) => file.includes(target + ext));

//         /* ciclo per i files di una data */
//         const filePromise = filteredFiles.map(async (file) => {
//           // console.log(file)
//           let hmfile = file.split(".")[0];
//           if (target !== "") {
//             if (target !== "OPER") {
//               hmfile = file.substring(8, 12);
//             } else {
//               hmfile = file.substring(20, 24);
//             }
//           } else if (path.includes("firespill")) {
//             hmfile = file.split("_")[1].substring(8, 12);
//           }
//           // console.log(hmfile)
//           // console.log(`${day.ymd}${hmfile} >= ${ymdstart}${hmstart}`)
//           // console.log(`${day.ymd}${hmfile} <= ${ymdend}${hmend}`)
//           if (
//             +`${day.ymd}${hmfile}` >= +`${ymdstart}${hmstart}` &&
//             +`${day.ymd}${hmfile}` <= +`${ymdend}${hmend}`
//           ) {
//             try {
//               const img = await serverImg(directory + file);
//               return { name: file, image: img };
//             } catch (err) {
//               console.error(
//                 `Error loading image ${file} from ${directory}:`,
//                 err,
//               ); // Added error logging
//               return null;
//             }
//           } else {
//             return null;
//           }
//         });
//         const results = (await Promise.all(filePromise)).filter(
//           (result) => result !== null,
//         );
//         // console.log("images pre:"+JSON.stringify(results))
//         return results;
//       }),
//     );
//     // console.log("images:"+JSON.stringify(images)) // Added error logging (to check images.)
//     return images.flatMap((x) => x) as
//       | { name?: string; image?: string }[]
//       | null;
//   } catch (err) {
//     console.error(`Error loading images from ${path}:`, err);
//     return null;
//   }
// });

// /*
//  * serverListOperaImgRange: legge una cartella e restituisce un array di oggetti {name: nomeFile, image: immagineBase64}
//  */
// export const serverListOperaImgRange = server$(async function (
//   path: string,
//   ymd: string,
//   hm: string,
//   hours: number,
//   type: string,
//   target: string | "",
// ) {
//   try {
//     console.log(
//       `loading imgrange ${path} ymd ${ymd} hm ${hm} past ${hours} target ${target && target}`,
//     );

//     const date = ymd.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
//     const ymdstart = moment(`${date} ${hm}`)
//       .subtract(hours, "hours")
//       .format("YYYYMMDD");
//     const hmstart = moment(`${date} ${hm}`)
//       .subtract(hours, "hours")
//       .format("HHmm");
//     const yend = ymdstart.substring(0, 4);
//     const ymdend = moment(`${date} ${hm}`).format("YYYYMMDD");
//     const hmend = moment(`${date} ${hm}`).format("HHmm");
//     const ystart = ymdstart.substring(0, 4);

//     console.log(
//       `ymdstart ${ymdstart} hh ${hmstart}  ymdend ${ymdend} hh ${hmend} `,
//     );
//     let arraylist = [];
//     if (ymdstart === ymdend) {
//       arraylist = [{ y: yend, ymd: ymdend }];
//     } else {
//       arraylist = [
//         { y: ystart, ymd: ymdstart },
//         { y: yend, ymd: ymdend },
//       ];
//     }

//     /* ciclo per le date */
//     const images = await Promise.all(
//       arraylist.map(async (day) => {
//         // console.log(`loading path ${path} ymd ${day.ymd} `)
//         let directory = `${path}${day.y}/${day.ymd}/`;
//         await fs
//           .access(directory, fs.constants.R_OK)
//           .catch(() => (directory = `${path}${day.ymd}/`));

//         const list = await fs.readdir(directory);
//         // console.log(list)

//         /* filtro per il type */
//         const filteredType = list.filter((file) => file.includes(type));
//         // console.log("filtered_type:",filteredType)

//         /* filtro per il target */
//         const filteredFiles = filteredType.filter((file) =>
//           file.includes(target),
//         );
//         // console.log("filtered_files:",filteredFiles)

//         /* ciclo per i files di una data */
//         const filePromise = filteredFiles.map(async (file) => {
//           // console.log(file)
//           const ymdhmfile = file.substring(9, 21);
//           // console.debug("ymd:",ymdhmfile)
//           // console.log(`${ymdhmfile} >= ${ymdstart}${hmstart}`)
//           // console.log(`${ymdhmfile} <= ${ymdend}${hmend}`)
//           if (
//             +`${ymdhmfile}` >= +`${ymdstart}${hmstart}` &&
//             +`${ymdhmfile}` <= +`${ymdend}${hmend}`
//           ) {
//             try {
//               console.log(`loading ${directory}${file}`);
//               const img = await serverImg(directory + file);
//               return { name: file, image: img };
//             } catch (err) {
//               console.error(
//                 `Error loading image ${file} from ${directory}:`,
//                 err,
//               ); // Added error logging
//               return null;
//             }
//           } else {
//             return null;
//           }
//         });
//         const results = (await Promise.all(filePromise)).filter(
//           (result) => result !== null,
//         );
//         // console.log("images pre:"+JSON.stringify(results))
//         return results;
//       }),
//     );
//     // console.log("images:"+JSON.stringify(images)) // Added error logging (to check images.)
//     return images.flatMap((x) => x) as
//       | { name?: string; image?: string }[]
//       | null;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// });

// export const serverGetLastProductHistory = server$(async function (
//   product: string,
// ) {
//   try {
//     const history = await prisma.monitorProductHistory.findFirst({
//       where: {
//         code: product,
//         status: { gt: -1 },
//       },
//       orderBy: [{ date: "desc" }, { datetime: "desc" }],
//       take: 1,
//     });
//     // console.debug("ProductHistory:", history);
//     return history;
//     // // console.debug("history:",history)
//     // if (history && history.status >= 0 ) {
//     //   return history;
//     // } else {
//     //   return null;
//     // }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// });

export default component$(() => {
  const location = useLocation();
  const session = useSession();
  if (
    location.url.pathname !== "/dashboard/" &&
    location.url.pathname !== "/iframe/" &&
    !location.url.pathname.match(/^\/admin\/.+/) &&
    session.value?.user.id
  ) {
    serverLogUserHistory(
      +session.value.user.id,
      location.url.pathname + location.url.search,
    );
  }

  return (
    <>
      <main>
        <Navbar>
          <Slot />
          <Footer />
        </Navbar>
      </main>
    </>
  );
});

// export const head: DocumentHead = () => {
//   return {
//     title: `Utils`,
//   };
// };
