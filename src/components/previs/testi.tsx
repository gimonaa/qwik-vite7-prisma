import { component$ } from "@qwik.dev/core";
import { useSession } from "~/routes/plugin@auth";
import {
  useGetLocalita,
  useGetTesti,
  useSaveText,
} from "~/routes/(authenticated)/(edit)/edit/previsioni/layout";

export interface GraficheProps {
  giorno: number;
  dataora: string;
}

export const Testi = component$<GraficheProps>((props) => {
  const localita = useGetLocalita();
  const salvaTestiAction = useSaveText();
  const caricaTesti = useGetTesti();
  const user = useSession();

  console.log("carico grafiche per giorno: " + props.giorno);

  return (
    <div>
      <table class="w-full table-auto">
        <tbody>
          {localita.value.map((loc, index) => (
            <tr key={`tgrafiche${index}`}>
              {/* <td class="text-sm w-14">{loc.desc}</td> */}
              <td>
                <div class="relative mt-2">
                  <textarea
                    id={loc.stringa}
                    name="testo"
                    class={`g-input p-2.5 text-sm ${caricaTesti.value?.find((l) => l.localitaId == loc.id) && "border-orange-300"}`}
                    // class={caricaTesti.value.find(l => l.localitaId == loc.id) && "border-orange-300"}
                    title={
                      caricaTesti.value?.find((l) => l.localitaId == loc.id)
                        ?.user.name || ""
                    }
                    onChange$={(e, v) =>
                      salvaTestiAction
                        .submit({
                          testo: v.value,
                          userId: user.value?.user.id,
                          localitaId: loc.id,
                          dataora: props.dataora,
                        })
                        .then(() => v.classList.add("border-green-300"))
                    }
                  >
                    {
                      caricaTesti.value?.find((l) => l.localitaId == loc.id)
                        ?.testo as any
                    }
                  </textarea>
                  <label
                    for={loc.stringa}
                    class="absolute top-0 left-0 z-10 -mt-2 ml-2 bg-white px-1 text-xs text-gray-500"
                  >
                    {loc.desc}
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
