import {
  component$,
  type Signal,
  useSignal,
  useVisibleTask$,
} from "@qwik.dev/core";
import { Chartjs } from "../chartjs/chartjs";
import { type StationMisura } from "~/routes/(authenticated)/stazioni/layout";
import type { ChartTypeRegistry, ChartData } from "chart.js";
import moment from "moment";

export interface GraficoMisuraProps {
  misure: StationMisura[] | null | undefined;
  // id: Signal<string>;
  id: string;
  title?: Signal<string>;
  // color? : string;
}

const ChartOpt: Record<
  string,
  { color: string | undefined; type: keyof ChartTypeRegistry | undefined }
> = {
  DEF: { color: "#455A64", type: "line" },
  T180: { color: "#E64A19", type: "line" },
  T180_MIN: { color: "#E64A19", type: "line" },
  T180_MED: { color: "#E64A19", type: "line" },
  T180_MAX: { color: "#E64A19", type: "line" },
  RR: { color: "#29B6F6", type: "bar" },
  RR_TOT: { color: "#29B6F6", type: "bar" },
  RG: { color: "#FDD835", type: "bar" },
  RH: { color: "#3F51B5", type: "line" },
  PRESS: { color: "#616161", type: "line" },
  DD10: { color: "#9C27B0", type: "bar" },
  DD10MAX: { color: "#9C27B0", type: "bar" },
  FF10: { color: "#00796B", type: "bar" },
  FF10MAX: { color: "#00695C", type: "bar" },
  DD2: { color: "#5E35B1", type: "bar" },
  V2: { color: "#1B5E20", type: "bar" },
  V10: { color: "#1B5E20", type: "bar" },
  FF2MAX: { color: "#00695C", type: "bar" },
  DD2MAX: { color: "#9C27B0", type: "bar" },
};

export const GraficoMisura = component$<GraficoMisuraProps>((props) => {
  // const colorSig = useSignal(props.color || "227");
  const colorSig = useSignal<string>();
  const typeSig = useSignal<keyof ChartTypeRegistry>();
  const data = useSignal<ChartData | any>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(props.title || {});
    // props.title && track(props.title);
    // props.misure && track(props.misure)

    const misure = props.misure;

    colorSig.value = ChartOpt[misure?.[0].misura || "DEF"]?.color || "227";

    typeSig.value = ChartOpt[misure?.[0].misura || "DEF"]?.type || "line";

    const timestamps =
      misure?.map((m) => moment(m.orario).format("DD HH:mm")) || [];
    const datasets = [
      {
        label: misure?.[0].misura,
        data: misure?.map((m) => m.dato) || [],
        borderColor: colorSig.value,
        backgroundColor: colorSig.value,
        // borderColor: `hsl(${colorSig.value}, 100%, 50%)`,
        // backgroundColor: `hsl(${colorSig.value}, 100%, 50%)`,
      },
    ];

    const chartData = {
      // id: misure[0].dato+misure[0].orario,
      labels: timestamps,
      datasets: datasets,
    };

    data.value = chartData;
    // console.log("grafico misura",data.value.datasets);
  });

  return (
    <>
      {/* grafico id: {props.id} */}
      {data.value && (
        <Chartjs
          class="h-72"
          title={props.title}
          // id={props.id.value}
          id={props.id}
          chartType={typeSig.value || "line"}
          data={data}
        ></Chartjs>
      )}
    </>
  );
});
