import { $, component$, useSignal } from "@qwik.dev/core";
import { server$ } from "@qwik.dev/router";

export interface NearProps {
  stationId: number | undefined;
  misura: string;
  deltaT: string | number;
}

export interface NearStationsProps {
  alt: string;
  codice: string;
  d: number;
  lat: string;
  lon: string;
  nome: string;
  sigla: string;
  stid: number;
}

export const serverGetNearStations = server$(async function (
  id: number = 0,
  misura: string = "",
  delta: number | string = 0,
) {
  const url = `https://api.meteo.fvg.it/client/www/nearestStationsList?stazione_id=${id}&range=50000&misura=${misura}&delta_t=${delta}`;
  console.log("get near stations ... ", url);
  const res = await fetch(url);

  if (res.status === 200) {
    const result = await res.json();
    // console.debug("result",result)
    return result as NearStationsProps[];
  } else {
    throw new Error(`Error fetching data: ${res.status}`);
  }
});

export const NearStations = component$<NearProps>((props) => {
  const listSig = useSignal<NearStationsProps[]>();

  return (
    <div class="m-auto text-center">
      <button
        class="g-button mb-2 p-2 text-sm"
        onClick$={$(async () => {
          const list = await serverGetNearStations(
            props.stationId,
            props.misura,
            props.deltaT,
          );
          listSig.value = list;
        })}
      >
        stazioni vicine
      </button>
      <div class="flex flex-wrap gap-2 text-sm">
        {listSig.value?.map((v, k) => (
          <div key={k}>
            <a
              class="p-2 hover:underline"
              href={`/stazioni/dettaglio/${v.sigla}/${props.deltaT}/${+props.deltaT > 3600 ? "240/" : +props.deltaT <= 60 ? "2/" : "24/"}`}
            >
              {v.nome} ({v.sigla}) {v.d} km
            </a>
          </div>
        ))}
      </div>
    </div>
  );
});
