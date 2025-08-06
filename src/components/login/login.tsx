import { component$, useSignal } from "@qwik.dev/core";
import { Form, useLocation } from "@qwik.dev/router";
import { useSignIn } from "~/routes/plugin@auth";
import Logo from "~/media/arpa-logo.svg?url&jsx";
import { useGetLastVersion } from "~/routes/layout";
import { Eye } from "../svg/eye";
import { EyeOff } from "../svg/eyeoff";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Verifica le credenziali, email o password non corretti.",
  CallbackRouteError: "Errore di connessione",
  Configuration: "Si prega di contattare l'amministratore",
  AccessDenied: "indirizzo e-mail non autorizzato",
  Credential: "Verifica le credenziali, email o password non corretti.",
  default: "Unable to sign in.",
};

export const Login = component$(() => {
  const url = useLocation();
  // console.debug("url", url.url);
  const signInSig = useSignIn();
  // console.debug("signInSig", signInSig.value);
  const version = useGetLastVersion();
  const showPasswordSig = useSignal(false);
  // console.debug("version", version.value);
  const appName = import.meta.env.PUBLIC_NAME;

  return (
    <>
      <section class="text-md bg-gray-50">
        <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <Logo class="mr-2 mb-3 w-28 lg:w-64"></Logo>
          <div class="w-full rounded-lg bg-white shadow-xl sm:max-w-md md:mt-0 xl:p-0">
            <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 class="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
                {appName}
              </h1>
              <Form class="space-y-4 md:space-y-6" action={signInSig}>
                <input type="hidden" name="providerId" value="credentials" />
                <input
                  type="hidden"
                  name="options.callbackUrl"
                  value={
                    url.prevUrl?.searchParams.get("callbackUrl") ===
                    "/dashboard/"
                      ? "/"
                      : url.prevUrl?.searchParams.get("callbackUrl")
                  }
                />
                <input
                  type="hidden"
                  name="options.redirectTo"
                  value={
                    url.prevUrl?.searchParams.get("callbackUrl") ===
                    "/dashboard/"
                      ? "/"
                      : url.prevUrl?.searchParams.get("callbackUrl")
                  }
                />
                <div>
                  <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-900"
                  >
                    email
                  </label>
                  <input
                    type="email"
                    name="options.email"
                    id="email"
                    autoComplete="on"
                    placeholder="nome.cognome@arpa.fvg.it"
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="mb-2 block text-sm font-medium text-gray-900"
                  >
                    password
                  </label>
                  <div class="relative">
                    <input
                      class="pr-10"
                      type={showPasswordSig.value ? "text" : "password"}
                      name="options.password"
                      id="password"
                      placeholder="••••••••"
                      autoComplete={"on"}
                    />
                    <span
                      class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick$={() =>
                        (showPasswordSig.value = !showPasswordSig.value)
                      }
                    >
                      {showPasswordSig.value ? (
                        <Eye class="inline w-6" />
                      ) : (
                        <EyeOff class="inline w-6" />
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  class="text- w-full cursor-pointer rounded-full border border-blue-700 bg-blue-100 px-5 py-2.5 text-center font-bold text-blue-900 shadow-xl hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                  Accedi
                </button>
              </Form>

              {url.url.searchParams.get("error") && (
                <div
                  class="mb-4 rounded-lg bg-red-50 p-4 text-center text-sm text-red-800"
                  role="alert"
                >
                  <span class="font-medium">
                    {errors[
                      url.url.searchParams.get("error") as keyof typeof errors
                    ] || "Impossibile accedere, contattare l'amministratore"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div class="my-2 mt-6 text-sm font-thin text-gray-500">
            v{version.value?.version || " -"} del{" "}
            {version.value?.data.toLocaleDateString("it-IT") || " -"}
          </div>
          <div class="text-sm font-thin text-gray-500">
            per info{" "}
            <a class="font-bold" href="mailto:meteo.support@arpa.fvg.it">
              meteo.support@arpa.fvg.it
            </a>
          </div>
        </div>
      </section>
    </>
  );
});
