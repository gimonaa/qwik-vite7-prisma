import { component$, useStyles$ } from "@qwik.dev/core";
import styles from "./preview.css?inline";

// interface ItempProps {
//     name?: string;
//     extraClass?: string | null;
//     simboli: {
//         cielo: string,
//         zona:string
//       }[];
// }

interface ItempProps {
  name?: string;
  extraClass?: string | null;
  simboli: {
    cielo: { desc: string };
    localita: { stringa: string };
    user: { name: string };
  }[];
}

export const Preview = component$<ItempProps>((props) => {
  useStyles$(styles);

  return (
    <>
      {props.name && <h2 class="text-center text-sm">{props.name}</h2>}
      <div class="img-fluid bgr">
        {props.simboli.map((val, indice) => (
          <div
            key={"simbolo_" + indice}
            class={`cielo ${val.cielo.desc} ${val.localita.stringa}`}
          ></div>
        ))}
      </div>
    </>
  );
});
