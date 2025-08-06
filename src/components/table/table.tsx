import { component$, type Signal, useSignal } from "@qwik.dev/core";

export interface TableProps {
  columns: string[];
  rows: object[];
  editOpt?: string;
  actionOpt?: boolean | false;
  action?: any;
  sortSig?: Signal<string>;
}

export const Table = component$<TableProps>((props) => {
  const sortElementsignal = useSignal("asc");

  return (
    <div class="relative overflow-x-auto shadow-md">
      <table class="g-table w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            {props.columns.map((item, index) => (
              <th
                key={"tabletr" + index}
                scope="col"
                class="px-6 py-3"
                onClick$={() => {
                  if (props.sortSig?.value) {
                    if (sortElementsignal.value === "asc") {
                      sortElementsignal.value = "desc";
                    } else {
                      sortElementsignal.value = "asc";
                    }
                    props.sortSig.value = item + ":" + sortElementsignal.value;
                  }
                }}
              >
                <div class="flex items-center">
                  {item}
                  <a href="#">
                    <svg
                      class="ms-1.5 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
            ))}
            {props.editOpt && <th></th>}
            {props.actionOpt && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, index) => (
            <tr key={"usertr" + index} class="border-b bg-white">
              {Object.values(row).map((v, index) =>
                v instanceof Date ? (
                  <td key={"usertd" + index}>
                    {v.toLocaleDateString("it-IT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                ) : (
                  <td key={"usertd" + index} class="px-6 py-4">
                    {v}
                  </td>
                ),
              )}
              {props.editOpt && (
                <td class="px-6 py-4 text-center">
                  <a
                    href={props.editOpt + `${row["id" as keyof typeof row]}`}
                    class="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              )}
              {props.actionOpt && (
                <td class="px-6 py-4 text-center">
                  <button
                    type="button"
                    class="me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
                    onClick$={async () => {
                      if (confirm("procedo?")) {
                        await props.action.submit({
                          id: row["id" as keyof typeof row],
                        });
                      }
                    }}
                  >
                    {" "}
                    delete{" "}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
