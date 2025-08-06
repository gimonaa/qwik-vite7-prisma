import {
  component$,
  Resource,
  useResource$,
  type Signal,
} from "@qwik.dev/core";
import { Loading } from "~/components/ui/loading";
import { Image } from "~/components/ui/image";
import { serverImg } from "~/routes/(authenticated)/layout";

export interface BoraProps {
  ymdSig: Signal<string>;
}

export const Bora = component$<BoraProps>((props) => {
  const image = useResource$(async ({ track }) => {
    track(() => props.ymdSig.value);

    const yyyy = props.ymdSig.value.substring(0, 4);
    const url = `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/indici/bora/${yyyy}/${props.ymdSig.value}/BORA_${props.ymdSig.value}.png`;
    console.log(url);
    const result = await serverImg(url);
    return result;
  });

  return (
    <>
      <div class="">
        <Resource
          value={image}
          onPending={() => <Loading class="m-4">Loading ...</Loading>}
          onRejected={(err) => <p>{err.message}</p>}
          onResolved={(res) => {
            return res ? (
              <div>
                <Image src={`${res}`} class="" />
              </div>
            ) : (
              <> prodotto non disponibile </>
            );
          }}
        />
      </div>
      <div class="text-sm text-gray-800">
        note:
        <br />
        <br />
        La <span class="font-bold text-teal-400">linea blu</span> è la
        differenza di pressione a livello del mare tra Trieste e Celje-Medlog:
        se il valore è negativo è favorito il vento di Bora.
        <br />
        La <span class="font-bold text-black">linea nera</span> è l'intensità
        della raffica massima oraria a F.lli Bandiera.
        <br />
        La <span class="font-bold text-orange-500">linea arancio</span> è la
        direzione della raffica massima oraria a F.lli Bandiera.
        <br />
        La <span class="font-bold text-orange-400">banda arancione</span>{" "}
        rappresenta la "Bora zone" ovvero direzione del vento tra NE ed E
        (45°-90°): se la linea arancione sta dentro la banda arancione allora
        probabilmente è Bora.
        <br />
      </div>
    </>
  );
});
