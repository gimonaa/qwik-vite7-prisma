import { component$, type PropsOf } from "@qwik.dev/core";
import { Form, useLocation } from "@qwik.dev/router";
import { useSignOut } from "~/routes/plugin@auth";
import { FlArrowLeftToBracketOutline as ExitIcon } from "@qwikest/icons/flowbite";

type FormProps = PropsOf<"form">;

export const Logout = component$<FormProps>(({ ...props }) => {
  const signOut = useSignOut();
  const url = useLocation();

  return (
    <Form {...props} action={signOut}>
      <input
        type="hidden"
        name="callbackUrl"
        value={url.prevUrl?.searchParams.get("callbackUrl")}
      />
      <button type="submit" class="cursor-pointer">
        <ExitIcon class="inline" />
        <span class="ml-2 py-4">Logout</span>
      </button>
    </Form>
  );
});
