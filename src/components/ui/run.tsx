import { component$, type Signal } from "@qwik.dev/core";

export interface Props {
  runSig: Signal<string>;
  runList: string[];
  runIncSig?: Signal<number>;
  class?: Signal<string>;
}

export const Run = component$<Props>((props) => {
  return (
    <>
      <div class="g-accordion mx-2">run</div>
      {/* <div class="flex">  */}
      <div class="">
        {props.runList.map((v, k) => (
          <button
            class={`g-button m-0.5 px-2 py-0 text-sm ${props.runSig.value == v && "bg-blue-200"}`}
            key={k}
            onClick$={() => {
              props.runSig.value = v;
              if (props.class) {
                props.class.value = "";
              }
            }}
          >
            {v}
          </button>
        ))}
        {props.runIncSig?.value && (
          <button
            class={`g-button m-0.5 px-2 py-0 text-sm`}
            onClick$={() =>
              props.runIncSig
                ? (props.runSig.value = (
                    +props.runSig.value - props.runIncSig.value
                  )
                    .toString()
                    .padStart(2, "0"))
                : ""
            }
          >
            -
          </button>
        )}
        {props.runIncSig?.value && (
          <button
            class={`g-button m-0.5 px-2 py-0 text-sm`}
            onClick$={() =>
              props.runIncSig
                ? (props.runSig.value = (
                    +props.runSig.value + props.runIncSig.value
                  )
                    .toString()
                    .padStart(2, "0"))
                : ""
            }
          >
            +
          </button>
        )}
      </div>
    </>
  );
});
