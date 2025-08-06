import { component$ } from "@qwik.dev/core";
import {
  useGetModelRelations,
  useGetModelsVarCum,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProps } from "./modelMenu";

export const ModelVarCum = component$<ModelProps>((props) => {
  const intervals = useGetModelsVarCum();
  const modelRelations = useGetModelRelations();

  return (
    <>
      {intervals.value.map((v: any, k: any) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.varCum == v.name && "bg-blue-200"} ${
            modelRelations.value.filter(
              (el) =>
                el.domains.name == props.store.domain &&
                el.models.name == props.store.model &&
                el.varsCum.name == v.name &&
                el.levels.name == props.store.level, // &&
              // el.vars.name == props.store.variable
            ).length <= 0 && "opacity-25"
          } `}
          key={k}
          onClick$={() => {
            props.store.varCum = v.name;
            props.store.lastButton = "varsCum";
          }}
        >
          {v.name.length == 0 ? " default " : v.name}
        </button>
      ))}
    </>
  );
});
