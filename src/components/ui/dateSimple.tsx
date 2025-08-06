import { component$, useSignal, type Signal } from "@qwik.dev/core";
import moment from "moment";

export interface DateTimeProps {
  ymdSig: Signal<string>;
  updating?: boolean;
}

export const DateSimple = component$<DateTimeProps>((props) => {
  let tmpData = props.ymdSig.value;
  if (/^\d{8}$/.test(props.ymdSig.value)) {
    tmpData = moment(props.ymdSig.value).format("YYYY-MM-DD");
  }
  const ymdSig = useSignal<string>(tmpData);

  return (
    <>
      <input
        type="date"
        class={`m-0.5 rounded-md border-2 p-1`}
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
    </>
  );
});
