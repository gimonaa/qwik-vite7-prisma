import { component$ } from "@qwik.dev/core";
import { SelectAction } from "./selectAction";
import {
  useGetCielo,
  useGetLocalita,
  useSaveGrafiche,
} from "~/routes/(authenticated)/(edit)/edit/previsioni/layout";

export interface GraficheProps {
  giorno: number;
  dataora: string;
}

export const Grafiche = component$<GraficheProps>((props) => {
  // const grafiche = useGetGrafiche()
  const cielo = useGetCielo();
  const localita = useGetLocalita();

  const salvaGraficheAction = useSaveGrafiche();

  console.log("carico grafiche per giorno: " + props.giorno);
  // console.log(grafiche.value)

  return (
    <div>
      <table class="table-auto">
        <thead>
          <tr>
            <th>località</th>
            <th>cielo</th>
          </tr>
        </thead>
        <tbody>
          {localita.value.map((loc, index) => (
            <tr key={`tgrafiche${index}`}>
              <td>{loc.desc}</td>
              <td>
                <SelectAction
                  name="localita"
                  nameId={loc.id}
                  dataora={props.dataora}
                  values={cielo.value}
                  action={salvaGraficheAction}
                ></SelectAction>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
