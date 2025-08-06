import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { FlHomeOutline } from "@qwikest/icons/flowbite";
import Logo from "~/media/arpa-logo.svg?url&jsx";

export default component$(() => {
  const appName = import.meta.env.PUBLIC_NAME;
  return (
    <div>
      <div class="m-10 flex justify-center">
        <Logo></Logo>
      </div>
      <div
        class="m-7 flex justify-center rounded-lg bg-red-50 p-10 text-center text-sm text-red-800"
        role="alert"
      >
        <h1 class="text-center text-2xl font-medium">
          {appName} <br />
          <br />
          errore 404: pagina non trovata
        </h1>
      </div>
      <div class="flex justify-center">
        <button class="align-middle">
          <Link href="/">
            <FlHomeOutline class="m-5 w-36 text-2xl"></FlHomeOutline>home page
          </Link>
        </button>
      </div>
    </div>
  );
});
