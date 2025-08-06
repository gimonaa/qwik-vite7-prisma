import { component$ } from "@qwik.dev/core";
import {
  useGetModelsProbVar,
  useGetModelProbRelations,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProbProps } from "./modelProbMenu";

export const ModelProbVar = component$<ModelProbProps>((props) => {
  const levels = useGetModelsProbVar();
  const modelRelations = useGetModelProbRelations();

  return (
    <>
      {levels.value.map((v, k) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.variable == v.name && "bg-blue-200"} ${
            modelRelations.value.filter(
              (el) =>
                el.models.name == props.store.model &&
                el.levels.name == props.store.level &&
                el.vars.name == v.name,
            ).length <= 0 && "opacity-25"
          } `}
          key={k}
          onClick$={() => {
            props.store.variable = v.name;
            props.store.lastButton = "vars";

            if (props.store.statistic === "SCATTER" && props.store.variable !== "Z") {
              props.store.statistic = "NORMAL";
              props.store.step = "000";
            }
          }}
        >
          {v.name}
        </button>
      ))}
    </>
  );
});
