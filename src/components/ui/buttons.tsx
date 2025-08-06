import { component$, type Signal } from "@qwik.dev/core";

export interface Props {
  buttonSig: Signal<string>;
  buttonList: { id: string; desc: string }[];
  description: string;
  class?: string;
}

export const Buttons = component$<Props>((props) => {
  return (
    <>
      <div class="g-accordion mx-2">{props.description}</div>
      <div class="flex">
        {props.buttonList.map((v, k) => (
          <button
            class={`g-button m-0.5 text-sm ${props.buttonSig.value == v.id && "bg-blue-200"} ${props.class}`}
            key={k}
            onClick$={() => (props.buttonSig.value = v.id)}
          >
            {v.desc}
          </button>
        ))}
      </div>
    </>
  );
});
