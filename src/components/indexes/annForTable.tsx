import { component$ } from "@qwik.dev/core";

export interface Props {
  raw: string;
}
type DataRow = {
  YYYYMMDDHH: string;
  RUNDATE: string;
  FORCA6h: string;
  CALCA6h: string;
};

export const AnnForTable = component$<Props>((props) => {
  // Parsing dei dati in un array di oggetti
  const dataRows: DataRow[] = props.raw
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [RUNDATE, YYYYMMDDHH, FORCA6h, CALCA6h] = line.trim().split(/\s+/);
      return { RUNDATE, YYYYMMDDHH, FORCA6h, CALCA6h };
    });

  // valori unici di YYYYMMDDHH e RUNDATE
  const uniqueYYYYMMDDHH = [...new Set(dataRows.map((row) => row.YYYYMMDDHH))];
  const uniqueRUNDATE = [...new Set(dataRows.map((row) => row.RUNDATE))];

  return (
    <>
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            <th class="border bg-gray-100 p-2">YYYYMMDDHH</th>
            {uniqueRUNDATE.sort().map((run) => (
              <th key={run} class="border bg-gray-100 p-2">
                {run}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueYYYYMMDDHH.sort().map((date) => (
            <tr key={date} class="p-1 odd:bg-white even:bg-gray-100">
              <td class={`border p-2 font-semibold`}>{date}</td>
              {uniqueRUNDATE.map((run) => {
                const cellData = dataRows.find(
                  (row) => row.YYYYMMDDHH === date && row.RUNDATE === run,
                );
                return (
                  <td key={run} class="border p-2">
                    {cellData ? (
                      <>
                        <span
                          class={`pr-4 ${+cellData.FORCA6h > 0.57 ? "text-red-600" : +cellData.FORCA6h > 0.5 && "text-green-600"} `}
                        >
                          {+cellData.FORCA6h < -99
                            ? "-"
                            : (+cellData.FORCA6h).toFixed(4)}
                        </span>
                        <span
                          class={`${+cellData.CALCA6h > 0.57 ? "text-red-600" : +cellData.CALCA6h > 0.5 && "text-green-600"} `}
                        >
                          {+cellData.CALCA6h < -99
                            ? "-"
                            : (+cellData.CALCA6h).toFixed(4)}
                        </span>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});
