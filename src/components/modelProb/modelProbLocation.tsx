import { component$ } from "@qwik.dev/core";
import { useGetModelsProbLocation } from "~/routes/(authenticated)/modelli/layout";
import { type ModelProbProps } from "./modelProbMenu";

export const ModelProbLocation = component$<ModelProbProps>((props) => {
  const locations = useGetModelsProbLocation();

  return (
    <>
      {locations.value.map((v, k) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.location == v.codice && "bg-blue-200"}`}
          key={k}
          title={v.codice}
          onClick$={() => {
            props.store.location = v.codice;
            props.store.lastButton = "domain";
          }}
        >
          {v.name.length == 0 ? " null " : v.name}
        </button>
      ))}
    </>
  );
});
