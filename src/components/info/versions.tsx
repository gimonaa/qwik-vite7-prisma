import { component$ } from "@qwik.dev/core";
import { useGetVersionHistory } from "~/routes/(authenticated)/layout";

export const Versions = component$(() => {
  const versionHistory = useGetVersionHistory();

  return (
    <>
      {versionHistory.value?.map((v, k) => {
        return (
          <div class="p-2" key={k}>
            <div class="text-xs text-gray-600 italic">
              v.{v.version} - {v.data.toLocaleDateString("it-IT")}
            </div>
            <div>{v.descrizione}</div>
          </div>
        );
      })}
    </>
  );
});
