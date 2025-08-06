// import { $, component$ } from "@qwik.dev/core";
// import { routeLoader$ } from "@qwik.dev/router";
// import type {  InitialValues, SubmitHandler } from "@modular-forms/qwik";
// import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
// import * as v from 'valibot';

// type ExtraRDSForm = {
//   oggetto: string;
//   testo1: string;
// }

// const ExtraRDSSchema = v.object({
//   oggetto: v.string(),
//   testo1: v.string(),
// })

// type ExtraRDSForm = v.InferInput<typeof ExtraRDSSchema>

// // eslint-disable-next-line qwik/loader-location
// export const useExtraRDSFormLoad = routeLoader$<InitialValues<ExtraRDSForm>>(() => ({
//   oggetto: "oggetto",
//   testo1: "testo1",
// }))

// export const useExtraRDSAction = formAction$<ExtraRDSForm>((values) => {
//   // Runs on server
//   console.log("action:",values);
// }, valiForm$(ExtraRDSSchema));

// export const ExtrasondaggioForm = component$(() => {

//   const [rdsForm, { Form, Field }] = useForm<ExtraRDSForm>({
//     loader: useExtraRDSFormLoad(),
//     action: useExtraRDSAction(),
//     validate: valiForm$(ExtraRDSSchema),
//   });

//   const handleSubmit = $<SubmitHandler<ExtraRDSForm>>((values, event) => {
//     // Runs on client
//     console.log("submit:",values, event);
//   });

//   return (
//     <Form onSubmit$={handleSubmit}>
//       <Field name="oggetto">
//         {(field, props) => (
//           <div>
//             <input {...props} type="text" value={field.value}/>
//             {field.error && <div>{field.error}</div>}
//           </div>
//         )}
//       </Field>

//     </Form>
//   )
// });
