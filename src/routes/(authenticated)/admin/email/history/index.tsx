import { component$, Resource, useResource$, useSignal } from "@qwik.dev/core";
import { Table } from "~/components/table/table";
import { Loading } from "~/components/ui/loading";
import { serverEmailList } from "~/routes/(authenticated)/admin/layout";

export default component$(() => {
  const sortSig = useSignal("datetime:desc");

  const emailSort = useResource$(async ({ track }) => {
    track(() => sortSig.value);
    const serverEmail = serverEmailList(sortSig.value);
    return serverEmail;
  });

  return (
    <section>
      <h3 class="e mb-4 text-3xl font-bold">Cronologia email</h3>
      <Resource
        value={emailSort}
        onPending={() => <Loading>Loading ...</Loading>}
        onRejected={() => <p>error ...</p>}
        onResolved={(res) => {
          return (
            <Table
              columns={[
                "datetime",
                "application",
                "recipient",
                "subject",
                "response",
                "user",
              ]}
              rows={res}
              sortSig={sortSig}
            ></Table>
          );
        }}
      />
    </section>
  );
});
