import { component$ } from "@qwik.dev/core";
import {
  useGetModelsDetList,
  useGetModelRelations,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProps } from "./modelMenu";

export const ModelList = component$<ModelProps>((props) => {
  const models = useGetModelsDetList();
  const modelRelations = useGetModelRelations();

  return (
    <>
      {models.value.map((v: any, k: any) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.model == v.codice && "bg-blue-200"} ${
            modelRelations.value.filter(
              (el) =>
                el.domains.name == props.store.domain &&
                el.models.name == v.name, // &&
              // el.levels.name == props.store.level &&
              // el.varsCum.name == props.store.varCum &&
              // el.vars.name == props.store.variable
            ).length <= 0 && "opacity-25"
          } `}
          key={k}
          onClick$={() => {
            props.store.model = v.codice;
            props.store.lastButton = "list";
          }}
        >
          {v.descrizione}
        </button>
      ))}
    </>
  );
});
