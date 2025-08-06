import { component$, type PropsOf } from "@qwik.dev/core";

export const Right = component$<PropsOf<"svg">>((props) => {
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
          d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"
        />
      </svg>
    </>
  );
});
