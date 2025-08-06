import { component$ } from "@qwik.dev/core";
import { 
  type DocumentHead, 
  // Form 
} from "@qwik.dev/router";
// import { Modal } from '@qwik-ui/headless';
// import { Modal } from "~/components/modal/modal";
// import { Modal } from "@qwik-ui/headless";
// import { useSession } from "~/routes/plugin@auth";
// import { useUpdatePasswordCurrentUserAction } from "../layout";
// import {
//   FlUserOutline as UserIcon,
//   FlEnvelopeOpenOutline as EmailIcon,
//   FlUsersGroupOutline as GroupIcon,
// } from "@qwikest/icons/flowbite";
// import { UserHistory } from "~/components/user/history";
// import { Bookmarks } from "~/components/user/bookmarks";
// import { Versions } from "~/components/info/versions";

export default component$(() => {
  // const userSignal = useSession();
  // console.log("session dashboard", userSignal.value)
  // const UpdatePasswordUserAction = useUpdatePasswordCurrentUserAction();

  return (
    <>
      <div>Home</div>
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: `Dashboard`,
  };
};
