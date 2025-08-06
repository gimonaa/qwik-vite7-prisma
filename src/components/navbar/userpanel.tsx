import { component$ } from "@qwik.dev/core";
import { useSession } from "~/routes/plugin@auth";
import { Logout } from "../login/logout";
import { useGetLastVersion } from "~/routes/layout";
import { Separator } from "@qwik-ui/headless";

export default component$(() => {
  const usersession = useSession();
  const version = useGetLastVersion();
  return (
    <div class="">
      <Separator
        orientation="horizontal"
        decorative={true}
        class="mt-2 border border-gray-300"
      ></Separator>
      <div class="mt-4 mb-1">
        <span class="font-bold">{usersession.value?.user.name}</span> (
        {usersession.value?.user.role})
      </div>
      <div class="mb-1 text-sm text-gray-600 italic">
        {usersession.value?.user.email}
      </div>
      <Logout class="my-5 flex text-center"></Logout>
      <div class="mt-3 text-xs text-gray-600">
        v.{version.value?.version} del{" "}
        {version.value?.data.toLocaleDateString("it-IT")}
      </div>
    </div>
  );
});
