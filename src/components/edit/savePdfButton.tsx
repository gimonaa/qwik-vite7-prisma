import { component$, type Signal, type PropsOf } from "@qwik.dev/core";
import { Button } from "./button";
import { Loading } from "../svg/loading";
import { Pdf } from "../svg/pdf";

export interface ButtonProps extends PropsOf<"button"> {
  saved?: null | string | number;
  error?: null | string[] | string | number | undefined | boolean;
  loading: Signal<boolean>;
}

export const SavePdfButton = component$<ButtonProps>((props) => {
  return (
    <Button
      {...props}
      type="submit"
      class={`g-button m-2 p-3 px-3 ${props.saved ? "bg-green-200" : "bg-red-200"} ${props.error && "bg-red-200"} `}
      title="salva"
    >
      {props.loading.value ? <Loading></Loading> : <Pdf></Pdf>}
    </Button>
  );
});
