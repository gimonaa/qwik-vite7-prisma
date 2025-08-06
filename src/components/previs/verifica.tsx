import { component$, useSignal, useStore } from "@qwik.dev/core";
import { Chartjs } from "../chartjs/chartjs";
import { Colors } from "~/util/colors";

type T180Data = {
  T180_MAX: { [key: string]: [number, number] };
  T180_MIN: { [key: string]: [number, number] };
};

type StationsList = {
  [key: string]: string;
};

// const ModelList = ["ECMWF","ALADIN"] as const;

type ModelList = {
  [key: string]: string;
};

type DynamicBias = {
  [Model in keyof ModelList as `bias_obs${Model}`]?: T180Data;
};

type Models = {
  [Model in keyof ModelList]: T180Data;
};

type BiasList = {
  bias_obsfore: T180Data;
  bias_obspreall: T180Data;
} & DynamicBias;

type VerTemperatura = {
  forecasts: T180Data;
  observations: T180Data;
  preallocations: T180Data;
};

type VerTemperaturaIn = VerTemperatura & { stations?: StationsList } & {
  bias: BiasList;
} & { models: Models };

export const biasClass = (dato: any) => {
  const val = +dato;
  if (val > 3) {
    return "g-cl3-piu";
  } else if (val > 2) {
    return "g-cl2-piu";
  } else if (val > 1) {
    return "g-cl1-piu";
  } else if (val > 0) {
    return "g-cl0-piu";
  } else if (val < -3) {
    return "g-cl3-meno";
  } else if (val < -2) {
    return "g-cl2-meno";
  } else if (val < -1) {
    return "g-cl1-meno";
  } else if (val < 0) {
    return "g-cl0-meno";
  } else {
    return "";
  }
};

export type DataVerification = [VerTemperaturaIn, StationsList];

interface DataProps {
  data: DataVerification;
  var?: string;
  id?: string;
  target?: string;
}

function formattaData(dateString: string): string {
  const year = dateString.slice(0, 4); // Prende i primi 4 caratteri (2024)
  const month = dateString.slice(4, 6); // Prende i caratteri 4-5 (09)
  const day = dateString.slice(6, 8); // Prende i caratteri 6-7 (13)
  // Riorganizza nel formato desiderato: gg-mm-aaaa
  return `${day}-${month}-${year}`;
}

