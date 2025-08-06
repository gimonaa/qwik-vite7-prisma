import { component$ } from "@qwik.dev/core";
import { Image } from "../ui/image";

export const Foehn = component$(() => {
  return (
    <>
      <Image src={`https://wetter.provinz.bz.it/images/pgradient_it.png`} />
    </>
  );
});
