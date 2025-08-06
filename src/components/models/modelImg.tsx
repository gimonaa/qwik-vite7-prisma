import { component$ } from "@qwik.dev/core";
// import { useResource$, Resource, noSerialize } from '@qwik.dev/core';
export interface ModelProps {
  src: any;
  width?: any;
  height?: any;
  class?: string;
  alt?: string;
}

export const ModelImg = component$<ModelProps>((props) => {
  return (
    <>
      <img
        width={props.width || `300`}
        height={props.height || `300`}
        alt="immagine non disponibile"
        // class={props.class || `w-full max-h-screen`} // fitta in larghezza
        class={
          props.class ||
          `w-fit object-contain object-top md:h-[calc(100vh-120px)]`
        } // con versione 3.3 di tailwind
        src={props.src}
      />
    </>
  );
});
