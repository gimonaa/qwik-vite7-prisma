import { component$, useResource$, Resource } from "@qwik.dev/core";
import { type ModelProbProps } from "./modelProbMenu";
import { serverImg } from "~/routes/(authenticated)/layout";
import { Image } from "../ui/image";

export const ModelProbImgMda = component$<ModelProbProps>((props) => {
  const imgLoc = useResource$(async ({ track }) => {
    track(() => props.store.model);
    track(() => props.store.datarun);
    track(() => props.store.level);
    track(() => props.store.run);
    track(() => props.store.variable);
    track(() => props.store.step);
    track(() => props.store.location);
    track(() => props.store.statistic);

    const yyyy = props.store.datarun.replace(/-/g, "").substring(0, 4);
    const ymd = props.store.datarun.replace(/-/g, "");

    const url = `${props.store.imgPathMDA}${props.store.model.toLocaleLowerCase()}/${yyyy}/${ymd}/${props.store.model}-spaghetti-${props.store.datarun.replace(/-/g, "")}${props.store.run}_${props.store.location}_${props.store.step}${props.store.level && "_" + props.store.level}_${props.store.variable}_${props.store.statistic}.${props.store.ext}`;
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
                // class={props.class || `object-top object-contain md:h-[calc(100vh-120px)] w-full max-h-screen`}
                src={`${res}`}
              ></Image>
            </>
          )
        }
      />
    </>
  );
});
