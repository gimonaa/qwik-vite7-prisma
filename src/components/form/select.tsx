import { component$ } from "@qwik.dev/core";

interface ItempProps {
  id: string;
  name: string;
  values: { desc: string }[];
  selected?: string;
  extraClass?: string;
}

export const Select = component$<ItempProps>((props) => {
  return (
    <>
      <select
        class={
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        }
        name={props.name}
        id={props.id}
      >
        {props.values.map((value, index) =>
          props.selected == value.desc ? (
            <option selected key={props.name + "-" + index} value={value.desc}>
              {value.desc}
            </option>
          ) : (
            <option key={props.name + "-" + index} value={value.desc}>
              {value.desc}
            </option>
          ),
        )}
      </select>
    </>
  );
});
