import {
  component$,
  Resource,
  useResource$,
  useSignal,
  type Signal,
} from "@qwik.dev/core";
import moment from "moment";
// import { Loading } from "../ui/loading";
import { serverImg, zeroPad } from "~/routes/(authenticated)/layout";
import { Image } from "~/components/ui/image";
import { mouseWheelStepSig } from "~/routes/(authenticated)/layout";
import { BsArrowLeft, BsArrowRight } from "@qwikest/icons/bootstrap";

export const OndaMappe = component$(
  ({
    ymdSig,
    runSig,
    baseDir,
  }: {
    ymdSig: Signal;
    runSig: Signal;
    baseDir: string;
  }) => {
    const yyyySig = useSignal(moment().utc().format("YYYY"));
    const stepMinSig = useSignal(6);
    const stepCurrSig = useSignal(6);
    const stepMaxSig = useSignal(120);
    const stepIncSig = useSignal(6);

    const incListSig = useSignal([1, 3, 6]);

    const imgLoc = useResource$(async ({ track, cleanup }) => {
      track(() => ymdSig.value);
      track(() => runSig.value);
      track(() => stepCurrSig.value);

      const controller = new AbortController();
      cleanup(() => controller.abort());

      yyyySig.value = ymdSig.value.substring(0, 4);

      const basUrl = `${baseDir}${yyyySig.value}/${ymdSig.value}/`;
      const data = await serverImg(
        `${basUrl}PELMO_${ymdSig.value}${runSig.value}_${zeroPad(stepCurrSig.value, 3)}_onda.png`,
      );
      // console.debug(data);

      return data;
    });

    return (
      <>
        <div class="md:flex">
          <div class="">
            {
              /* Lista delle località */
              Array.from(
                {
                  length:
                    Math.floor(
                      (stepMaxSig.value - stepMinSig.value) / stepIncSig.value,
                    ) + 1,
                },
                (_, i) => stepMinSig.value + stepIncSig.value * i,
              ).map((v, index) => (
                <button
                  key={index}
                  class={`g-button m-0.5 p-1 text-xs ${stepCurrSig.value === v ? "btnCurrent bg-blue-200" : ""}`}
                  onMouseOver$={() => (stepCurrSig.value = v)}
                >
                  {zeroPad(v, 3)}
                </button>
              ))
            }
          </div>
        </div>
        <div>
          <button
            class="g-button m-0.5 px-2 py-1 text-lg"
            onClick$={() =>
              (stepCurrSig.value =
                stepCurrSig.value === stepMinSig.value
                  ? stepMaxSig.value
                  : stepCurrSig.value - stepIncSig.value)
            }
            aria-label="precedente"
          >
            {" "}
            <BsArrowLeft></BsArrowLeft>{" "}
          </button>
          <button
            class="g-button m-0.5 px-2 py-1 text-lg"
            onClick$={() =>
              (stepCurrSig.value =
                stepCurrSig.value === stepMaxSig.value
                  ? stepMinSig.value
                  : stepCurrSig.value + stepIncSig.value)
            }
            aria-label="successivo"
          >
            {" "}
            <BsArrowRight></BsArrowRight>{" "}
          </button>
          <div class="inline-flex pl-4">
            {incListSig.value.map((v, index) => (
              <button
                key={index}
                class={`g-button m-0.5 px-2 py-1 text-xs ${stepIncSig.value === v ? "btnCurrent bg-blue-200" : ""}`}
                onClick$={() => {
                  stepIncSig.value = v;
                  stepCurrSig.value = stepMinSig.value;
                }}
                aria-label={`step: ${v} h`}
              >
                step: {v} h
              </button>
            ))}
          </div>
        </div>
        <div class="md:flex">
          <Resource
            value={imgLoc}
            // onPending={() => <Loading>Loading images ...</Loading>}
            onRejected={() => <p>error ...</p>}
            onResolved={(res) => {
              return res ? (
                <Image
                  class={`max-h-screen w-full object-contain object-top md:h-[calc(100vh-220px)]`}
                  onWheel$={(e) =>
                    mouseWheelStepSig(
                      e,
                      stepCurrSig,
                      stepMinSig,
                      stepMaxSig,
                      stepIncSig,
                    )
                  }
                  src={res}
                ></Image>
              ) : (
                <div class="mt-2"> non disponibile </div>
              );
            }}
          />
        </div>
      </>
    );
  },
);
