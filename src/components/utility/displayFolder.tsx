import {
  $,
  component$,
  type Signal,
  useSignal,
  useTask$,
} from "@qwik.dev/core";
import { Download } from "~/components/svg/Download";
import { Image } from "~/components/ui/image";
import {
  serverFile,
  serverListDir,
} from "~/routes/(authenticated)/browse/layout";
import { imageFiles, jsonFiles, textFiles } from "~/util/typeFiles";
import { Right } from "../svg/right";
import { Home } from "../svg/home";
import { Folder } from "../svg/folder";
import { File } from "../svg/file";

export interface IndexProps {
  path: Signal<string>;
  minDepth?: number;
}

export const DisplayFolder = component$<IndexProps>((props) => {
  const listSig = useSignal<
    { name: string; isDirectory: boolean; size: number }[] | null
  >();
  const pathSig = useSignal(props.path.value);
  const homePath = useSignal(props.path.value);
  const minDepth = props.minDepth ?? 2;
  const dataSig = useSignal<any>(null);
  const nomeSig = useSignal<any>(null);
  const typeSig = useSignal<any>(null);

  useTask$(async () => {
    const list = await serverListDir(pathSig.value);
    listSig.value = list;
    // console.debug("list", pathSig.value, listSig.value);
  });

  return (
    <div>
      {/* <button
        class="g-button m-2 p-2 text-sm"
        onClick$={$(async () => {
          pathSig.value = props.path.value;
          const list = await serverListDir(pathSig.value);
          listSig.value = list;
        })}
      > */}
      {/* HOME {props.path.value} */}
      {/* </button> */}
      {/* <button
        class="g-button m-2 p-2 text-sm"
        onClick$={$(async () => {
          const parts = pathSig.value.split("/").filter(Boolean);
          parts.length > minDepth && parts.pop();
          pathSig.value = "/" + parts.join("/") + "/";
          const list = await serverListDir(pathSig.value);
          listSig.value = list;
        })}
      >
        indietro
      </button> */}
      {/* <div class="left m-2 bg-blue-100 p-2 text-sm">
        {pathSig.value.replace(/\//g, " ▷ ")}
      </div> */}
      <div class="left text-md m-2 bg-blue-100 p-2">
        {pathSig.value.split("/").map((v, k) => {
          if (k === 0)
            return (
              <button
                class="cursor-pointer"
                onClick$={$(async () => {
                  pathSig.value = homePath.value;
                  dataSig.value = null;
                  const list = await serverListDir(pathSig.value);
                  listSig.value = list;
                })}
                key={k}
              >
                <Home class="inline w-6" />
                <Right class="mx-1 inline w-5 text-gray-400" />
              </button>
            );
          if (v === "") return null;
          return (
            <button
              class={` ${k < minDepth ? "text-gray-500" : "cursor-pointer"} ${k === pathSig.value.split("/").length - 2 ? "font-bold" : ""} `}
              onClick$={$(async () => {
                if (k < minDepth) return;
                pathSig.value =
                  pathSig.value
                    .split("/")
                    .slice(0, k + 1)
                    .join("/") + "/";
                dataSig.value = null;
                const list = await serverListDir(pathSig.value);
                listSig.value = list;
              })}
              key={k}
            >
              <span>{v}</span>
              <Right class="mx-1 inline w-5 text-gray-400" />
            </button>
          );
        })}
      </div>
      <div class="m-2 mb-6 max-h-96 overflow-auto border border-blue-100 p-2">
        {/* {!listSig.value && <div>premi home per iniziare</div>} */}
        {listSig.value?.length === 0 && <div>cartella vuota</div>}
        {listSig.value?.map((v, k) => (
          <button
            class="cursor-pointer p-2 hover:bg-blue-100"
            key={k}
            onClick$={$(async () => {
              if (v.isDirectory) {
                pathSig.value = pathSig.value + v.name + "/";
                pathSig.value = pathSig.value.replace("../", "");
                console.debug("path", pathSig.value);
                dataSig.value = null;
                const list = await serverListDir(pathSig.value);
                listSig.value = list;
              } else {
                const file = await serverFile(pathSig.value + v.name);
                dataSig.value = file;
                nomeSig.value = v.name;
                typeSig.value = v.name.split(".")[1].toLowerCase();
              }
            })}
          >
            {v.isDirectory ? (
              <Folder class="inline w-5" />
            ) : (
              <File class="inline w-5" />
            )}
            <span class="align-middle"> {v.name.toString()} </span>
            {!v.isDirectory && (
              <span class="text-xs">({(v.size / 1024).toFixed(0)} Kb)</span>
            )}
          </button>
        ))}
      </div>
      <div>
        {dataSig.value &&
          (typeSig.value === "html" || typeSig.value === "svg" ? (
            <div dangerouslySetInnerHTML={dataSig.value}></div>
          ) : textFiles.includes(typeSig.value) ? (
            <div class="h-lvh w-full">{dataSig.value}</div>
          ) : jsonFiles.includes(typeSig.value) ? (
            <div class="h-lvh w-full">{JSON.stringify(dataSig.value)}</div>
          ) : imageFiles.includes(typeSig.value) ? (
            <Image src={`${dataSig.value}`}></Image>
          ) : typeSig.value === "pdf" ? (
            <embed class="h-lvh w-full" src={`${dataSig.value}`}></embed>
          ) : (
            <a
              download={`${nomeSig.value}`}
              href={`${dataSig.value}`}
              class="m-3 mt-6 bg-blue-100 p-3 hover:bg-blue-200"
            >
              <Download class="inline"></Download>
              <span>scarica il file {nomeSig.value}</span>
            </a>
          ))}
      </div>
    </div>
  );
});
