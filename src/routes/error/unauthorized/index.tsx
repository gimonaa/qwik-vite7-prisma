import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { Home } from "~/components/svg/home";
import Logo from "~/media/arpa-logo.svg?url&jsx";

export default component$(() => {
  return (
    <>
      <div class="m-10 flex justify-center">
        <Logo></Logo>
      </div>
      <div
        class="m-4 rounded-lg bg-red-50 p-10 text-center text-xl text-red-800"
        role="alert"
      >
        <h1 class="font-medium">accesso negato</h1>
        <Link href="../../dashboard/">
          <span class="">
            home page
            <Home class="mx-auto"></Home>
          </span>
        </Link>
      </div>
    </>
  );
});
