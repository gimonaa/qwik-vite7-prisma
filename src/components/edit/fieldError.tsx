import { component$ } from "@qwik.dev/core";

export interface ErrProps {
  error: string | undefined;
}

export const FieldError = component$<ErrProps>((props) => {
  return <>{props.error && <div class="g-error">{props.error}</div>}</>;
});
