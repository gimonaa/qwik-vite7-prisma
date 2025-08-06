import { component$ } from "@qwik.dev/core";
// import moment from "moment";
import PCR from "~/../public/logo_pciv2.png?jsx";
import ARPA from "~/../public/arpa-logo.svg?jsx";
import RAFVG from "~/../public/regionefvg.svg?jsx";

type Props = {
  title?: string;
};

export const HeaderCFD = component$<Props>((props) => {
  return (
    <div class="min-h-[60px] border-b-2 border-blue-800">
      <div class="flex">
        <div>
          <RAFVG width={90} height={20} class="h-14 w-40"></RAFVG>
        </div>
        <div class="m-auto p-2 text-center text-2xl font-bold">
          <div>Centro Funzionale Decentrato</div>
          <div class="text-xl font-normal">Settore Meteo</div>
          <div>{props.title}</div>
        </div>
        <div class="flex">
          {" "}
          <PCR class="h-14 w-14"></PCR>
          <ARPA class="h-14 w-40 pl-2"></ARPA>
        </div>
      </div>
      {/* <div class="text-center italic p-2">emesso il {moment().format("DD-MM-YYYY")} alle {moment().format("HH:mm")}</div> */}
    </div>
  );
});
