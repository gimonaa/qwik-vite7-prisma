import { component$, useComputed$, useSignal } from "@qwik.dev/core";
import { type DataSumType } from "./modelInfo";
import { Chartjs } from "../chartjs/chartjs";
import moment from "moment";

export interface MareGraficoProps {
  data: {
    biggrado: DataSumType | null;
    sumgrado: DataSumType | null;
    gradomarea: (string | number)[][] | null;
    gradoispra: (string | number)[][] | null;
    ispra: { key: string; value: (string | number)[][] }[] | null;
  };
}

export const MareGrafico = component$<MareGraficoProps>((props) => {
  const biggrado = props.data.biggrado || null;
  const sumgrado = props.data.sumgrado || null;
  const gradomarea = props.data.gradomarea || null;
  const gradoispra = props.data.gradoispra || null;
  const ispra = props.data.ispra || null;
  const titleSig = useSignal("");

  const colors: { [key: string]: string } = {
    // ECMWF
    GR04: "#BA68C8",
    GR04a: "#E040FB",
    GR05: "#9C27B0",
    GR05a: "#AA00FF",
    GR25: "#CE93D8",

    // BOLAM run 12
    GR08: "#388E3C",
    GR08a: "#81C784",

    // BOLAM run 00
    GR80: "#00ACC1",
    GR80a: "#0277BD",
  };

  // console.debug("colors", colors);

  const ispra_series = ispra?.map(({ key, value }) => ({
    label: "ispra-" + key,
    data: value.map(([x, y]) => ({ x, y })),
    tension: 0.6,
    backgroundColor: colors[key] + "77" || "rgba(0, 82, 204, 0.8)",
    borderColor: colors[key] || "rgba(0, 82, 204, 0.8)",
    hidden:
      key === "GR04a" || key === "GR08a" || key === "GR80a" ? false : true,
  }));

  const dateListSig = useComputed$(() => {
    // if (gradomarea && Array.isArray(gradomarea)) {
    //   return gradomarea.map((d) => d[0]);
    // } else
    if (biggrado && Array.isArray(biggrado.data)) {
      return biggrado.data.map((d) => d[0]);
    } else if (sumgrado && Array.isArray(sumgrado.data)) {
      return sumgrado.data.map((d) => d[0]);
    } else {
      return [];
    }
  });

  // con la versione 1 queste righe erano necessarie
  // biggrado && (biggrado.data = biggrado.data.map(([x, y]) => [`${x}`, y]));
  // sumgrado && (sumgrado.data = sumgrado.data.map(([x, y]) => [`${x}`, y]));

  const chartData = {
    labels: dateListSig.value,
    // labels: {},
    datasets: [
      {
        label: `Grado marea`,
        data: gradomarea?.map(([x, y]) => ({ x, y })) || [],
        backgroundColor: "#BDBDBD",
        borderColor: "#757575",
        tension: 0.6,
      },
      {
        label: `Grado Ispra`,
        data: gradoispra?.map(([x, y]) => ({ x, y })) || [],
        backgroundColor: "#757575",
        borderColor: "#424242",
        tension: 0.6,
      },
      {
        label: `biggrado`,
        data:
          biggrado?.data.map(
            ([x, y]) =>
              ({
                x,
                y: Math.round(+y),
              }) as { x: string; y: number },
          ) || [],
        backgroundColor: "#FF9800",
        borderColor: "#FF6F00",
        tension: 0.6,
        hidden: true,
      },
      {
        label: `sumgrado`,
        // data: sumgrado?.data.map(([x,y]) => ({x ,y} as { x: number, y: number})) || [] ,
        data:
          sumgrado?.data.map(
            ([x, y]) =>
              ({
                x,
                y: Math.round(+y),
              }) as { x: string; y: number },
          ) || [],
        backgroundColor: "#FDD835",
        borderColor: "#FBC02D",
        tension: 0.6,
      },
      ...(ispra_series || []),
    ],
  };

  // console.debug("chartData", chartData);

  const annotations = useSignal({
    warning: {
      type: "line",
      yMin: 120,
      yMax: 120,
      borderColor: "rgb(254, 138, 24)",
      borderWidth: 2,
    },
    alert: {
      type: "line",
      yMin: 130,
      yMax: 130,
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
    },
    zero: {
      type: "line",
      yMin: 0,
      yMax: 0,
      borderColor: "rgb(3,37,76)",
      borderWidth: 2,
    },
    currentTime: {
      type: "line",
      mode: "vertical",
      scaleID: "x",
      value: moment().utc().format("YYYYMMDDTHH"),
      borderColor: "gray",
      borderWidth: 2,
    },

    // currentTime: {
    //   type: "line",
    //   yMin: "2025032410",
    //   yMax: "2025032410",
    //   borderColor: "rgb(3,37,76)",
    //   borderWidth: 2,
    // }
  });

  const dataSig = useSignal(chartData);

  return (
    <div>
      <Chartjs
        id={"mareGrafico"}
        chartType="line"
        title={titleSig}
        data={dataSig}
        annotation={annotations}
        xtime={true}
        tooltipMode="x"
        showDataLabels={false}
      />
    </div>
  );
});
