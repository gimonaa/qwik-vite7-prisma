import { component$, type Signal, type PropsOf, $ } from "@qwik.dev/core";
import { Undo } from "../svg/undo";
import { Button } from "./button";

export interface ButtonProps extends PropsOf<"button"> {
  reloadSig: Signal<boolean>;
}

export const LoadDefaultButton = component$<ButtonProps>((props) => {
  const { reloadSig, ...rest } = props;
  return (
    <Button
      {...rest}
      type="reset"
      title="carica default"
      onClick$={$(() => {
        reloadSig.value = !reloadSig.value;
        //   salvaTestiAction.submit({
        //     formData: {
        //       oggetto: defaultVal.oggetto,
        //       from: defaultVal.from,
        //       visti: defaultVal.visti,
        //       chiede: defaultVal.chiede,
        //       firma: defaultVal.firma,
        //       responsabile: defaultVal.responsabile,
        //       userId: +(user.value?.user.id ?? 0),
        //     },
        //   });
      })}
    >
      {/* carica default */}
      <Undo />
    </Button>
  );
});
