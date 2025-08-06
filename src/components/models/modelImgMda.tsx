import { component$, useResource$, Resource, $ } from "@qwik.dev/core";
import { type ModelProps } from "./modelMenu";
import { serverImg } from "~/routes/(authenticated)/layout";
import { Image } from "../ui/image";

// Funzioni
export const mouseWheelStep = $((e: WheelEvent, props: ModelProps) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    props.store.step = document.querySelector(".btnCurrent")
      ?.previousElementSibling?.innerHTML
      ? (document
          .querySelector(".btnCurrent")
          ?.previousElementSibling?.innerHTML.toString() as string)
      : (document.querySelector(".btnCurrent")?.innerHTML.toString() as string);
  } else if (e.deltaY > 0) {
    props.store.step = document.querySelector(".btnCurrent")?.nextElementSibling
      ?.innerHTML
      ? (document
          .querySelector(".btnCurrent")
          ?.nextElementSibling?.innerHTML.toString() as string)
      : (document.querySelector(".btnCurrent")?.innerHTML.toString() as string);
  }
});

export const ModelImgMda = component$<ModelProps>((props) => {
  const imgLoc = useResource$(async ({ track }) => {
    track(() => props.store.model);
    track(() => props.store.datarun);
    track(() => props.store.level);
    track(() => props.store.run);
    track(() => props.store.variable);
    track(() => props.store.varCum);
    track(() => props.store.step);
    track(() => props.store.domain);
    const yyyy = props.store.datarun.replace(/-/g, "").substring(0, 4);
    const ymd = props.store.datarun.replace(/-/g, "");
    const url = `${props.store.imgPathMDA}${props.store.model.toLocaleLowerCase()}/${yyyy}/${ymd}/${props.store.model}_${props.store.datarun.replace(/-/g, "")}${props.store.run}_${props.store.step}${props.store.level && "_" + props.store.level}_${props.store.variable}${props.store.varCum}${props.store.domain && "_" + props.store.domain}.${props.store.ext}`;
    // console.debug("url", url);
    const data = await serverImg(url);
    return data;
  });
  return (
    <>
      <Resource
        value={imgLoc}
        // onPending={() => <p >Loading..</p>}
        // onRejected={() => <p>error ...</p>}
        onResolved={(res) =>
          res && (
            <>
              <Image
                // class={props.class || `object-top object-contain md:h-[calc(100vh-120px)] w-fit`}   //`w-full max-h-screen`
                onWheel$={(e) => mouseWheelStep(e, props)}
                class={
                  props.class ||
                  `max-h-screen w-full object-contain object-top md:h-[calc(100vh-120px)]`
                }
                src={`${res}`}
              ></Image>
            </>
          )
        }
      />
    </>
  );
});
