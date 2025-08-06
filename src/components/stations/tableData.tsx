import {
  component$,
  type Signal,
  type PropsOf,
  useStore,
} from "@qwik.dev/core";
import {
  useGetStationsFlag,
  type StationDataMisura,
} from "~/routes/(authenticated)/stazioni/layout";
import {
  HiCheckCircleSolid as Yes,
  HiXCircleSolid as No,
} from "@qwikest/icons/heroicons";
import { Trend } from "./Trend";
import { GraficoMisura } from "./GraficoMisura";
import { Chart } from "../svg/Chart";

type TableProps = {
  misure: Signal<string[]>;
  delta_t?: string | number;
  row: StationDataMisura | null;
} & PropsOf<"table">;

export const TableData = component$<TableProps>((props) => {
  const flag = useGetStationsFlag();
  const misuraSig = useStore(
    props.misure.value.map((key) => {
      return {
        id: key,
        visible: false,
      };
    }),
  );

  // console.debug("misuraSig", props.row)

  return (
    <>
      <table class="w-full text-left text-sm text-gray-500">
        <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" class="px-1 py-2">
              ultimo dato (UTC)
            </th>
            <th scope="col" class="px-1 py-2">
              Misura
            </th>
            <th scope="col" class="px-1 py-2">
              Valore
            </th>
            <th></th>
            {props.delta_t && +props.delta_t >= 3600 && (
              <>
                <th scope="col" class="px-1 py-2">
                  Pubblicabile
                </th>
                <th scope="col" class="px-1 py-2">
                  TAS
                </th>
                <th scope="col" class="px-1 py-2">
                  FLAG ID
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {props.misure.value.map((key) => (
            <>
              <tr
                key={key}
                class="border-b bg-white odd:bg-white even:bg-gray-100"
              >
                <td class="px-1 py-2">
                  {props.row?.[key][props.row[key].length - 1].orario}
                </td>
                <td>{props.row?.[key][props.row[key].length - 1].misura}</td>
                <td class="px-1 py-2 pr-4 text-right">
                  {props.row?.[key][props.row[key].length - 1].dato}
                  <Trend
                    vals={
                      props.row?.[key]
                        .slice(
                          props.delta_t ? (+props.delta_t <= 60 ? -5 : -2) : -2,
                        )
                        .map((v) => v.dato) || []
                    }
                  ></Trend>
                </td>
                <td
                  class="cursor-pointer px-1 py-2"
                  title="visualizza il grafico"
                  onClick$={() => {
                    misuraSig[
                      misuraSig.findIndex((m) => m.id === key)
                    ].visible =
                      !misuraSig[misuraSig.findIndex((m) => m.id === key)]
                        .visible;
                  }}
                >
                  <Chart></Chart>
                </td>
                {props.delta_t && +props.delta_t >= 3600 && (
                  <>
                    <td class="px-1 py-2 text-center">
                      {props.row?.[key][props.row[key].length - 1]
                        .pubblicabile ? (
                        <Yes class="text-lg text-emerald-500" />
                      ) : (
                        <No class="text-lg text-red-500" />
                      )}
                    </td>
                    <td class="px-1 py-2 text-center">
                      {props.row?.[key][props.row[key].length - 1].tas ? (
                        <No class="text-lg text-red-500" />
                      ) : (
                        <Yes class="text-lg text-emerald-500" />
                      )}
                    </td>
                    <td
                      class="cursor-help px-1 py-2 text-center"
                      title={
                        flag.value.find(
                          (f) =>
                            f.id ===
                            props.row?.[key][props.row[key].length - 1].flag_id,
                        )?.descrizione
                      }
                    >
                      {props.row?.[key][props.row[key].length - 1].flag_id}
                    </td>
                  </>
                )}
              </tr>

              <tr>
                <td colSpan={7}>
                  {misuraSig.find((m) => m.id === key)?.visible && (
                    // props.row &&
                    <GraficoMisura
                      id={key + "chart"}
                      // title={misuraSig}
                      misure={props.row?.[key]}
                    ></GraficoMisura>
                  )}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
});
