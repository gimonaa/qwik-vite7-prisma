import { component$, type PropsOf } from "@qwik.dev/core";

export const Download = component$<PropsOf<"svg">>((props) => {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || "32"}
        height={props.height || "32"}
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z" />
      </svg>
    </>
  );
});
