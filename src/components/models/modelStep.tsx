import { component$ } from "@qwik.dev/core";
import {
  useGetModelsStep,
  useGetModelRelations,
  useGetModelsRunRel,
} from "~/routes/(authenticated)/modelli/layout";
import { type ModelProps } from "./modelMenu";
import { BsArrowLeft, BsArrowRight } from "@qwikest/icons/bootstrap";

export const ModelStep = component$<ModelProps>((props) => {
  const step = useGetModelsStep();
  const modelRelations = useGetModelRelations();
  const runModel = useGetModelsRunRel();
  // console.debug("Model", runModel.value);

  return (
    <>
      {step.value.map(
        (v, k) =>
          modelRelations.value.filter(
            (el) =>
              el.domains.name == props.store.domain &&
              el.models.name == props.store.model &&
              el.levels.name == props.store.level &&
              el.varsCum.name == props.store.varCum &&
              el.vars.name == props.store.variable &&
              el.steps.start <= Number(v.name) &&
              Number(v.name) <= el.steps.end &&
              Number(v.name) % el.steps.step == 0 &&
              runModel.value.filter(
                (el) =>
                  el.name == props.store.model && el.run == props.store.run,
              )[0].maxStep >= Number(v.name),
          ).length > 0 && (
            <button
              class={`g-button m-0.5 px-1 py-0 text-xs ${props.store.step == v.name && "btnCurrent bg-blue-200"} `}
              key={k}
              onMouseOver$={() => (props.store.step = v.name)}
              aria-label={v.name}
            >
              {v.name}
            </button>
          ),
      )}

      <br></br>

      <button
        class="g-button m-0.5 px-2 py-0 text-lg"
        onClick$={() =>
          (props.store.step = document.querySelector(".btnCurrent")
            ?.previousElementSibling?.innerHTML
            ? (document
                .querySelector(".btnCurrent")
                ?.previousElementSibling?.innerHTML.toString() as string)
            : (document
                .querySelector(".btnCurrent")
                ?.innerHTML.toString() as string))
        }
        aria-label="precedente"
      >
        {" "}
        <BsArrowLeft></BsArrowLeft>{" "}
      </button>

      <button
        class="g-button m-0.5 mt-2 mb-2 p-2 px-2 py-0 text-lg"
        onClick$={() =>
          (props.store.step = document.querySelector(".btnCurrent")
            ?.nextElementSibling?.innerHTML
            ? (document
                .querySelector(".btnCurrent")
                ?.nextElementSibling?.innerHTML.toString() as string)
            : (document
                .querySelector(".btnCurrent")
                ?.innerHTML.toString() as string))
        }
        aria-label="successivo"
      >
        {" "}
        <BsArrowRight></BsArrowRight>{" "}
      </button>
    </>
  );
});
