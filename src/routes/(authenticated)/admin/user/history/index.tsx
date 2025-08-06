import { component$ } from "@qwik.dev/core";
import { Table } from "~/components/table/table";
import { useGetUsersHistory } from "~/routes/(authenticated)/admin/layout";

export default component$(() => {
  const action = useGetUsersHistory();

  return (
    <section>
      <h3 class="mb-4 text-3xl font-bold">Cronologia utenti</h3>
      <Table
        columns={["user", "route", "datetime"]}
        rows={action.value}
      ></Table>
    </section>
  );
});
