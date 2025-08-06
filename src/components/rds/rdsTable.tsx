import { component$, useSignal } from "@qwik.dev/core";

export interface Props {
  raw: any;
}

export const RdsTable = component$<Props>((props) => {
  const data = useSignal(props.raw || ("" as string));
  const rows = data.value.trim().split("\n");
  const tableRows = rows.slice(1);

  // Filtra solo le righe a multipli di 5
  const filteredRows = tableRows.filter(
    (row: string, index: number) => index % 5 === 0,
  );
  const table = filteredRows.map((row: string) => {
    // Rimuovere spazi multipli e dividere in colonne
    const columns = row.trim().split(/\s+/);
    return columns;
  });

  return (
    <>
      <table class="my-2 w-full rounded-xl border border-slate-400 text-center text-sm text-gray-700">
        <thead>
          <tr class="bg-slate-200">
            <th>quota (m)</th>
            <th>pressione (hPa)</th>
            <th>T dew-point (°C)</th>
            <th>temp. (°C)</th>
            <th>umidità (%)</th>
            <th>vento (kts)</th>
            <th>dir (°N)</th>
          </tr>
        </thead>
        {table.map((row: any[], index: number) => (
          <tr key={index} class="p-1 odd:bg-white even:bg-gray-100">
            <td>{row[1]}</td> {/* quota (m) */}
            <td>{(row[2] / 10).toFixed(1)}</td> {/* pressione (hPa) */}
            <td>{(row[5] / 10).toFixed(1)}</td> {/* T dew-point (°C) */}
            <td>{(row[3] / 10).toFixed(1)}</td> {/* temp. (°C) */}
            <td>{row[4]}</td> {/* umidità (%) */}
            <td>{((row[7] / 10) * 1.94384).toFixed(1)}</td> {/* vento (kts) */}
            <td>{row[6]}</td> {/* dir (°N) */}
          </tr>
        ))}
      </table>
    </>
  );
});
