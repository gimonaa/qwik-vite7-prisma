import { component$, Slot } from "@qwik.dev/core";

export const Firma = component$(() => {
  return (
    <div class="my-3 grid grid-cols-2 gap-4 text-xs">
      <div></div>
      <div class="text-center">
        <Slot></Slot>
        <p class="italic">
          firma autografa omessa ai sensi
          <br />
          dell'art. 3, c. 2, D.Lgs. 12/02/1993, n. 39
        </p>
      </div>
    </div>
  );
});
