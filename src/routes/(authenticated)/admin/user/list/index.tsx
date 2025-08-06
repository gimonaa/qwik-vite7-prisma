import { component$, useResource$, Resource, useSignal } from "@qwik.dev/core";
import { Table } from "~/components/table/table";
import { Loading } from "~/components/ui/loading";
import {
  useDelUser,
  serverGetUsers,
} from "~/routes/(authenticated)/admin/layout";

export default component$(() => {
  const action = useDelUser();
  const sortSig = useSignal("id:asc");
  const usersSort = useResource$(async ({ track }) => {
    track(() => sortSig.value);
    const serverUser = serverGetUsers(sortSig.value);
    return serverUser;
  });

  return (
    <section>
      <h3 class="mb-4 text-3xl font-bold">Lista utenti</h3>

      <Resource
        value={usersSort}
        onPending={() => <Loading>Loading ...</Loading>}
        onRejected={() => <p>error ...</p>}
        onResolved={(res) => {
          return (
            <Table
              columns={["id", "name", "email", "role", "lastlogin"]}
              rows={res}
              sortSig={sortSig}
              actionOpt
              editOpt="/admin/user/edit/"
              action={action}
            ></Table>
          );
        }}
      />
    </section>
  );
});
