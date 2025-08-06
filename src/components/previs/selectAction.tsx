import { component$ } from "@qwik.dev/core";
import { useSession } from "~/routes/plugin@auth";
import { useGetGrafiche } from "~/routes/(authenticated)/(edit)/edit/previsioni/layout";

interface ItempProps {
  name: string;
  nameId: number;
  values: { id: number; desc: string }[];
  dataora: string;
  action: any;
  selected?: string;
  extraClass?: string;
}

export const SelectAction = component$<ItempProps>((props) => {
  const grafiche = useGetGrafiche();
  const user = useSession();

  return (
    <>
      <select
        class={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${grafiche.value?.find((l) => l.localitaId == props.nameId) && "border-orange-300"} `}
        // title={`${grafiche.value?.find(l => l.localitaId == props.nameId)?.user.name}`}
        name={props.name}
        onChange$={(ev, el) => {
          props.action.submit({
            localitaId: props.nameId,
            cieloId: Number(el.value),
            userId: user.value?.user.id,
            dataora: props.dataora,
          });
        }}
      >
        {props.values.map((value, index) =>
          grafiche.value?.find(
            (c) => c.cieloId == value.id && c.localitaId == props.nameId,
          ) ? (
            <option selected key={props.name + "-" + index} value={value.id}>
              {value.desc}
            </option>
          ) : (
            <option key={props.name + "-" + index} value={value.id}>
              {value.desc}
            </option>
          ),
        )}
      </select>
    </>
  );
});
