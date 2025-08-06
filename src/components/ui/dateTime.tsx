import { component$, useSignal, type Signal } from "@qwik.dev/core";
import { BsArrowClockwise } from "@qwikest/icons/bootstrap";
import moment from "moment";

export interface DateTimeProps {
  ymdSig: Signal<string>;
  ySig: Signal<string>;
  hmSig: Signal<string>;
}

export const DateTime = component$<DateTimeProps>((props) => {
  const ymdSig = useSignal(moment().utc().format("YYYY-MM-DD"));

  return (
    <>
      <div class="g-accordion mx-2">data ora</div>
      <div class="flex">
        <input
          class="m-0.5 rounded-md p-1"
          type="date"
          id="dateTime"
          name="trip-start"
          bind:value={ymdSig}
          aria-label="dateTime"
          onChange$={(ev, el) => {
            props.ymdSig.value = el.value.replace(/-/g, "");
            props.ySig.value = el.value.split("-")[0].replace(/-/g, "");
          }}
        />
        <input
          class="m-0.5 rounded-md p-1"
          type="time"
          id="time"
          step={600}
          name="trip-start"
          bind:value={props.hmSig}
          aria-label="time"
          // onChange$={(ev,el) => props.hmSig.value = el.value}
        />
        <button
          class="g-button m-1 p-2 text-xl"
          onClick$={() => {
            props.hmSig.value = moment().utc().format("HH:mm");
            props.ymdSig.value = moment().utc().format("YYYYMMDD");
            props.ySig.value = moment().utc().format("YYYY");
            ymdSig.value = moment().utc().format("YYYY-MM-DD");
          }}
        >
          <BsArrowClockwise></BsArrowClockwise>
        </button>
      </div>
    </>
  );
});
