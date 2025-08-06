import { component$ } from "@qwik.dev/core";
import moment from "moment-timezone";

export interface TableProps {
  columns: string[];
  rows: object[];
}

// function formattaDataOra(dateString: string): string {
//   const year = dateString.slice(0, 4); // Prende i primi 4 caratteri (2024)
//   const month = dateString.slice(4, 6); // Prende i caratteri 4-5 (09)
//   const day = dateString.slice(6, 8); // Prende i caratteri 6-7 (13)
//   const hour = dateString.slice(8, 10); // Prende i caratteri 6-7 (13)
//   return `${year}-${month}-${day} ${hour}:00`;
// }

export const MareTabella = component$<TableProps>((props) => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="my-2 w-full rounded-xl border border-slate-400 text-center text-sm text-gray-500">
        <thead>
          <tr class="bg-slate-200">
            {props.columns.map((item, index) => (
              <th key={"tabletr" + index} scope="col" class="p-2">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, index) => (
            <tr
              key={"usertr" + index}
              class="p-1 odd:bg-white even:bg-gray-100"
            >
              {Object.values(row).map((v, index) =>
                v instanceof Date ? (
                  <td key={index}>
                    {v.toLocaleDateString("it-IT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                ) : /^20\d{8}$/.test(v) ? (
                  <td
                    key={index}
                    class={`p-2 ${v <= moment().format("YYYYMMDDHH") && `bg-blue-100`}`}
                  >
                    {/* aaa{formattaDataOra(`${v}`)} */}
                    {moment.utc(v, "YYYYMMDDHH").format("YYYY-MM-DD HH:mm")}
                  </td>
                ) : (
                  <td
                    key={index}
                    class={`p-2 text-right ${v >= 130 ? `bg-red-300 font-bold` : v > 120 && `bg-orange-200 font-bold`} `}
                  >
                    {" "}
                    {Number.isNaN(v) ? "-" : v.toFixed(0)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
