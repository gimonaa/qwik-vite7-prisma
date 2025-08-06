import { component$, useSignal, type PropsOf } from "@qwik.dev/core";
// import { type StationDataMisura } from '~/routes/(authenticated)/stazioni/layout';
import { HiArrowLongDownSolid as Freccia } from "@qwikest/icons/heroicons";

type Props = {
  tipo?: "RR" | "T180" | "VV";
  raw: any;
  extra?: any;
} & PropsOf<"div">;

export const Misura = component$<Props>((props) => {
  const somma = props.raw
    .reduce((a: number, b: any) => a + b.dato, 0)
    .toFixed(1);
  const media = (somma / props.raw.length).toFixed(1);
  const min = Math.min(...props.raw.map((v: any) => v.dato)).toFixed(1);
  const max = props.raw.reduce(
    (max: any, curr: any) => (curr.dato > max.dato ? curr : max),
    props.raw[0],
  );
  const extra = props.extra?.find((v: any) => v.orario == max.orario) || null;
  const convertSig = useSignal(1);
  const umSig = useSignal("m/s");

  return (
    <div class="g-box m-4 min-h-32 min-w-72 text-center">
      {props.tipo == "RR" && (
        <>
          <h2 class="p-4 text-center text-xl">Precipitazione tot.</h2>
          <div>
            <div>
              <span class="px-1 text-3xl font-bold">{somma}</span>
              <span class="text-gray-500">mm</span>
            </div>
          </div>
        </>
      )}

      {props.tipo == "T180" && (
        <>
          <h2 class="p-4 text-center text-xl">Temperatura</h2>
          <div class="grid grid-cols-3">
            <div class="pb-1 text-xs text-gray-500">min</div>
            <div class="pb-1 text-xs text-gray-500">media</div>
            <div class="pb-1 text-xs text-gray-500">max</div>
            <div>
              <span class="px-1 text-3xl font-bold text-blue-600">{min}</span>
              <span class="text-gray-500">°C</span>
            </div>
            <div>
              <span class="px-1 pl-3 text-3xl font-bold">{media}</span>
              <span class="pr-3 text-gray-500">°C</span>
            </div>
            <div>
              <span class="px-1 text-3xl font-bold text-red-600">
                {max.dato.toFixed(1)}
              </span>
              <span class="text-gray-500">°C</span>
            </div>
          </div>
        </>
      )}

      {props.tipo == "VV" && (
        <>
          <h2 class="p-4 text-center text-xl">
            Vento max{" "}
            {extra?.dato && (
              <Freccia
                style={{ transform: `rotate(${extra?.dato}deg)` }}
                class={`inline text-4xl`}
              ></Freccia>
            )}
          </h2>
          <div>
            <span class="px-1 text-xs text-gray-600"> {max.orario}</span>
            <span class="px-1 pl-2 text-3xl font-bold">
              {" "}
              {(max.dato * convertSig.value).toFixed(1)}
            </span>
            <span class="pr-3 text-gray-500">{umSig.value}</span>
            <span class="px-1 pl-2 text-3xl font-bold">{extra?.dato}</span>
            <span class="pr-3 text-gray-500">°N</span>
            <div class="p-1 text-xs text-gray-600">
              converti in :
              <button
                class="text-md px-1 font-bold"
                onClick$={() => {
                  convertSig.value = 1;
                  umSig.value = "m/s";
                }}
              >
                m/s
              </button>
              <button
                class="text-md px-1 font-bold"
                onClick$={() => {
                  convertSig.value = 3.6;
                  umSig.value = "Km/h";
                }}
              >
                Km/h
              </button>
              <button
                class="text-md px-1 font-bold"
                onClick$={() => {
                  convertSig.value = 1.944;
                  umSig.value = "kt";
                }}
              >
                Kt
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
