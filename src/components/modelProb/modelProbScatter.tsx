import {
  component$,
  useResource$,
  Resource,
  useSignal,
  $,
} from "@qwik.dev/core";
import { type ModelProbProps } from "./modelProbMenu";
// import { serverImg } from "~/routes/(authenticated)/layout";
// import { Image } from "../ui/image";
import { Chartjs } from "../chartjs/chartjs";
import { type ChartData } from "chart.js";
import { serverJson } from "~/routes/(authenticated)/layout";
import moment from "moment";
import { Loading } from "../svg/loading";

export type epsDataType = {
  [variabile: string]: {
    [memberId: string | number]: [timestamp: string, values: number | number[]];
  }[];
};

export const combineXAndY = $((x: any, y: any, dt: Date) => {
  // const combined: { [key: string]: { x: number; y: number; date: string }[] } = {};

  // for (const memberId in x) {
  //   const xSeries = x[memberId];
  //   const ySeries = y[memberId];

  //   // Assumo che le date siano allineate e in ordine
  //   const memberData = xSeries.map(
  //     ([date, xVal]: [string, number ], i: number) => {
  //       const [, yVal] = ySeries[i] as [string, number ];
  //       return {
  //         x: xVal, // (+tVal).toFixed(2),
  //         y: yVal,// (+zVal).toFixed(2),
  //         date
  //       };
  //     }
  //   );

  //   combined[memberId] = memberData;
  // }

  // return combined;
  // console.debug("combineXAndY", x, y, dt);

  const combined: { x: number; y: number; label: string }[] = [];

  for (const memberId in x) {
    const xEntry = x[memberId].find(
      (entry: [Date, number]) => moment(entry[0]).diff(dt) === 0,
    );
    const yEntry = y[memberId].find(
      (entry: [Date, number]) => moment(entry[0]).diff(dt) === 0,
    );

    if (xEntry && yEntry) {
      // const [, xVal] = xEntry;
      // const [, yVal] = yEntry;
      combined.push({
        x: typeof xEntry[1] === "number" ? xEntry[1].toFixed(1) : xEntry[1],
        y: typeof yEntry[1] === "number" ? yEntry[1].toFixed(1) : yEntry[1],
        label: memberId + " - " + moment(xEntry[0]).format("YYYY-MM-DD HH"),
      });
    }
  }

  console.debug("combineXAndY", combined);

  return combined;
});

export const ModelProbScatter = component$<ModelProbProps>((props) => {
  const titleSig = useSignal(
    `${props.store.location} - ${props.store.model} - ${props.store.datarun} - ${props.store.run} - ${props.store.level} - ${props.store.variable} - ${props.store.statistic} - ${props.store.step}`,
  );
  const GraphData = useSignal<any>(null);
  const annotations = useSignal<any>(null);

  const imgLoc = useResource$(async ({ track, cleanup }) => {
    console.debug("ModelProbScatter", props.store);

    track(() => props.store.model);
    track(() => props.store.datarun);
    track(() => props.store.level);
    track(() => props.store.run);
    track(() => props.store.variable);
    track(() => props.store.step);
    track(() => props.store.location);
    track(() => props.store.statistic);
    const yyyy = props.store.datarun.replace(/-/g, "").substring(0, 4);
    const ymd = props.store.datarun.replace(/-/g, "");
    const dt = moment(props.store.datarun, "YYYY-MM-DD")
      .add(props.store.step, "hours")
      .toDate();

    titleSig.value = `${dt} ${props.store.location} - ${props.store.model} - ${props.store.datarun} - ${props.store.run} - ${props.store.level} - ${props.store.variable} - ${props.store.statistic} - ${props.store.step}`;

    const controller = new AbortController();
    cleanup(() => controller.abort());

    // model data
    const epsFile = `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/modelli/${props.store.model.toLowerCase()}/${yyyy}/${ymd}/${props.store.model}-spaghetti-${ymd}${props.store.run}_${props.store.location}.json`;
    console.debug("epsFile", epsFile);
    const epsData: epsDataType | null = await serverJson(epsFile);
    const epsT = epsData?.[`t_${props.store.level}`];
    const epsZ = epsData?.[`gh_${props.store.level}`];

    const combined = await combineXAndY(epsT, epsZ, dt);

    // rds Udine
    const url = `https://api.meteo.fvg.it/rds/rds_scatter_data?quota=${props.store.level}&ymd=${props.store.datarun}&days_range=5`;
    console.debug("API url: ", url);
    const res = await fetch(url);

    type rds = {
      ymd: string;
      hh: string;
      T: number;
      Z: number;
    };

    if (res.status !== 200) {
      return null;
      throw new Error(`Error fetching data: ${res.status}`);
    } else {
      const result: rds[] = await res.json();
      // console.debug("rds_scatter_data", result);
      // return result.data as rds[];

      const points = result
        .map((r) => {
          if (r.T > -99 && r.Z > -99)
            return {
              x: +r.T,
              y: +r.Z,
              label: `${r.ymd} ${r.hh}`,
            };
          else return null;
        })
        .filter((r) => r !== null);

      const avgX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
      const avgY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

      const dataRDS: ChartData = {
        // labels : result.map((r) => `${r.ymd} ${r.hh}`),
        datasets: [
          {
            label: "RDS",
            data: points,
            backgroundColor: "rgba(9, 172, 64, 0.2)",
            borderColor: "rgba(9,172, 64, 1)",
            borderWidth: 1,
            pointRadius: 4,
            order: 1,
          },
          {
            label: props.store.model,
            data: combined,
            backgroundColor: "rgba(5, 56, 122, 0.6)",
            borderColor: "rgba(5, 56, 122, 1)",
            borderWidth: 1,
            pointRadius: 4,
            order: 0,
          },
        ],
      };

      GraphData.value = dataRDS;

      annotations.value = {
        midPoint: {
          type: "label",
          xValue: avgX,
          yValue: avgY,
          content: "+", // oppure '✕', 'X'
          font: {
            size: 30,
            weight: "bold",
          },
          color: "#005DA4",
          position: "center",
        },
      };

      console.debug("GraphData", GraphData);

      return {
        g: GraphData,
        annotations: annotations,
      };
    }

    // const url = `${props.store.imgPathMDA}${props.store.model.toLocaleLowerCase()}/${props.store.datarun.replace(/-/g, "")}/${props.store.model}-spaghetti-${props.store.datarun.replace(/-/g, "")}${props.store.run}_${props.store.location}_${props.store.step}${props.store.level && "_" + props.store.level}_${props.store.variable}_${props.store.statistic}.${props.store.ext}`;
    // const data = await serverImg(url);
  });
  return (
    <>
      <Resource
        value={imgLoc}
        onPending={() => <Loading />}
        // onRejected={() => <p>error ...</p>}
        onResolved={(res) =>
          res && (
            <>
              <Chartjs
                id={"scatter"}
                chartType="scatter"
                title={titleSig}
                data={res.g}
                tooltipMode="point"
                annotation={res.annotations}
              />
              {/* <Image
                // class={props.class || `object-top object-contain md:h-[calc(100vh-120px)] w-fit`}   //`w-full max-h-screen`
                // class={props.class || `object-top object-contain md:h-[calc(100vh-120px)] w-full max-h-screen`}
                src={`${res}`}
              ></Image> */}
            </>
          )
        }
      />
    </>
  );
});
