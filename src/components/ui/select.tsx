import { type PropsOf, type Signal, component$ } from "@qwik.dev/core";
import { Select } from "@qwik-ui/headless";
import { LuCheck } from "@qwikest/icons/lucide";
import { Down } from "../svg/down";

// type SelectProps = PropsOf<'select'>

type SelectProps = {
  valueSig: Signal;
  list: {
    key: string;
    value: string;
  }[];
} & PropsOf<"option">;

export const SelectUI = component$<SelectProps>((props) => {
  props.valueSig.value = props.valueSig.value
    ? props.valueSig.value
    : props.list[0]?.key;

  return (
    <>
      <Select.Root
        // onChange$={handleChange$}
        id={"select" + props.title}
        bind:value={props.valueSig}
        class={`select ${props.class}`}
      >
        <Select.Label class="p-0.5 text-center">{props.title}</Select.Label>
        <Select.Trigger class="select-trigger w-full rounded-lg border border-gray-300 p-2 hover:bg-blue-200">
          <Select.DisplayValue class="" placeholder="Select an option" />
          <Down class="float-right mx-2 h-4 w-4" />
        </Select.Trigger>
        <Select.Popover class="select-popover select-max-height rounded-lg border border-blue-500 p-4">
          {props.list.map((v, k) => (
            <Select.Item
              class="select-item border border-gray-300 p-1 px-3 text-xs hover:bg-blue-300"
              value={v.key}
              key={k}
            >
              <Select.ItemLabel class="w-full">{v.value}</Select.ItemLabel>
              <Select.ItemIndicator>
                <LuCheck class="float-right ml-2" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      {/* <p>The selected value is: {selected.value ?? 'null'}</p> */}
    </>
  );
});
