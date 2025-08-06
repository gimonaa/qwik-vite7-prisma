import {
  component$,
  Resource,
  type Signal,
  useResource$,
  useSignal,
} from "@qwik.dev/core";
import moment from "moment";
import { serverImg } from "~/routes/(authenticated)/layout";
import { useGetPelmoList } from "~/routes/(authenticated)/mare/layout";
import { Image } from "~/components/ui/image";
// import { Date } from "~/components/ui/date";
import { Loading } from "~/components/ui/loading";
// import { Run } from "~/components/ui/run";
import { Modal } from "@qwik-ui/headless";
import { Close } from "~/components/svg/Close";

export const OndaGrafico = component$(
  ({
    ymdSig,
    runSig,
    baseDir,
  }: {
    ymdSig: Signal;
    runSig: Signal;
    baseDir: string;
  }) => {
    const pelmoLoc = useGetPelmoList();
    // const ymdSig = useSignal(moment().utc().format("YYYYMMDD"));
    const yyyySig = useSignal(moment().utc().format("YYYY"));
    const localitaSig = useSignal("Grado");
    // const runSig = useSignal("00");
    const imgLoc = useResource$(async ({ track, cleanup }) => {
      track(() => ymdSig.value);
      track(() => runSig.value);
      track(() => localitaSig.value);

      const controller = new AbortController();
      cleanup(() => controller.abort());

      yyyySig.value = ymdSig.value.substring(0, 4);
      const basUrl = `${baseDir}${yyyySig.value}/${ymdSig.value}/`;
      const data = await serverImg(
        `${basUrl}${localitaSig.value}_${ymdSig.value}_${runSig.value}.png`,
      );

      return data;
    });

    return (
      <>
        <div class="md:flex">
          <div>
            {
              /* Lista delle Localita */
              pelmoLoc.value.map((v, index) => (
                <button
                  key={index}
                  class={`g-button m-0.5 p-2 py-1 text-sm ${localitaSig.value === v.localita ? "btnCurrent bg-blue-200" : ""}`}
                  onClick$={() => {
                    localitaSig.value = v.localita;
                  }}
                >
                  {v.localita}
                </button>
              ))
            }
          </div>
          <div>
            <Modal.Root>
              <Modal.Trigger class="modal-trigger g-button m-2 p-4">
                informazioni aggiuntive
              </Modal.Trigger>
              <Modal.Panel class="modal-panel m-auto h-[90%] w-[90%] p-8">
                <Modal.Title class="m-2 p-2 text-center font-bold text-blue-800">
                  Informazioni su PELMO
                </Modal.Title>
                <div class="text-sm leading-6">
                  <p>
                    Il modello PELMO (PrevisionE nell’aLto adriatico del Moto
                    Ondoso) è stato sviluppato da ISMAR CNR in collaborazione
                    con il Centro di Previsione e Segnalazione Maree del Comune
                    di Venezia (CPSM).
                  </p>
                  <p>
                    Il sistema è costituito da due modelli ad innesto: uno
                    lavora su tutto il mar Adriatico e parte del mar Ionio con
                    focus sull'Alto Adriatico e risoluzione 2.5 km, l’altro
                    lavora solo sulla fascia costiera veneto-friulana con
                    risoluzione 500 m.
                  </p>
                  <p>
                    Il limite dalla costa è definito da batimetria di 5 metri.
                  </p>
                  <p>
                    Entrambi i modelli sono basati su WaveWatch III (WW3),
                    forzati dai campi di vento a 10 m forniti dal modello
                    atmosferico IFS-ECMWF e dai campi di livello del mare e
                    correnti forniti da un modello idrologico.
                  </p>
                  <p>
                    Il sistema esegue due run al giorno, alle 09:30 e alle 21:30
                    in relazione alla disponibilità delle due corse principali
                    dell'IFS-ECMWF (00:00 e 12:00 UTC) ed è stato calibrato per
                    fornire la massima precisione su un’onda significativa
                    compresa tra 1 metro e 3 metri.
                  </p>
                  <p>
                    I grafici riassuntivi sono elaborati utilizzando i dati
                    orari provenienti dalle due corse giornaliere del modello,
                    con un orizzonte previsionale di 120 ore (5 giorni).
                  </p>
                  <p>
                    L'analisi è condotta su cinque aree di interesse, centrate
                    rispettivamente su Lignano, Grado, Monfalcone, Miramare e
                    sulla boa DWRG1.
                  </p>
                  <p>
                    Ciascuna area è definita come un settore circolare con
                    raggio di 15 km centrato sulla località di riferimento.
                  </p>
                  <p class="mt-4">
                    I grafici rappresentano una serie temporale di tre diverse
                    grandezze derivate:
                  </p>
                  <ul class="mt-2 list-inside list-disc">
                    <li>
                      <span class="font-bold">linea nera:</span> media dell’onda
                      significativa, prendendo la media di tutti i punti
                      dell'area
                    </li>
                    <li>
                      <span class="font-bold text-red-600">linea rossa:</span>{" "}
                      massimo dell'onda significativa, prendendo il massimo di
                      tutti i punti dell'area;
                    </li>
                    <li>
                      <span class="font-bold text-blue-600">linea blu:</span>{" "}
                      metà della media dell'onda significativa, che è una stima
                      dell'altezza dell'onda più frequente;
                    </li>
                  </ul>
                  <p class="mt-4">
                    Nella fascia inferiore del grafico è riportata anche la
                    direzione di provenienza dell'onda significativa nei punti
                    centrali dei settori circolari (linea nera).
                  </p>
                  <ul class="ml-4 list-disc p-2">
                    <div>Referenti CPSM</div>
                    <li>alvise.papa@comune.venezia.it</li>
                  </ul>
                  <ul class="ml-4 list-disc p-2">
                    <div>Referenti CNR-ISMAR</div>
                    <li>luigi.cavalieri@ismar.cnr.it</li>
                    <li>alvise.benettazzo@ismar.cnr.it</li>
                  </ul>
                  <ul class="ml-4 list-disc p-2">
                    <div>referente ARPA</div>
                    <li>giuseppe.visalli@arpa.fvg.it</li>
                  </ul>
                </div>
                <footer class="mt-4">
                  <Modal.Close class="modal-close">
                    <span class="inline" title="chiudi">
                      <Close></Close>
                    </span>
                  </Modal.Close>
                </footer>
              </Modal.Panel>
            </Modal.Root>
          </div>
        </div>

        <div class="md:flex">
          <Resource
            value={imgLoc}
            onPending={() => <Loading>Loading images ...</Loading>}
            onRejected={() => <p>error ...</p>}
            onResolved={(res) => {
              return res ? (
                <Image
                  class={`max-h-screen w-full object-contain object-top md:h-[calc(100vh-220px)]`}
                  src={res}
                ></Image>
              ) : (
                <div class="g-error w-full">
                  {" "}
                  {localitaSig.value} non disponibile{" "}
                </div>
              );
            }}
          />
        </div>
      </>
    );
  },
);
