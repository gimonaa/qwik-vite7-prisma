import { component$, Resource, useResource$, useSignal } from "@qwik.dev/core";
import moment from "moment";
import { Date } from "~/components/ui/date";
import { Loading } from "~/components/ui/loading";
import { serverPlainText } from "~/routes/(authenticated)/layout";

export const MosGiornalieraPiuDue = component$(() => {
  const ymdSig = useSignal(moment().utc().format("YYYYMMDD"));

  const mos = useResource$(async ({ track, cleanup }) => {
    track(() => ymdSig.value);
    const yyyy = ymdSig.value.substring(0, 4);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    const url = `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/indici/mos-t/${yyyy}/${ymdSig.value}/${ymdSig.value}_tminmax_fvg.txt`;
    const datain = await serverPlainText(url);
    const data = datain
      ?.trim()
      .split("\n")
      .map((line) => {
        const [stationName, values] = line.split("=");
        const blocks = values.split(";").map((block) => block.trim());
        return {
          stationName,
          blocks,
        };
      });
    return data;
  });

  return (
    <>
      <div class="md:flex md:flex-row">
        <div class="md:w-56 md:flex-none">
          <Date ymdSig={ymdSig} />
        </div>
        <div>
          <Resource
            value={mos}
            onPending={() => <Loading class="m-4">Loading ...</Loading>}
            onRejected={() => <p>error ...</p>}
            onResolved={(res) => (
              <table class="my-2 w-full rounded-xl border border-slate-400 text-center text-sm text-gray-700 md:w-auto">
                <thead>
                  <tr class="bg-slate-200">
                    <th>Stazione</th>
                    <th>D+1</th>
                    <th>D+2</th>
                    <th>D+3</th>
                    <th>D+4</th>
                  </tr>
                </thead>
                <tbody class="text-right">
                  {res?.map((v, k) => (
                    <tr key={k} class="p-1 odd:bg-white even:bg-gray-100">
                      <td class="p-2 text-left">
                        {v.stationName.replace("_TEMP_180", "")}
                      </td>
                      <td class="p-2">{v.blocks[0].split(":")[1]}</td>
                      <td class="p-2">{v.blocks[1].split(":")[1]}</td>
                      <td class="p-2">{v.blocks[2].split(":")[1]}</td>
                      <td class="p-2">{v.blocks[3].split(":")[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          />
        </div>
      </div>
    </>
  );
});
