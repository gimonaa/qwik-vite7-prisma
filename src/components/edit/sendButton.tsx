import {
  component$,
  type Signal,
  type PropsOf,
  useSignal,
} from "@qwik.dev/core";
import { Button } from "./button";
import { Email } from "../svg/email";
import { Upload } from "../svg/upload";
import { Loading } from "../svg/loading";
import { type ActionStore } from "@qwik.dev/router";

export interface ButtonProps extends PropsOf<"button"> {
  saveAction: ActionStore<any, any>;
  transferSig: Signal;
  transferLoadingSig: Signal<boolean>;
  // pdfAction?: string;
}

export const SendButton = component$<ButtonProps>(
  ({ saveAction, ...props }) => {
    const disabledSig = useSignal<boolean>(false);

    // useVisibleTask$(async({ track }) => {
    //   track(() => saveAction.value);
    //   track(() => pdfAction?.value);
    //   console.debug("SendButton: saveAction.value", saveAction.value);
    //   console.debug("SendButton: pdfAction.value", pdfAction?.value);
    //   disabledSig.value = saveAction.value?.formErrors || (pdfAction?.value?.datetime < saveAction.value?.data.data);
    // })

    return (
      <Button
        {...props}
        type="button"
        disabled={saveAction.value?.formErrors ? true : false}
        // disabled={disabledSig.value}
        title="invia ftp + e-mail"
        class={`g-button absolute m-2 p-3 ${
          props.transferSig.value === undefined
            ? "bg-blue-200"
            : props.transferSig.value.status
              ? "bg-green-200"
              : "bg-red-200"
        } ${saveAction.value?.formErrors && "opacity-50"} ${disabledSig.value && "opacity-50"} `}
      >
        {/* invia */}
        <Email class="inline"></Email>
        <Upload class="ml-2 inline"></Upload>
        {props.transferLoadingSig.value && <Loading class="inline"></Loading>}
      </Button>
    );
  },
);
