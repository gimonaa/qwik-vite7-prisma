import { component$, useSignal, type Signal } from "@qwik.dev/core";
import { BsArrowClockwise } from "@qwikest/icons/bootstrap";
import moment from "moment";

export interface DateTimeProps {
  ymdSig: Signal<string>;
  updating?: boolean;
}

export const Date = component$<DateTimeProps>((props) => {
  let tmpData = props.ymdSig.value;
  if (/^\d{8}$/.test(props.ymdSig.value)) {
    tmpData = moment(props.ymdSig.value).format("YYYY-MM-DD");
  }
  const ymdSig = useSignal<string>(tmpData);

  return (
    <>
      <div class={`g-accordion mx-2`}>data</div>
      <div class={`flex`}>
        <input
          type="date"
          class={`m-0.5 rounded-md border-2 p-1 ${props.updating && "g-date-updating"} ${ymdSig.value !== moment.utc().format("YYYY-MM-DD") && "g-date-alert"}`}
          id="dateTime"
          name="trip-start"
          bind:value={ymdSig}
          aria-label="dateTime"
          onChange$={(_, el) => {
            props.ymdSig.value = el.value.replace(/-/g, "");
            if (props.updating) {
              props.updating = false;
            }
          }}
        />
        <button
          class="g-button m-1 p-2 text-xl"
          onClick$={() => {
            props.ymdSig.value = moment().utc().format("YYYYMMDD");
            ymdSig.value = moment().utc().format("YYYY-MM-DD");
          }}
        >
          <BsArrowClockwise></BsArrowClockwise>
        </button>
      </div>
    </>
  );
});
