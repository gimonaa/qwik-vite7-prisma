import { component$, Slot, type PropsOf } from "@qwik.dev/core";
import { View } from "../svg/view";
import { Button } from "./button";
import { Link } from "@qwik.dev/router";
import { Archive } from "../svg/archive";
import { Info } from "../svg/info";

export interface ButtonProps extends PropsOf<"button"> {
  url?: string;
  icon?: "view" | "archive" | "info" | null;
  target?: string;
}

export const LinkButton = component$<ButtonProps>((props) => {
  return (
    <Button
      {...props}
      type="button"
      // onClick$={() => (
      //   // open new tab
      //   window.open(`${props.url}`, "_blank")
      // )}
    >
      <Link
        target={props.target ?? "_blank"}
        href={props.url ?? "#"}
        prefetch={false}
      >
        {props.icon === "view" && <View />}
        {props.icon === "archive" && <Archive />}
        {props.icon === "info" && <Info />}
        {props.icon === null && <Slot />}
      </Link>
    </Button>
  );
});
