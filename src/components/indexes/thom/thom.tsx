import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
  type Signal,
} from "@qwik.dev/core";
import moment from "moment";
import { Loading } from "~/components/ui/loading";
import { serverJson } from "~/routes/(authenticated)/layout";

export interface ThomProps {
  ymdSig: Signal<string>;
}

export type ThomKeys = {
  CLASS_MAX: number;
  CLASS_MED: number;
  DI_MAX: number | null;
  DI_MED: number | null;
  DURATION_MAX: number;
  DURATION_MED: number;
};

export type ThomData = {
  [zona: number]: {
    [localita: string]: {
      cfg: {
        zona: string;
      };
      daily: {
        [data: string]: {
          stz: ThomKeys;
          nwp: ThomKeys;
        };
      };
      hourly: {
        [dataora: string]: {
          nwp: {
            BIAS_RH: number;
            BIAS_T: number;
            CLASS: number;
            DI: number | null;
          };
          stz: {
            CLASS: number;
            DI: number | null;
          };
        };
      };
    };
  };
};

export function computeAverage(
  hourly: Record<string, any>,
  data: string,
  filterFn: (d: any) => boolean,
  valueFn: (d: any) => number,
): string {
  const { somma, count } = Object.entries(hourly).reduce(
    (acc, [ts, d]) => {
      if (ts.startsWith(data) && filterFn(d)) {
        acc.somma += valueFn(d);
        acc.count++;
      }
      return acc;
    },
    { somma: 0, count: 0 },
  );
  return count > 0 ? (somma / count).toFixed(1) : "-";
}

export function computeMax(
  hourly: Record<string, any>,
  data: string,
  filterFn: (d: any) => boolean,
  valueFn: (d: any) => number,
): string {
  const { max } = Object.entries(hourly).reduce(
    (acc, [ts, d]) => {
      if (ts.startsWith(data) && filterFn(d)) {
        acc.max = Math.max(acc.max, valueFn(d));
      }
      return acc;
    },
    { max: 0 },
  );
  return max > 0 ? max.toFixed(1) : "-";
}

export const Thom = component$<ThomProps>((props) => {
  const localitaSig = useSignal("");
  const thomData = useResource$(async ({ track }) => {
    track(() => props.ymdSig.value);
    const yyyy = props.ymdSig.value.substring(0, 4);
    const url = `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/indici/thom_dev/${yyyy}/thom_${props.ymdSig.value}.json`;
    const result: ThomData = await serverJson(url);
    // console.debug("thomData:", result);
    return result;
  });

  return (
    <>
      <div>
        {/* data: {ymdSig.value} */}
        <Resource
          value={thomData}
          onPending={() => <Loading>Loading...</Loading>}
          onRejected={(err) => <p>{err.message}</p>}
          onResolved={(res) => {
            return res ? (
              <>
                <ListLocThom thom={res} localitaSig={localitaSig}></ListLocThom>
                <TabThomDaily
                  thom={res}
                  localitaSig={localitaSig}
                ></TabThomDaily>
                <TabThomHourly
                  ymdSig={props.ymdSig}
                  thom={res}
                  localitaSig={localitaSig}
                ></TabThomHourly>
              </>
            ) : (
              <> prodotto non disponibile</>
            );
          }}
        />
      </div>
    </>
  );
});

export interface TabThomProps {
  thom: ThomData;
  localitaSig: Signal<string>;
}

export const ListLocThom = component$<TabThomProps>(({ thom, localitaSig }) => {
  return (
    <div class="md-flex-1">
      <div class="g-accordion">località</div>
      <button
        class="g-button m-1 p-1 px-2"
        onClick$={() => {
          localitaSig.value = "";
        }}
      >
        Tutte
      </button>
      {Object.entries(thom).map(([zona, localita]) =>
        Object.entries(localita).map(([localita]) => (
          <button
            class={`g-button m-1 p-1 px-2 ${localita === localitaSig.value ? "bg-blue-200" : ""}`}
            key={localita + zona}
            onClick$={() => {
              localitaSig.value = localita;
            }}
          >
            {localita}
          </button>
        )),
      )}
    </div>
  );
});

