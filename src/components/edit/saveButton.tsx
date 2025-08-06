import { component$, type PropsOf } from "@qwik.dev/core";
import { Save } from "../svg/save";
import { Button } from "./button";

export interface ButtonProps extends PropsOf<"button"> {
  saved?: null | string | number;
  error?: null | string[] | string | number;
}

export const SaveButton = component$<ButtonProps>((props) => {
  return (
    <Button
      {...props}
      type="submit"
      class={`g-button m-2 p-3 px-3 ${props.saved ? "bg-green-200" : "bg-red-200"} ${props.error && "bg-red-200"} `}
      title="salva"
    >
      <Save />
    </Button>
  );
});
