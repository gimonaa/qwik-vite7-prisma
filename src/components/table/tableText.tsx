import { component$ } from "@qwik.dev/core";

export interface TableProps {
  raw: string;
}

export const TableText = component$<TableProps>((props) => {
  const rows = props.raw.split("<br/>").map((row) => {
    const isHeader = row.startsWith("#");
    // const cells = row.replace(/&nbsp;/g, ' ').replace(/_/g, ' ').replace(/^#/, '').split(';');
    const cells = row
      .replace(/&nbsp;/g, " ")
      .replace(/^#/, "")
      .replace(/;;;;/g, "#CSPAN;")
      .split(";");
    return { isHeader, cells };
  });

  const allCells = Object.values(rows)
    .filter((row) => !row.isHeader)
    .map((row) => row.cells);

  const maxLength = Math.max(...allCells.map((cells) => cells.length));
  const mediaCells: number[] = [];

  for (let i = 0; i < maxLength; i++) {
    let sum = 0;
    let count = 0;

    for (const cells of allCells) {
      const value = parseFloat(cells[i]);
      if (!isNaN(value)) {
        // Considera solo numeri validi
        sum += value;
        count++;
      }
    }

    if (count > 0) {
      // arrotondo la media se maggiore di 100
      mediaCells.push(
        sum / count > 100 ? Math.round(sum / count / 100) * 100 : sum / count,
      );
    } else {
      mediaCells.push(NaN); // Nessun valore numerico valido
    }
  }

  // console.debug("storeVal: ", mediaCells);
  // console.debug("rows: ", rows);

  return (
    <>
      <table class="w-full border-separate border-gray-300 text-left text-sm text-gray-500 rtl:text-right">
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              class="p-1 odd:bg-white even:bg-gray-100 hover:bg-blue-100 hover:text-black"
            >
              {row.cells.map((cell, cellIndex) =>
                row.isHeader ? (
                  cell.includes("#CSPAN") ? (
                    <th
                      class="bg-slate-200 p-1 text-center"
                      colSpan={4}
                      key={cellIndex}
                    >
                      {cell.replace("#CSPAN", "")}
                    </th>
                  ) : (
                    <th class="bg-slate-200 p-1 text-center" key={cellIndex}>
                      {cell}
                    </th>
                  )
                ) : cell === "_" ? (
                  <td class="w-4 bg-slate-200 p-1" key={cellIndex}></td>
                ) : (
                  <td class="p-1" key={cellIndex}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
          <tr class="p-1 odd:bg-white even:bg-gray-100 hover:bg-blue-100 hover:text-black">
            {mediaCells.map((media, index) => (
              <td class="p-1 text-left font-bold" key={index}>
                {media ? media.toFixed(0) : ""}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
});