export const TabThomDaily = component$<TabThomProps>(
  ({ thom, localitaSig }) => {
    return (
      <div class="">
        <table class="g-table w-full border-1 border-gray-400 text-sm">
          <thead class="sticky top-0">
            <tr>
              <th colSpan={2}></th>
              <th colSpan={10}></th>
              <th></th>
              <th colSpan={10}></th>
              <th></th>
              <th colSpan={1}></th>
              <th colSpan={10} class="!text-center">
                Correzione applicata
              </th>
            </tr>
            <tr>
              <th colSpan={2}></th>
              <th colSpan={10} class="!text-center">
                med
              </th>
              <th></th>
              <th colSpan={10} class="!text-center">
                max
              </th>
              <th></th>
              <th colSpan={1}></th>
              <th colSpan={4} class="!text-center"></th>
              <th colSpan={6} class="!text-center">
                Tnwp (URnwp) - Tmis (URmis)
              </th>
            </tr>
            <tr>
              <th class="p-1">zona</th>
              <th class="p-1">località</th>
              {Object.entries(thom[1][Object.keys(thom[1])[0]].daily)
                .reverse()
                .map(([data]) => (
                  <th key={data}>
                    <div class="p-1 !text-right text-xs">
                      {moment(data).format("DD/MM")}
                    </div>
                  </th>
                ))}
              <th class="bg-blue-100 p-1"></th>
              {Object.entries(thom[1][Object.keys(thom[1])[0]].daily)
                .reverse()
                .map(([data]) => (
                  <th key={data}>
                    <div class="p-1 !text-right text-xs">
                      {moment(data).format("DD/MM")}
                    </div>
                  </th>
                ))}
              <th class="bg-blue-100 p-1"></th>
              <th></th>
              {Object.entries(thom[1][Object.keys(thom[1])[0]].daily)
                .reverse()
                .map(([data]) => (
                  <th key={data}>
                    <div class="p-1 !text-right text-xs">
                      {moment(data).format("DD/MM")}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody class="overflow-y-auto !text-right">
            {Object.entries(thom).map(([zona, localita]) => (
              <>
                {Object.entries(localita)
                  .filter(
                    ([localita]) =>
                      localita === localitaSig.value ||
                      localitaSig.value === "",
                  )
                  .map(([localita, { cfg, daily, hourly }]) => (
                    <tr key={localita + zona} class="p-1">
                      <td class="p-1 !text-left">{cfg.zona}</td>
                      <td>
                        <div class="h-6 w-44 !text-left font-bold">
                          {localita}
                        </div>
                        <div class={`p-0.5 !text-left`}>nwp</div>
                        <div class="p-0.5 !text-left">stz</div>
                      </td>

                      {
                        // daily MED
                        Object.entries(daily)
                          .reverse()
                          .map(([data, { nwp, stz }]) => (
                            <td key={data}>
                              <div class="h-6"></div>
                              <div
                                class={`p-1 g-cl${nwp.CLASS_MED}-thom ${nwp.DURATION_MED > 2 && "g-duration-thom"}`}
                              >
                                {nwp.DI_MED ?? "-"}
                              </div>
                              <div
                                class={`p-1 g-cl${stz.CLASS_MED}-thom ${stz.DURATION_MED > 2 && "g-duration-thom"}`}
                              >
                                {stz.DI_MED ?? "-"}
                              </div>
                            </td>
                          ))
                      }
                      <td class="bg-gray-200 p-2"></td>
                      {
                        // daily MAX
                        Object.entries(daily)
                          .reverse()
                          .map(([data, { nwp, stz }]) => (
                            <td key={data}>
                              <div class="h-6"></div>
                              <div
                                class={`p-1 g-cl${nwp.CLASS_MAX}-thom ${nwp.DURATION_MAX > 2 && "g-duration-thom"}`}
                              >
                                {nwp.DI_MAX ?? "-"}
                              </div>
                              <div
                                class={`p-1 g-cl${stz.CLASS_MAX}-thom ${stz.DURATION_MAX > 2 && "g-duration-thom"}`}
                              >
                                {stz.DI_MAX ?? "-"}
                              </div>
                            </td>
                          ))
                      }
                      <td class="bg-gray-200 p-2"></td>
                      <td class="">
                        <div class={`w-32 p-0.5`}>Tnwp - Tmis</div>
                        <div class={`w-32 p-0.5`}>URnwp - URmis</div>
                      </td>
                      {
                        // daily BIAS
                        Object.entries(daily)
                          .reverse()
                          .map(([data]) => (
                            <td key={data}>
                              <div class="p-0.5 text-right">
                                {$(() =>
                                  computeAverage(
                                    hourly,
                                    data,
                                    () => true,
                                    (d) => +d.nwp.BIAS_T,
                                  ),
                                )()}
                              </div>
                              <div class="p-0.5 text-right">
                                {$(() =>
                                  computeAverage(
                                    hourly,
                                    data,
                                    () => true,
                                    (d) => +d.nwp.BIAS_RH,
                                  ),
                                )()}
                              </div>
                            </td>
                          ))
                      }
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

export const TabThomHourly = component$<
  TabThomProps & { ymdSig: Signal<string> }
>(({ thom, ymdSig, localitaSig }) => {
  return (
    <div>
      {Object.entries(thom[1][Object.keys(thom[1])[0]].daily)
        .slice(0)
        .map(([data]) => (
          <div key={data}>
            <p class="m-2 rounded-xl bg-blue-100 p-3 font-bold">
              Indice di Thom per il {data}
            </p>
            <table class="g-table w-full border-1 border-gray-400 text-sm">
              <thead class="sticky top-0">
                <tr>
                  <th class="p-1">zona</th>
                  <th class="p-1">localita</th>
                  {Object.entries(thom[1][Object.keys(thom[1])[0]].hourly)
                    .filter(([ts]) => ts.startsWith(data))
                    .map(([ts]) => (
                      <th class="p-1 text-right" key={ts}>
                        {moment(ts).format("HH")}
                      </th>
                    ))}
                  <th class="p-1 text-right">med</th>
                  <th class="p-1 text-right">max</th>
                </tr>
              </thead>
              <tbody class="!text-right">
                {Object.entries(thom).map(([zona, localita]) => (
                  <>
                    {Object.entries(localita)
                      .filter(
                        ([localita]) =>
                          localita === localitaSig.value ||
                          localitaSig.value === "",
                      )
                      .map(([localita, { cfg, hourly, daily }]) => (
                        <tr key={localita + zona}>
                          <td class="h-6 w-38 !text-left">{cfg.zona}</td>
                          <td>
                            <div class="h-6 w-44 !text-left font-bold">
                              {localita}
                            </div>
                            <div class="h-6 !text-left">nwp</div>
                            <div class="h-6 !text-left text-xs">BIAS_T</div>
                            <div class="h-6 !text-left text-xs">BIAS_RH</div>
                            {data.replaceAll("-", "") <= ymdSig.value && (
                              <div class="h-6 w-38 !text-left">stz</div>
                            )}
                          </td>
                          {Object.entries(hourly)
                            .filter(([ts]) => ts.startsWith(data))
                            .map(([ts, { nwp, stz }]) => (
                              <td key={ts}>
                                <div class="h-6"></div>
                                <div class={`p-1 g-cl${nwp.CLASS}-thom`}>
                                  {nwp.DI ?? "-"}
                                </div>
                                <div class={`p-1 text-xs`}>{nwp.BIAS_T}</div>
                                <div class={`p-1 text-xs`}>{nwp.BIAS_RH}</div>
                                {data.replaceAll("-", "") <= ymdSig.value && (
                                  <div class={`p-1 g-cl${stz.CLASS}-thom`}>
                                    {stz.DI == 0 ? "-" : (stz.DI ?? "-")}
                                  </div>
                                )}
                              </td>
                            ))}
                          <td>
                            <div class="h-6"></div>
                            <div
                              class={`p-1 g-cl${daily[data].nwp.CLASS_MED}-thom`}
                            >
                              {$(() =>
                                computeAverage(
                                  hourly,
                                  data,
                                  (d) => d.nwp.DI != null,
                                  (d) => +d.nwp.DI,
                                ),
                              )()}
                            </div>
                            <div class={`p-1 text-xs`}>
                              {$(() =>
                                computeAverage(
                                  hourly,
                                  data,
                                  () => true,
                                  (d) => +d.nwp.BIAS_T,
                                ),
                              )()}
                            </div>
                            <div class={`p-1 text-xs`}>
                              {$(() =>
                                computeAverage(
                                  hourly,
                                  data,
                                  () => true,
                                  (d) => +d.nwp.BIAS_RH,
                                ),
                              )()}
                            </div>
                            {data.replaceAll("-", "") <= ymdSig.value && (
                              <div
                                class={`p-1 g-cl${daily[data].stz.CLASS_MED}-thom`}
                              >
                                {$(() =>
                                  computeAverage(
                                    hourly,
                                    data,
                                    (d) => d.stz.DI && d.stz.DI > 0,
                                    (d) => +d.stz.DI,
                                  ),
                                )()}
                              </div>
                            )}
                          </td>
                          <td>
                            <div class="h-6"></div>
                            <div
                              class={`p-1 g-cl${daily[data].nwp.CLASS_MAX}-thom`}
                            >
                              {$(() =>
                                computeMax(
                                  hourly,
                                  data,
                                  (d) => d.nwp.DI != null,
                                  (d) => +d.nwp.DI,
                                ),
                              )()}
                            </div>
                            <div class={`p-1 text-xs`}>
                              {$(() =>
                                computeMax(
                                  hourly,
                                  data,
                                  () => true,
                                  (d) => +d.nwp.BIAS_T,
                                ),
                              )()}
                            </div>
                            <div class={`p-1 text-xs`}>
                              {$(() =>
                                computeMax(
                                  hourly,
                                  data,
                                  () => true,
                                  (d) => +d.nwp.BIAS_RH,
                                ),
                              )()}
                            </div>
                            {data.replaceAll("-", "") <= ymdSig.value && (
                              <div
                                class={`p-1 g-cl${daily[data].stz.CLASS_MAX}-thom`}
                              >
                                {$(() =>
                                  computeMax(
                                    hourly,
                                    data,
                                    (d) => d.stz.DI && d.stz.DI > 0,
                                    (d) => +d.stz.DI,
                                  ),
                                )()}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
});
