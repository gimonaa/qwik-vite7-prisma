import { component$, type PropsOf } from "@qwik.dev/core";

export const Unchecked = component$<PropsOf<"svg">>((props) => {
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
          d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
        />
      </svg>
    </>
  );
});
