import { component$, useSignal, type Signal } from "@qwik.dev/core";
// import { Db } from "../svg/db";
import {
  serverGetPdfbyProduct,
  serverGetSentEmailbyProduct,
  serverGetSentFtpbyProduct,
  serverGetUserByID,
} from "~/routes/(authenticated)/(edit)/layout";
import { Pdf } from "../svg/pdf";
import { Save } from "../svg/save";
import { Email } from "../svg/email";
import moment from "moment";
import { Upload } from "../svg/upload";

export interface StatusProps {
  title?: string;
  product: Signal<string>;

  saved?: {
    date: string | null;
    uid: number | null;
  };

  pdf?: boolean;
  email?: boolean;
  upload?: boolean;
}

export const Status = component$<StatusProps>((props) => {
  const dataSave = useSignal({
    save: moment(props.saved?.date, "DD/MM/YY HH:mm:ss").unix(),
    pdf: moment().unix(),
    email: moment().unix(),
    upload: moment().unix(),
  });

  return (
    <div class="grid grid-cols-1 gap-4 text-center md:grid-cols-2">
      <div class="flex items-center text-xl font-bold">
        <span class="m-auto">{props.title}</span>
      </div>
      <div class="rounded-lg border border-gray-400 p-2">
        <div class="grid grid-cols-4 object-center">
          {
            /* SAVE */
            <div
              class={`flex flex-col items-center justify-center ${props.saved?.date ? "text-green-600" : "text-red-400"}`}
            >
              <Save />
              <span class="text-xs">{props.saved?.date ?? "n.d."}</span>
              <span class="text-xs">
                {props.saved?.uid
                  ? serverGetUserByID(props.saved.uid).then(
                      (user) => user?.name,
                    )
                  : "n.d."}
              </span>
            </div>
          }

          {
            /* PDF */
            props.pdf && (
              <>
                {serverGetPdfbyProduct(props.product.value).then((pdf) => {
                  const date = pdf?.datetime
                    ? moment(pdf.datetime).format("DD/MM/YY HH:mm:ss")
                    : "n.d.";
                  const user = pdf?.user || "n.d.";
                  dataSave.value.pdf = moment(
                    pdf?.datetime,
                    "DD/MM/YY HH:mm:ss",
                  ).unix();
                  // console.log(dataSave.value.pdf, dataSave.value.save)
                  return (
                    <>
                      <div
                        class={`flex flex-col items-center justify-center ${pdf?.datetime ? (dataSave.value.pdf < dataSave.value.save ? "text-orange-400" : "text-green-600") : "text-red-400"} `}
                      >
                        <Pdf />
                        <span class="text-xs">
                          {date} <br /> {user}
                        </span>
                      </div>
                    </>
                  );
                })}
              </>
            )
          }

          {
            /* EMAIL */
            props.email && (
              <>
                {serverGetSentEmailbyProduct(props.product.value).then(
                  (email) => {
                    const date = email?.datetime
                      ? moment(email.datetime, "DD/MM/YY HH:mm:ss").format(
                          "DD/MM/YY HH:mm:ss",
                        )
                      : "n.d.";
                    const user = email?.user || "n.d.";
                    dataSave.value.email = moment(email?.datetime).unix();
                    return (
                      <>
                        <div
                          class={`flex flex-col items-center justify-center ${email?.datetime ? "text-green-600" : "text-red-400"} ${dataSave.value.email < dataSave.value.pdf && "text-orange-400"} `}
                        >
                          <Email />
                          <span class="text-xs">
                            {date} <br /> {user}
                          </span>
                        </div>
                      </>
                    );
                  },
                )}
              </>
            )
          }

          {
            /* MDA */
            props.upload && (
              <>
                {serverGetSentFtpbyProduct(props.product.value).then((ftp) => {
                  const date = ftp?.datetime
                    ? moment(ftp.datetime).format("DD/MM/YY HH:mm:ss")
                    : "n.d.";
                  const user = ftp?.user || "n.d.";
                  dataSave.value.upload = moment(
                    ftp?.datetime,
                    "DD/MM/YY HH:mm:ss",
                  ).unix();
                  return (
                    <>
                      <div
                        class={`flex flex-col items-center justify-center ${ftp?.datetime ? "text-green-600" : "text-red-400"} ${dataSave.value.upload < dataSave.value.pdf && "text-orange-400"} `}
                      >
                        <Upload />
                        <span class="text-xs">
                          {date} <br /> {user}
                        </span>
                      </div>
                    </>
                  );
                })}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
});
