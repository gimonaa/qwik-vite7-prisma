import { component$ } from "@qwik.dev/core";

export interface PdfViewerProps {
  src: string;
}

export const PdfViewer = component$<PdfViewerProps>((props) => {
  return <embed class="h-lvh w-full" src={`${props.src}`}></embed>;
});
