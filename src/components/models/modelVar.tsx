import { component$ } from "@qwik.dev/core";
import {
  useGetModelsVar,
  useGetModelRelations,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProps } from "./modelMenu";

export const ModelVar = component$<ModelProps>((props) => {
  const levels = useGetModelsVar();
  const modelRelations = useGetModelRelations();

  return (
    <>
      {levels.value.map((v: any, k: any) =>
        /#+/.test(v.name) ? (
          <div key={k} class="p-1.5"></div>
        ) : (
          <button
            class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.variable == v.name && "bg-blue-200"} ${
              modelRelations.value.filter(
                (el) =>
                  el.domains.name == props.store.domain &&
                  el.models.name == props.store.model &&
                  el.levels.name == props.store.level &&
                  el.varsCum.name == props.store.varCum &&
                  el.vars.name == v.name,
              ).length <= 0 && "opacity-25"
            } `}
            key={k}
            onClick$={() => {
              props.store.variable = v.name;
              props.store.lastButton = "vars";
            }}
          >
            {v.name}
          </button>
        ),
      )}
    </>
  );
});
