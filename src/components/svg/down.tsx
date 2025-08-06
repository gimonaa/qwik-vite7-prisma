import { component$, type PropsOf } from "@qwik.dev/core";

export const Down = component$<PropsOf<"svg">>((props) => {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || "32"}
        height={props.height || "32"}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"
        />
      </svg>
    </>
  );
});
