import { component$ } from "@qwik.dev/core";
import type { RequestHandler } from "@qwik.dev/router";
import { Login } from "~/components/login/login";
import { useSession } from "~/routes/plugin@auth";
// import type { Session } from "@auth/core/types";

export const onRequest: RequestHandler = async ({
  sharedMap,
  redirect,
  url,
}) => {
  const session = sharedMap.get("session");
  // console.log(url.pathname)
  if (session && new Date(session.expires) > new Date()) {
    // console.log(event.url)
    if (url.pathname !== "/dashboard") {
      throw redirect(301, "/dashboard");
    }
  }
};

export default component$(() => {
  const userSignal = useSession();

  return (
    <>
      {userSignal.value?.user.name ? (
        `Benvenuto ${userSignal.value.user.name} (${userSignal.value.user.role}) !!!`
      ) : (
        <Login></Login>
      )}
      {userSignal.value?.user.role === "ADMIN" && <div>sei ADMIN</div>}
    </>
  );
});
