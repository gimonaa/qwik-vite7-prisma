import { component$ } from "@qwik.dev/core";
import {
  useGetModelsLevel,
  useGetModelRelations,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProps } from "./modelMenu";

export const ModelLevel = component$<ModelProps>((props) => {
  const levels = useGetModelsLevel();
  const modelRelations = useGetModelRelations();

  return (
    <>
      {levels.value.map((v: any, k: any) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.level == v.name && "bg-blue-200"} ${
            modelRelations.value.filter(
              (el) =>
                el.domains.name == props.store.domain &&
                el.models.name == props.store.model &&
                // el.varsCum.name == props.store.varCum &&
                el.levels.name == v.name, //&&
              // el.vars.name == props.store.variable
            ).length <= 0 && "opacity-25"
          } `}
          key={k}
          onClick$={() => {
            props.store.level = v.name;
            props.store.lastButton = "level";
          }}
        >
          {v.name.length == 0 ? " null " : v.name}
        </button>
      ))}
    </>
  );
});
