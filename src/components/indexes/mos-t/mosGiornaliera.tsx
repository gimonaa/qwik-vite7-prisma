// import { component$, Resource, useResource$ } from "@qwik.dev/core";
// import { serverPlainText } from "~/routes/(authenticated)/layout";

// export const MosGiornaliera = component$(() => {
//   // const count = useSignal(0);
//   const mos = useResource$(async ({ track }) => {
//     track(() => true);
//     const data = await serverPlainText(
//       `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/indici/mos-t/previtemp.txt`,
//     );
//     const lines = data?.split("\n").filter((line) => line.trim() !== "");
//     const header = lines?.slice(0, 3);
//     const records: any = lines?.slice(5).map((line) => {
//       const parts = line.split(/\s+/).filter((part) => part !== "");
//       return {
//         station: parts[0],
//         TminDomani: parts[1] === "NA" ? "-" : parseFloat(parts[1]).toFixed(1),
//         TmaxDomani: parts[2] === "NA" ? "-" : parseFloat(parts[2]).toFixed(1),
//         TminDopodomani:
//           parts[3] === "NA" ? "-" : parseFloat(parts[3]).toFixed(1),
//         TmaxDopodomani:
//           parts[4] === "NA" ? "-" : parseFloat(parts[4]).toFixed(1),
//       };
//     });
//     return { header, records };
//   });

//   return (
//     <>
//       <div>
//         <Resource
//           value={mos}
//           // onPending={() => <Loading>Loading ...</Loading>}
//           onRejected={() => <p>error ...</p>}
//           onResolved={(res) => (
//             <div class="">
//               {res.header?.map((v, k) => <div key={k}>{v}</div>)}
//               <table class="my-2 w-full rounded-xl border border-slate-400 text-center text-sm text-gray-700 md:w-auto">
//                 <thead>
//                   <tr class="bg-slate-200">
//                     <th class="w-24 p-2">stazione</th>
//                     <th class="w-24 p-2">
//                       Tmin
//                       <br />
//                       domani
//                     </th>
//                     <th class="w-24 p-2">
//                       Tmax
//                       <br />
//                       domani
//                     </th>
//                     <th class="w-24 p-2">
//                       Tmin
//                       <br />
//                       dopodomani
//                     </th>
//                     <th class="w-24 p-2">
//                       Tmax
//                       <br />
//                       dopodomani
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody class="text-right">
//                   {res.records?.map((v: any, k: any) => (
//                     <tr key={k} class="p-1 odd:bg-white even:bg-gray-100">
//                       <td class="p-2 text-left">{v.station}</td>
//                       <td class="p-2">{v.TminDomani}</td>
//                       <td class="p-2">{v.TmaxDomani}</td>
//                       <td class="p-2">{v.TminDopodomani}</td>
//                       <td class="p-2">{v.TmaxDopodomani}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         />
//       </div>
//     </>
//   );
// });
