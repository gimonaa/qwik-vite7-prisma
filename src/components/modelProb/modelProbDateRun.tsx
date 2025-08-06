import { component$, useSignal } from "@qwik.dev/core";
import { useGetModelsProbRun } from "~/routes/(authenticated)/modelli/layout";
import { type ModelProbProps } from "./modelProbMenu";
import { useymdTime } from "~/routes/(authenticated)/layout";
import moment from "moment";

export const ModelProbDateRun = component$<ModelProbProps>((props) => {
  // const ymd = useymdTime();
  // console.debug("ModelProbDateRun",props.store);

  const ymdSig = useSignal(moment(props.store.datarun).format("YYYY-MM-DD"));
  const minDate = useymdTime(new Date(), -15);
  const maxDate = useymdTime(new Date());

  const run = useGetModelsProbRun();

  return (
    <>
      <div>
        <input
          type="date"
          // class="m-0.5 rounded-md border-2 border-blue-400 p-1"
          class={`m-0.5 rounded-md border-2 p-1 ${props.updating && "g-date-updating"} ${ymdSig.value !== moment.utc().format("YYYY-MM-DD") && "g-date-alert"}`}
          id="datarun"
          name="trip-start"
          // value={ymd}
          bind:value={ymdSig}
          min={minDate}
          max={maxDate}
          aria-label="datarun"
          onChange$={(_, el) => (props.store.datarun = el.value)}
        />
      </div>

      <div>
        {run.value.map((v, k) => (
          <button
            class={`g-button m-0.5 px-2 py-0 text-sm ${props.store.run == v.name && "bg-blue-200"}`}
            key={k}
            onClick$={() => (props.store.run = v.name)}
          >
            {v.name}
          </button>
        ))}
      </div>
    </>
  );
});
