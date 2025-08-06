import { component$, type Signal } from "@qwik.dev/core";

export interface Props {
  status?: Signal<
    { status: boolean; message: string; error?: boolean } | any | undefined
  >;
}

export const StatusMessage = component$<Props>(({ status }) => {
  return (
    <>
      {status?.value?.status
        ? status.value.message.length > 0 && (
            <div class="g-success"> {status.value.message.toString()} </div>
          )
        : (status?.value?.status === false || status?.value?.error) && (
            <div class="g-error"> {status.value.message.toString()} </div>
          )}
    </>
  );
});
