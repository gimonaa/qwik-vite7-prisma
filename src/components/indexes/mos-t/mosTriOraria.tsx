import { component$, Resource, useResource$, useSignal } from "@qwik.dev/core";
import moment from "moment";
import { Date } from "~/components/ui/date";
import { Loading } from "~/components/ui/loading";
import { serverPlainText } from "~/routes/(authenticated)/layout";

export const MosTriOraria = component$(() => {
  const ymdSig = useSignal(moment().utc().format("YYYYMMDD"));

  const mos = useResource$(async ({ track, cleanup }) => {
    track(() => ymdSig.value);
    const yyyy = ymdSig.value.substring(0, 4);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    const url = `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/indici/mos-t/${yyyy}/${ymdSig.value}/${ymdSig.value}_temperature_fvg.txt`;
    const datain = await serverPlainText(url);
    const data = datain
      ?.trim()
      .split("\n")
      .map((line) => {
        const [stationName, values] = line.split("=");
        const blocks = values.split("; ;").map((block) => block.trim());
        return {
          stations: stationName,
          block: blocks,
        };
      });
    const scadenze =
      data &&
      data[0].block.map((v) =>
        v.split(";").map((block) => block.split(":")[0]),
      );
    // console.debug("scadenze",scadenze, data)
    return { data: data, scad: scadenze };
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
                    <th class="border-l border-l-gray-700" colSpan={8}>
                      D0
                    </th>
                    <th class="border-l border-l-gray-700" colSpan={8}>
                      D+1
                    </th>
                    <th class="border-l border-l-gray-700" colSpan={8}>
                      D+2
                    </th>
                    <th class="border-l border-l-gray-700" colSpan={4}>
                      D+3
                    </th>
                    <th class="border-l border-l-gray-700" colSpan={4}>
                      D+4
                    </th>
                  </tr>
                  <tr class="bg-slate-200">
                    <th></th>
                    {res.scad?.map((sca) =>
                      sca.map((d, k) => (
                        <th
                          key={k}
                          class={`bg-slate-200 p-2 ${k === 0 && "border-l border-l-gray-700"}`}
                        >
                          {d}
                        </th>
                      )),
                    )}
                  </tr>
                </thead>
                <tbody class="text-right">
                  {// ciclo stazioni
                  res.data?.map((s, k) => (
                    <tr key={k} class="p-1 odd:bg-white even:bg-gray-100">
                      <td class="p-2 text-left">{s.stations}</td>
                      {
                        // ciclo blocchi
                        s.block.map((v: string) =>
                          v.split(";").map((d, k) => (
                            <td
                              key={k}
                              class={`p-2 ${k === 0 && "border-l border-l-gray-700"} `}
                            >
                              {d.split(":")[1]}
                            </td>
                          )),
                        )
                      }
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
