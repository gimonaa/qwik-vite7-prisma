import { component$ } from "@qwik.dev/core";
import { Form } from "@qwik.dev/router";
import { Select } from "~/components/form/select";
import {
  useCreateUser,
  useGetRoles,
} from "~/routes/(authenticated)/admin/layout";

export default component$(() => {
  const createUserAction = useCreateUser();
  const getRoles = useGetRoles();

  const renderError = (errorMessage: string | undefined) => {
    if (!errorMessage) return null;
    return <p class="mt-2 text-sm text-red-600">{errorMessage}</p>;
  };

  return (
    <>
      <div class="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Creazione nuovo utente
        </h5>
        <Form action={createUserAction} class="mx-auto max-w-sm">
          <div class="p-5">
            <div class="mb-2">
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                nome
              </label>
              <input
                id="name"
                name="name"
                value={createUserAction.formData?.get("name")}
                autocomplete="off"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {renderError(createUserAction.value?.fieldErrors?.["name"])}

            {/* {createUserAction.value?.failed &&
              createUserAction.value.fieldErrors.name && (
                <p class="mt-2 text-sm text-red-600 ">
                  <span class="font-medium">
                    {" "}
                    {createUserAction.value.fieldErrors.name}
                  </span>
                </p>
              )} */}

            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900"
            >
              email
            </label>
            <div class="relative mb-2">
              {/* <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <svg
                  class="h-4 w-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div> */}
              <input
                id="email"
                type="email"
                name="email"
                value={createUserAction.formData?.get("email")}
                autocomplete="off"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {renderError(createUserAction.value?.fieldErrors?.["email"])}

            {/* {createUserAction.value?.failed &&
              createUserAction.value.fieldErrors.email && (
                <p class="mt-2 text-sm text-red-600 ">
                  <span class="font-medium">
                    {" "}
                    {createUserAction.value.fieldErrors.email}{" "}
                  </span>
                </p>
              )} */}

            <div class="mb-2">
              <label
                for="password"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={createUserAction.formData?.get("password")}
                autocomplete="on"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {renderError(createUserAction.value?.fieldErrors?.["password"])}

            {/* 
            {createUserAction.value?.failed &&
              createUserAction.value.fieldErrors.password && (
                <p class="mt-2 text-sm text-red-600 ">
                  <span class="font-medium">
                    {" "}
                    {createUserAction.value.fieldErrors.password}{" "}
                  </span>
                </p>
              )} */}

            <div class="mb-2">
              <label
                for="role"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                role
              </label>
              <Select
                id="role"
                name="role"
                selected="USER"
                values={getRoles.value}
              ></Select>
            </div>

            {renderError(createUserAction.value?.fieldErrors?.["role"])}

            {/* {createUserAction.value?.failed &&
              createUserAction.value.fieldErrors.role && (
                <p class="mt-2 text-sm text-red-600 ">
                  <span class="font-medium">
                    {createUserAction.value.fieldErrors.role}
                  </span>
                </p>
              )} */}

            <button
              class="me-2 mt-6 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              type="submit"
            >
              Crea
            </button>

            {createUserAction.value?.email && (
              <div
                class="mt-3 mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800"
                role="alert"
              >
                <span class="font-medium">
                  {" "}
                  Utente "{createUserAction.value.name}" creato con
                  successo.{" "}
                </span>
              </div>
            )}

            {renderError(createUserAction.value?.error)}

            {/* {createUserAction.value?.error && (
              <p class="mt-2 text-sm text-red-600 ">
                <span class="font-medium">
                  {" "}
                  {createUserAction.value.error}{" "}
                </span>
              </p>
            )} */}
          </div>
        </Form>
      </div>
    </>
  );
});
