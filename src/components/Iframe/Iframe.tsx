import { component$, type PropsOf } from "@qwik.dev/core";

type IframeProps = PropsOf<"iframe">;

export const Iframe = component$<IframeProps>((props) => {
  return (
    <iframe
      // onLoad$={(e,v) => { v.contentDocument?.cookie.valueOf = 'accept=true; path=/;' }}
      // onload="this.contentWindow.document.cookie='accept=true; path=/;'"
      sandbox="allow-scripts allow-top-navigation allow-same-origin allow-popups allow-downloads allow-forms"
      {...props}
      width={props.width || "100%"}
      height={props.height || "800px"}
      class="max-h-screen w-full object-contain object-top md:h-[calc(100vh)]"
      // class="object-top object-contain md:h-[calc(100vh-40px)] w-full max-h-screen"
    ></iframe>
  );
});
