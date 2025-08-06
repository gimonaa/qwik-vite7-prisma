import { Slot, component$ } from "@qwik.dev/core";
import { useSession } from "~/routes/plugin@auth";

export const Admin = component$(() => {
  const user = useSession();
  // console.log(user.value?.user?.email)
  // console.log(user.value?.user?.role);
  return <>{user.value?.user.role === "ADMIN" && <Slot></Slot>}</>;
});

export const Previs = component$(() => {
  const user = useSession();
  // console.log(user.value?.user?.email)
  return (
    <>
      {user.value?.user.role === "PREVIS" ||
        (user.value?.user.role === "ADMIN" && <Slot></Slot>)}
    </>
  );
});
