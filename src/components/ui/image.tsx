import { type PropsOf, component$ } from "@qwik.dev/core";

type ImageProps = PropsOf<"img">;

export const Image = component$<ImageProps>((props) => {
  return (
    <>
      <img
        // loading="lazy"
        {...props}
        // decoding="async"
        width={props.width || undefined}
        height={props.height || `300`}
        class={
          props.class ||
          `max-h-screen w-full object-contain object-top md:h-[calc(100vh-120px)]`
        }
        src={`${props.src}`}
      />
    </>
  );
});
