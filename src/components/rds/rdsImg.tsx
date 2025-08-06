import {
  component$,
  Resource,
  type Signal,
  useResource$,
  useSignal,
} from "@qwik.dev/core";
import { serverListImg } from "~/routes/(authenticated)/layout";
import { Loading } from "../ui/loading";
// import { Carousel } from "../ui/carousel";
import moment from "moment";
import { ImageTabs } from "../ui/imageTabs";

export interface Props {
  ymd: Signal<string>;
  prodType: Signal<string>;
}

export const RdsImg = component$<Props>((props) => {
  const selectedTabSig = useSignal("none");

  const imgUdi = useResource$(async ({ track }) => {
    track(() => props.ymd.value);
    track(() => props.prodType.value);

    const numDays = 6; // Numero di giorni da considerare
    const urls = [];

    for (let i = 0; i < numDays; i++) {
      const ymd = moment(props.ymd.value)
        .subtract(i, "days")
        .format("YYYYMMDD");
      const yyyy = ymd.substring(0, 4);
      const url = `${import.meta.env.PUBLIC_MDA}prodotti/webmeteo/sondaggi/udine/${yyyy}/${ymd}/`;
      urls.push(url);
    }

    // Esegui tutte le richieste in parallelo
    const results = await Promise.all(
      urls.map((url) => serverListImg(url, 99)),
    );

    // Unisci tutti i risultati
    const imgList = results.flat();

    return imgList
      .filter((v) => v?.name?.includes(".png"))
      .filter((v) => v?.name?.includes(props.prodType.value));
  });

  return (
    <>
      <Resource
        value={imgUdi}
        onPending={() => <Loading class="m-4">Loading images ...</Loading>}
        onRejected={(err) => <p>{err.message}</p>}
        onResolved={(res) => {
          return res.length > 0 ? (
            <ImageTabs
              list={res.filter((item) => item !== null)}
              selectedTab={selectedTabSig}
            ></ImageTabs>
          ) : (
            <> prodotto non disponibile </>
          );
        }}
      />
    </>
  );
});
