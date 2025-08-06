import { component$, useSignal, type Signal } from "@qwik.dev/core";
import { Tabs } from "@qwik-ui/headless";
import { Image } from "./image";
import {
  mouseWheelStepSig,
  StrImg2Date,
} from "~/routes/(authenticated)/layout";

export interface Props {
  list: {
    name?: string | undefined;
    image?: string | undefined;
    text?: string | undefined | null;
  }[];
  selectedTab: Signal<string>;
  order?: "asc" | "desc";
}

export const ImageTabs = component$<Props>((props) => {
  const listSorted =
    props.order == "asc"
      ? props.list.sort((a, b) => (a.name! > b.name! ? 1 : -1))
      : props.list.sort((a, b) => (a.name! < b.name! ? 1 : -1));
  const selectedIndexSig = useSignal<number>();
  const minSig = useSignal(0);
  const maxSig = useSignal(listSorted.length - 1);
  const stepSig = useSignal(1);

  return (
    <>
      <Tabs.Root
        vertical
        behavior="automatic"
        class="flex flex-wrap gap-2"
        bind:selectedIndex={selectedIndexSig}
      >
        <Tabs.List class="mt-4 flex w-fit flex-col border-r-2">
          {listSorted.map(
            (val, index) =>
              val.name && (
                <Tabs.Tab
                  key={index}
                  value={val.name}
                  selectedClassName="bg-blue-100"
                  class={`g-tabs-vtab text-xs`}
                  selected={
                    props.selectedTab.value == StrImg2Date(val.name).finalDate
                      ? true
                      : false
                  }
                  onClick$={() =>
                    (props.selectedTab.value = StrImg2Date(val.name!).finalDate)
                  }
                >
                  {StrImg2Date(val.name).finalDate}
                </Tabs.Tab>
              ),
          )}
        </Tabs.List>
        {listSorted.map(
          (val, index) =>
            val.name && (
              <Tabs.Panel
                key={index}
                onWheel$={(e) => {
                  mouseWheelStepSig(
                    e,
                    selectedIndexSig,
                    minSig,
                    maxSig,
                    stepSig,
                  );
                }}
              >
                <Image src={val.image} />
              </Tabs.Panel>
            ),
        )}
      </Tabs.Root>
    </>
  );
});
