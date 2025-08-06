import { component$, type PropsOf } from "@qwik.dev/core";

export const CloseSmall = component$<PropsOf<"svg">>((props) => {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || "24"}
        height={props.height || "24"}
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-dasharray="16"
          stroke-dashoffset="16"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M7 7l10 10">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="16;0"
            />
          </path>
          <path d="M17 7l-10 10">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.4s"
              dur="0.4s"
              values="16;0"
            />
          </path>
        </g>
      </svg>
    </>
  );
});
