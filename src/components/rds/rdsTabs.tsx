import {
  component$,
  Resource,
  useResource$,
  type Signal,
  useSignal,
} from "@qwik.dev/core";
import { Tabs } from "@qwik-ui/headless";
import moment from "moment";
import { serverPlainText } from "~/routes/(authenticated)/layout";
import { Loading } from "../ui/loading";
import { RdsTable } from "~/components/rds/rdsTable";

export interface Props {
  ymd: Signal<string>;
}

export const RdsTabs = component$<Props>((props) => {
  const ymd = useSignal<string>("");
  const rdsUdi = useResource$(async ({ track }) => {
    track(() => props.ymd.value);
    //let ymd
    const list = await Promise.all(
      ["24", "06", "12", "18"].map(async (v) => {
        try {
          if (v === "24") {
            ymd.value = moment(props.ymd.value)
              .subtract(1, "days")
              .format("YYMMDD");
          } else {
            ymd.value = props.ymd.value.slice(2);
          }
          const yyyyDir = moment(props.ymd.value).format("YYYY");
          const ymdDir = moment(ymd.value, "YYMMDD").format("YYYYMMDD");
          const url = `${import.meta.env.PUBLIC_MDA}radiosondaggi/udine/${yyyyDir}/${ymdDir}/${ymd.value}${v}.UDI`;
          console.debug(url);
          const infoYmd = moment(`${ymd.value} ${v}`, "YYMMDD HH").format(
            "YYYY-MM-DD HH",
          );
          const result = await serverPlainText(url);
          return { info: infoYmd, data: result };
        } catch (err) {
          console.error(err);
        }
      }),
    );
    // console.log(list)
    return list;
  });

  return (
    <>
      <Resource
        value={rdsUdi}
        onPending={() => <Loading class="m-4">Loading ...</Loading>}
        onRejected={(err) => <p>{err.message}</p>}
        onResolved={(res) => {
          return (
            <Tabs.Root id="my-tabs" behavior="automatic">
              <Tabs.List class="g-tabs-list">
                {res.map((v, k) => (
                  <Tabs.Tab
                    class={`g-tabs-tab ${!v?.data && "opacity-20"}`}
                    selectedClassName="bg-blue-100"
                    selected={res.length - 1 === k && true}
                    disabled={!v?.data}
                    key={k}
                  >
                    {v?.info}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {res.map((v, k) => (
                <Tabs.Panel key={k} title={v?.info}>
                  <RdsTable raw={v?.data}></RdsTable>
                </Tabs.Panel>
              ))}
            </Tabs.Root>
          );
        }}
      />
    </>
  );
});
