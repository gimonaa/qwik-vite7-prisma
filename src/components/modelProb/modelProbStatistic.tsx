import { component$ } from "@qwik.dev/core";
import {
  useGetModelProbRelations,
  useGetModelsProbStatistic,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProbProps } from "./modelProbMenu";

export const ModelProbStatistic = component$<ModelProbProps>((props) => {
  const stat = useGetModelsProbStatistic();
  const modelRelations = useGetModelProbRelations();

  return (
    <>
      {stat.value.map((v, k) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.statistic == v.name && "bg-blue-200"} ${
            modelRelations.value.filter(
              (el) =>
                el.models.name == props.store.model &&
                el.levels.name == props.store.level &&
                el.vars.name == props.store.variable &&
                el.statistic.includes(v.name),
            ).length <= 0 && "opacity-25"
          } `}
          key={k}
          onClick$={() => {
            props.store.statistic = v.name;
            props.store.lastButton = "statistic";
            if (Number(props.store.step) == 0) {
              props.store.step = "006";
            }
            if (props.store.statistic != "SCATTER") {
              props.store.step = "000";
            }
          }}
        >
          {v.name.length == 0 ? " null " : v.name}
        </button>
      ))}
    </>
  );
});
