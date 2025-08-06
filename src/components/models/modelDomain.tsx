import { component$ } from "@qwik.dev/core";
import {
  useGetModelRelations,
  useGetModelsDomain,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProps } from "./modelMenu";

export const ModelDomain = component$<ModelProps>((props) => {
  const domain = useGetModelsDomain();
  const modelRelations = useGetModelRelations();

  return (
    <>
      {domain.value.map((v: any, k: any) => (
        <button
          class={`g-button m-0.5 px-2 py-1 text-xs ${props.store.domain == v.name && "bg-blue-200"} ${
            modelRelations.value.filter(
              (el) =>
                el.domains.name == v.name &&
                el.models.name == props.store.model,
            ).length <= 0 && "opacity-25"
          } `}
          key={k}
          onClick$={() => {
            props.store.domain = v.name;
            props.store.lastButton = "domain";
          }}
        >
          {v.name.length == 0 ? " null " : v.name}
        </button>
      ))}
    </>
  );
});
