import { type PropsOf, component$, useStylesScoped$ } from "@qwik.dev/core";

type ImageProps = PropsOf<"img">;

export const ImageFull = component$<ImageProps>((props) => {
  useStylesScoped$(`
    @media (max-width: 1300px) {
      img {
        max-width: none !important;
      }
    }
    @media (min-width: 1300px) {
      img {
        max-width: 100% !important;
      }
    }

  `);

  return (
    <>
      <img
        decoding="async"
        loading="lazy"
        width={props.width || `2300`}
        height={props.height || `2300`}
        class={
          props.class ||
          `max-h-screen w-full object-contain object-top md:h-[calc(100vh-120px)]`
        }
        src={`${props.src}`}
      />
    </>
  );
});