export const VerificaTabella = component$<DataProps>((props) => {
  // const dateList = Object.keys(props.data[0].forecasts.T180_MAX);
  const dateList = Object.keys(props.data[0].models.ECMWF.T180_MAX); //model ECMWF
  // console.log("dateList",dateList)
  const grandezza: T180Data = { T180_MAX: {}, T180_MIN: {} };
  const v = props.data[0];
  const stations = props.data[1];
  const models = Object.keys(v.models) as (keyof ModelList)[];
  const visStationsSig = useSignal(false);
  const visModelSig = useSignal(true);
  // console.debug("preistanziato",v.preallocations)

  return (
    <>
      {/* <div>Tabella</div> */}

      <button
        onClick$={() => (visStationsSig.value = !visStationsSig.value)}
        class={`g-button mt-3 p-3 ${visStationsSig.value && "bg-blue-200"}`}
      >
        {" "}
        visualizza stazioni in tabella
      </button>

      <button
        onClick$={() => (visModelSig.value = !visModelSig.value)}
        class={`g-button mt-3 ml-3 p-3 ${visModelSig.value && "bg-blue-200"}`}
      >
        {" "}
        visualizza modelli in tabella
      </button>

      {Object.keys(grandezza).map((g, index) => (
        <table
          key={"vergrand_" + index}
          class="my-2 w-full rounded-xl border border-slate-400 text-center text-sm text-gray-500"
        >
          <thead>
            <tr class="bg-slate-200">
              <th class="p-2">{g} </th>{" "}
              {dateList.map((date, index) => (
                <th class="p-2" key={"verth_" + index}>
                  {formattaData(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              // osservato
              <tr class="p-1 odd:bg-white even:bg-gray-100">
                <td class="p-1">osservato</td>
                {
                  // dati per tutte le scadenze
                  dateList.map((date, index) => (
                    <td key={"vero_" + index} class="p-2">
                      <span class={`p-1 font-bold`}>
                        {v.observations[g as keyof T180Data]?.[date]?.[0]
                          ? typeof v.observations[g as keyof T180Data]?.[
                              date
                            ]?.[0] !== "number"
                            ? "-"
                            : Math.round(
                                v.observations[g as keyof T180Data]?.[
                                  date
                                ]?.[0],
                              )
                          : v.observations[g as keyof T180Data]?.[date]
                            ? typeof v.observations[g as keyof T180Data]?.[
                                date
                              ] !== "number"
                              ? "-"
                              : Math.round(
                                  v.observations[g as keyof T180Data]?.[
                                    date
                                  ] as unknown as number,
                                )
                            : "-"}
                      </span>
                      {v.observations[g as keyof T180Data]?.[date]?.[0] && (
                        <span> / </span>
                      )}
                      <span class={`p-1 font-bold`}>
                        {v.observations[g as keyof T180Data]?.[date]?.[1]
                          ? typeof v.observations[g as keyof T180Data]?.[
                              date
                            ]?.[1] !== "number"
                            ? "-"
                            : Math.round(
                                v.observations[g as keyof T180Data]?.[
                                  date
                                ]?.[1],
                              )
                          : ""}{" "}
                      </span>
                    </td>
                  ))
                }
              </tr>
            }

            {
              // previsto
              <tr class="p-1 odd:bg-white even:bg-gray-100">
                <td class="p-1">previsto</td>
                {
                  // dati per tutte le scadenze
                  dateList.map((date, index) => (
                    <td key={`verprevisto_${index}`} class="p-2">
                      {v.forecasts[g as keyof T180Data][date]?.[0] !==
                      undefined ? (
                        [0, 1].map((i, k) => (
                          <span key={`verpdiv_${k}`}>
                            <span
                              key={`verpspan_${k}`}
                              class={`p-1 font-bold ${biasClass(v.bias.bias_obsfore[g as keyof T180Data][date]?.[i])} `}
                            >
                              {typeof v.forecasts[g as keyof T180Data][date][
                                i
                              ] === "number"
                                ? v.forecasts[g as keyof T180Data][date][i]
                                : "-"}
                            </span>
                            {i === 0 && <span> / </span>}
                          </span>
                        ))
                      ) : (
                        <>
                          <span
                            class={`p-1 font-bold ${biasClass(v.bias.bias_obsfore[g as keyof T180Data][date])} `}
                          >
                            {v.forecasts[g as keyof T180Data][date as any]}
                          </span>
                        </>
                      )}
                    </td>
                  ))
                }
              </tr>
            }

            {
              // preistanziato
              <tr class="p-1 odd:bg-white even:bg-gray-100">
                <td class="p-1">preistanziato</td>
                {
                  // dati per tutte le scadenze
                  dateList.map((date, index) => (
                    <td key={"veri_" + index} class="p-2">
                      {v.preallocations[g as keyof T180Data][date]?.length >
                      1 ? (
                        [0, 1].map((i, k) => (
                          <span key={`versidiv_${k}`}>
                            <span
                              key={`versipan_${k}`}
                              class={`p-1 font-bold ${biasClass(v.bias.bias_obspreall[g as keyof T180Data][date]?.[i])} `}
                            >
                              {typeof v.preallocations[g as keyof T180Data][
                                date
                              ][i] === "number"
                                ? v.preallocations[g as keyof T180Data][date][i]
                                : "-"}
                            </span>
                            {i === 0 && <span> / </span>}
                          </span>
                        ))
                      ) : (
                        <>
                          <span
                            class={`p-1 font-bold ${biasClass(v.bias.bias_obspreall[g as keyof T180Data][date])} `}
                          >
                            {v.preallocations[g as keyof T180Data][date as any]}
                          </span>
                        </>
                      )}
                    </td>
                  ))
                }
              </tr>
            }

            {
              // Modelli
              visModelSig.value &&
                models.map((m, index) => (
                  <tr key={index} class="p-1 odd:bg-white even:bg-gray-100">
                    <td class="p-1">{m}</td>
                    {
                      // dati per tutte le scadenze
                      dateList.map((date, index) => (
                        <td key={"veri_" + index} class="p-2">
                          {v.models[m] &&
                          v.models[m][g as keyof T180Data][date as any]
                            ?.length > 1 ? (
                            [0, 1].map((i, k) => (
                              <span key={`versidiv_${k}`}>
                                <span
                                  key={`versipan_${k}`}
                                  class={`p-1 font-bold ${biasClass(v.bias[`bias_obs${m}`]?.[g as keyof T180Data][date as any]?.[i])} `}
                                >
                                  {typeof v.models[m]?.[g as keyof T180Data][
                                    date
                                  ]?.[i] === "number"
                                    ? v.models[m]?.[g as keyof T180Data][
                                        date
                                      ]?.[i].toFixed(0)
                                    : "-"}
                                </span>
                                {i === 0 && <span> / </span>}
                              </span>
                            ))
                          ) : (
                            <>
                              <span
                                class={`p-1 font-bold ${biasClass(v.bias[`bias_obs${m}`]?.[g as keyof T180Data][date])} `}
                              >
                                {typeof v.models[m]?.[g as keyof T180Data][
                                  date
                                ] === "number"
                                  ? (
                                      v.models[m]?.[g as keyof T180Data][
                                        date
                                      ] as unknown as number
                                    ).toFixed(0)
                                  : "-"}
                              </span>
                            </>
                          )}
                        </td>
                      ))
                    }
                  </tr>
                ))
            }

            {
              // stazioni
              visStationsSig.value &&
                v.stations &&
                Object.keys(v.stations).map((s, index) => (
                  <tr key={index} class="odd:bg-white even:bg-gray-100">
                    <td class="p-1">{stations[s]}</td>
                    {dateList.map((date, index) => (
                      <td key={index} class="text-center font-bold">
                        {(typeof v.stations?.[s][g as any][date as any] ===
                          "number" &&
                          v.stations?.[s][g as any][date as any]) ||
                          "-"}
                      </td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      ))}

      <VerificaLegenda></VerificaLegenda>
    </>
  );
});

export const VerificaLegenda = component$(() => {
  const testo = useSignal("bias previsto / preistanziato vs osservato");

  return (
    <div class="text-xs text-gray-700">
      <div class="m-2 p-2 font-bold">Legenda</div>
      <div class="m-2 p-2">{testo.value}</div>
      <div class="flex flex-col md:flex-row">
        <div>
          <div class="m-2 w-32 p-2">
            <span class="g-cl3-piu mr-3 p-2 px-4">xx</span> {`>`} 3{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl2-piu mr-3 p-2 px-4">xx</span> {`>`} 2{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl1-piu mr-3 p-2 px-4">xx</span> {`>`} 1{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl0-piu mr-3 p-2 px-4">xx</span> {`>`} 0{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl0-meno mr-3 p-2 px-4">xx</span> {`<`} 0{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl1-meno mr-3 p-2 px-4">xx</span> {`<`} 1{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl2-meno mr-3 p-2 px-4">xx</span> {`<`} 2{" "}
          </div>
          <div class="m-2 p-2">
            <span class="g-cl3-meno mr-3 p-2 px-4">xx</span> {`<`} 3{" "}
          </div>
        </div>
        <div class="text-base">
          {`La tabella mostra per ogni località locale o areale per cui vengono emesse delle previsioni i rispettivi valori di temperatura: osservati da stazione (puntuali o 10°/90° perc. per dati areali), previsti dal previsore, preistanziati e previsti dai modelli (es. ALADIN, ECMWF ecc.).  
I colori delle previsioni o delle preistanziazioni indicano il bias ovvero la differenza tra la previsione e l'osservato: colori blu indicano sottostima (T prevista < T osservata),  colori rossi indicano sovrastima (T prevista > T osservata). Per il dettaglio guardare la legenda colore.
Il grafico riporta le medesime quantità, l'impostazione base visualizza solo la previsione del previsore e l'osservazione. Tuttavia è possibile visualizzare cliccando anche le altre quantità.
Per Pianura e costa è possibile visualizzare anche i dati di alcune stazioni presenti in tali aree.
        `}
        </div>
      </div>
    </div>
  );
});

export const VerificaGrafico = component$<DataProps>((props) => {
  const grandezza = props.var || "T180_MIN";
  const zeroSig = useSignal(false);
  const triggerSig = useSignal("");

  const v = props.data[0];
  const stations = props.data[1];
  const mod = Object.keys(v.models);
  const models = mod.reduce(
    (acc, model) => {
      acc[model] = model;
      return acc;
    },
    {} as Record<string, string>,
  );

  // const dateList = Object.keys(v.forecasts.T180_MAX);
  const dateList = Object.keys(v.models.ECMWF.T180_MAX);
  const seriesList = useStore([
    {
      id: "observations",
      desc: "osservato",
      color: [69, 90, 100],
      fill: "-1",
      visible: true,
    },
    {
      id: "forecasts",
      desc: "previsto",
      color: [79, 195, 247],
      fill: "-1",
      visible: true,
    },
  ]);

  const datasets = seriesList
    .map((s) => {
      const result = [0, 1].map((i) => {
        const dataSerie = dateList.map((d) => {
          if (
            typeof v[s.id as keyof VerTemperatura][grandezza as keyof T180Data][
              d as keyof T180Data
            ] === "number" ||
            typeof v[s.id as keyof VerTemperatura][grandezza as keyof T180Data][
              d as keyof T180Data
            ]?.[i] === "number"
          )
            if (
              v[s.id as keyof VerTemperatura][grandezza as keyof T180Data][
                d as keyof T180Data
              ]?.[i] !== undefined
            )
              return v[s.id as keyof VerTemperatura][
                grandezza as keyof T180Data
              ][d as keyof T180Data]?.[i];
            else
              return v[s.id as keyof VerTemperatura][
                grandezza as keyof T180Data
              ][d as keyof T180Data];
          else return null;
        });

        return {
          label: i == 0 ? s.desc : "",
          data: dataSerie,
          fill: i == 1 ? s.fill : "false",
          borderColor: `rgba(${s.color || Array.from({ length: 3 }, () => Math.floor(Math.random() * 256))}, 0.3)`, // Colore della linea
          backgroundColor: `rgba(${s.color || Array.from({ length: 3 }, () => Math.floor(Math.random() * 256))}, 0.1)`, // Colore della linea
          pointBackgroundColor: `rgba(${s.color || Array.from({ length: 3 }, () => Math.floor(Math.random() * 256))}, 0.3)`, // Colore della linea
          hidden: false,
        };
      });
      return result.map((d) => d);
    })
    .flat();

  const stationListVis = useStore(
    Object.entries(stations).map((s, k) => ({
      id: s[0],
      visible: k == 0 ? false : false,
    })),
  );

  const datasetStations = stationListVis
    .map((s, k) => {
      const dataSerie = dateList.map((d) =>
        typeof v.stations?.[s.id]?.[grandezza as any][d as any] === "number"
          ? Number(v.stations?.[s.id]?.[grandezza as any][d as any])
          : null,
      );

      return {
        label: s.id,
        data: dataSerie,
        fill: "false",
        borderColor: `rgba(${Colors[k] || Array.from({ length: 3 }, () => 0 + Math.floor(Math.random() * 185))}, 1)`, // Colore della linea
        backgroundColor: `rgba(${Colors[k] || Array.from({ length: 3 }, () => 0 + Math.floor(Math.random() * 185))}, 0.1)`, // Colore della linea
        pointBackgroundColor: `rgba(${Colors[k] || Array.from({ length: 3 }, () => 0 + Math.floor(Math.random() * 185))}, 0.3)`, // Colore della linea
        order: k,
        hidden: false,
        // hidden : true
      };
    })
    .flat();

  const modelListVis = useStore(
    Object.entries(models).map((m, k) => ({
      id: m[0],
      fill: "-1",
      visible: k == 0 ? false : false,
    })),
  );

  const datasetModels = modelListVis
    .map((m, k) => {
      const result = [0, 1].map((i) => {
        const dataSerie = dateList.map((d) => {
          if (
            typeof v.models[m.id as any][grandezza as keyof T180Data][
              d as any
            ] === "number" ||
            typeof v.models[m.id as any][grandezza as keyof T180Data][
              d as any
            ]?.[i] === "number"
          )
            if (
              v.models[m.id as any][grandezza as keyof T180Data][d as any]?.[
                i
              ] !== undefined
            )
              return v.models[m.id as any][grandezza as keyof T180Data][
                d as any
              ]?.[i];
            else
              return v.models[m.id as any][grandezza as keyof T180Data][
                d as any
              ];
          else return null;
        });

        return {
          // label : i == 0 ? m.id: "",
          label: m.id,
          data: dataSerie,
          fill: i == 1 ? m.fill : "false",
          borderColor: `rgba(${Colors[k] || Array.from({ length: 3 }, () => 0 + Math.floor(Math.random() * 185))}, 1)`, // Colore della linea
          backgroundColor: `rgba(${Colors[k] || Array.from({ length: 3 }, () => 0 + Math.floor(Math.random() * 185))}, 0.1)`, // Colore della linea
          pointBackgroundColor: `rgba(${Colors[k] || Array.from({ length: 3 }, () => 0 + Math.floor(Math.random() * 185))}, 0.3)`, // Colore della linea
          order: k,
          hidden: false,
          // hidden : true
        };
      });
      return result.map((d) => d);
    })
    .flat();

  // const datasetAggregate = [...datasets, ...datasetStations]
  const datasetAggregate = [...datasets];

  const chartData = {
    labels: dateList,
    datasets: datasetAggregate,
  };

  const title = useSignal(grandezza);
  const data = useSignal(chartData);

  return (
    <section>
      <div class="">
        <div class="">
          <Chartjs
            id={"chart_" + grandezza}
            chartType="line"
            title={title}
            data={data}
            class="h-72 w-[100%]"
            zero={zeroSig}
            ticks={1}
            addSeries={triggerSig}
          />
        </div>
        <div class="mt-2">
          {
            // Bottone Osservato
          }
          <button
            id={props.id + "_Osserv"}
            data-target={props.target + "_Osserv"}
            onClick$={() => {
              if (props.target) {
                document.getElementById(props.target + "_Osserv")?.click();
              }
              seriesList.find((v) => {
                if (v.id == "observations") {
                  v.visible = !v.visible;
                  triggerSig.value = "obs" + v.visible;
                  if (v.visible) {
                    data.value.datasets[0].hidden = false;
                    data.value.datasets[1].hidden = false;
                  } else {
                    data.value.datasets[0].hidden = true;
                    data.value.datasets[1].hidden = true;
                  }
                }
              });
            }}
            class={`rounded-lg border-2 border-gray-400 p-1 text-xs ${props.target ? "" : "hidden"} `}
          >
            {"osservato"}
          </button>

          {
            // Bottoni Modelli
            Object.entries(models).map((m, k) => (
              <button
                id={props.id + "_" + m[0]}
                data-target={props.target + "_" + m[0]}
                key={k}
                onClick$={() => {
                  if (props.target) {
                    document.getElementById(props.target + "_" + m[0])?.click();
                  }
                  modelListVis.find((v) => {
                    if (v.id == m[0]) {
                      v.visible = !v.visible;
                      triggerSig.value = m[0] + v.visible;
                      if (v.visible) {
                        data.value.datasets = [
                          ...data.value.datasets,
                          ...datasetModels.filter((v) => v.label == m[0]),
                        ];
                      } else {
                        data.value.datasets = data.value.datasets.filter(
                          (v) => v.label != m[0],
                        );
                      }
                    }
                    // else {console.log("no")}
                  });
                }}
                class={`rounded-lg border-2 border-green-500 p-1 text-xs ${props.target ? "" : "hidden"} ${modelListVis.find((v) => v.id == m[0])?.visible ? "bg-green-200" : ""} `}
              >
                {m[1]} - {m[0]}
              </button>
            ))
          }

          {
            // Bottoni Stazioni
            Object.entries(stations).map((s, k) => (
              <button
                id={props.id + "_" + s[0]}
                data-target={props.target + "_" + s[0]}
                key={`station_${k}`}
                onClick$={() => {
                  if (props.target) {
                    document.getElementById(props.target + "_" + s[0])?.click();
                  }
                  stationListVis.find((v) => {
                    if (v.id == s[0]) {
                      v.visible = !v.visible;
                      triggerSig.value = s[0] + v.visible;
                      if (v.visible) {
                        data.value.datasets = [
                          ...data.value.datasets,
                          ...datasetStations.filter((v) => v.label == s[0]),
                        ];
                      } else {
                        data.value.datasets = data.value.datasets.filter(
                          (v) => v.label != s[0],
                        );
                      }
                    }
                    // else {console.log("no")}
                  });
                }}
                class={`g-button m-0.5 p-1 text-xs ${stationListVis.find((v) => v.id == s[0])?.visible && "bg-blue-200"} ${props.target ? "" : "hidden"} `}
              >
                {s[1]}- {s[0]}
              </button>
            ))
          }
        </div>
      </div>
    </section>
  );
});
