/* eslint-disable qwik/valid-lexical-scope */
import {
  component$,
  useSignal,
  useVisibleTask$,
  type Signal,
} from "@qwik.dev/core";
import {
  Chart,
  type ChartData,
  type ChartTypeRegistry,
  registerables,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import moment from "moment-timezone";
import dataLabels from "chartjs-plugin-datalabels";

type ChartProps = {
  id: string;
  title?: Signal<string>;
  chartType: keyof ChartTypeRegistry;
  // data: Signal<ChartData>;
  // Lasciando senza any segnala errore per la mancanza di tipo string nelle coppie di dati
  data: Signal<ChartData | any>;
  class?: string;
  zero?: Signal<boolean>;
  addSeries?: Signal<string>;
  ticks?: number;
  annotation?: Signal<any>;
  xtime?: boolean;
  yscales?: any;
  yTitle?: string;
  stacked?: boolean;
  linear?: boolean;
  showDataLabels?: boolean;
  tooltipMode?:
    | "x"
    | "y"
    | "index"
    | "dataset"
    | "point"
    | "nearest"
    | undefined;
};

type ChartTypeSerie = "time";

export const Chartjs = component$<ChartProps>(
  ({
    id,
    title,
    chartType,
    data,
    xtime,
    showDataLabels = false,
    stacked = false,
    ...props
  }) => {
    const myChart = useSignal<HTMLCanvasElement>();
    const optionDataLabels = useSignal({});

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => title?.value);
      track(() => data.value);
      track(() => props.addSeries && props.addSeries.value);

      const typeSerie: ChartTypeSerie = "time";

      const isScatter = chartType === "scatter";

      const xprop = xtime
        ? {
            type: typeSerie,
            min: data.value?.datasets[0].data[0]?.x || undefined,
            max:
              moment(data.value?.datasets[0].data[0]?.x, "YYYYMMDDHHmm")
                .add(5, "day")
                .format("YYYYMMDDHHmm") || undefined,
            time: {
              parser: "YYYYMMDDHHmm",
              // parser: 'yyyymmddhh',
              // unit: 'hour',
              displayFormats: {
                hour: "DD HH:mm",
                day: "DD/MM",
                month: "MM/YYYY",
              },
              tooltipFormat: "DD/MM/YY HH:mm",
            },
            stacked: stacked,
          }
        : stacked
          ? { stacked: true }
          : // : linear ? { type : "linear", position: 'bottom'}
            {};

      // console.debug("AAAA ", data.value.datasets[0].data[0].x);

      Chart.getChart(id)?.destroy();

      if (myChart.value) {
        // console.debug("rewrite chart");
        console.debug("data", data.value);

        Chart.register(...registerables, annotationPlugin, zoomPlugin);

        if (showDataLabels) {
          Chart.register(dataLabels);
          // forzo la non visualizzazione delle etichette dei dati
          optionDataLabels.value = {
            display: false,
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 1,
            padding: 4,
            borderRadius: 4,
            color: "black",
            font: {
              size: 12,
              weight: "bold",
            },
            align: "top",
            // clamp: true,
            // rotation: -90,
            offset: 6,
          };
        }

        new Chart(myChart.value, {
          type: chartType,
          data: data.value,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            // interaction: {
            //   mode: "index",
            //   intersect: true,
            // },
            scales: {
              y: {
                beginAtZero: props.zero?.value,
                ticks: {
                  stepSize: props.ticks ? props.ticks : undefined,
                },
                title: {
                  display: true,
                  text: props.yTitle || "",
                },
                ...(props.yscales || {}),
              },
              x: xprop,
            },
            plugins: {
              title: {
                display: true,
                text: title?.value,
              },
              tooltip: {
                mode: props.tooltipMode || "x",
                callbacks: isScatter
                  ? {
                      label: (context) => {
                        const point = context.raw as {
                          x: number;
                          y: number;
                          label: string;
                        };
                        return `${point.x}, ${point.y}  ${point.label}`;
                      },
                    }
                  : undefined,
                //mode: "index",
                //mode: "nearest",
                //mode: "point",
                intersect: false,
                // filter: function (tooltipItem) {
                //   // tooltipItem.datasetIndex = index del dataset
                //   // tooltipItem.dataset.hidden = se è nascosto
                //   return !tooltipItem.dataset.hidden;
                // },
                itemSort: (a, b) => {
                  // Ordine decrescente per valore
                  return b.parsed.y - a.parsed.y;
                },
              },
              datalabels: optionDataLabels.value,
              annotation: {
                annotations: props.annotation?.value,
              },
              zoom: {
                pan: {
                  enabled: true,
                  mode: "xy",
                },
                zoom: {
                  mode: "xy",
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                },
              },
            },
          },
        }).update();
      }
    });

    return (
      <div class={`${props.class || ""} object-contain`}>
        <canvas
          ref={myChart}
          id={id}
          class={`h-[500px] max-h-[900px] w-full md:h-auto`}
        ></canvas>
      </div>
    );
  },
);
