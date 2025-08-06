import { type PropsOf, component$ } from "@qwik.dev/core";

type SliderProps = PropsOf<"input">;

export const Slider = component$<SliderProps>(({ ...props }) => {
  const min: number = Number(props.min || 0);
  const max: number = Number(props.max || 100);

  return (
    <>
      <div class="relative m-2 mb-8">
        <input class={props.class || ``} {...props}></input>
        <span class="absolute start-0 -bottom-6 text-xs text-gray-500">
          {props.min}
        </span>
        <span class="absolute start-1/3 -bottom-6 -translate-x-1/2 text-xs text-gray-500 rtl:translate-x-1/2">
          {Math.floor((max - min) / 3 + min)}
        </span>
        <span class="absolute start-2/3 -bottom-6 -translate-x-1/2 text-xs text-gray-500 rtl:translate-x-1/2">
          {Math.floor(((max - min) / 3) * 2 + min)}
        </span>
        <span class="absolute end-0 -bottom-6 text-xs text-gray-500">
          {props.max}
        </span>
      </div>
    </>
  );
});
