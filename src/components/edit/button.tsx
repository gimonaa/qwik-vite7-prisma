import { component$, Slot, type PropsOf } from "@qwik.dev/core";

export const Button = component$<PropsOf<"button">>((props) => {
  return (
    <button class="g-button m-2 p-3" {...props}>
      <Slot />
    </button>
  );
});
