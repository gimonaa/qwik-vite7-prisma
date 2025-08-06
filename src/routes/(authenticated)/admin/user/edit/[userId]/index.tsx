import { component$ } from "@qwik.dev/core";
import { Form } from "@qwik.dev/router";
import { Modal } from "@qwik-ui/headless";
import { Select } from "~/components/form/select";
// import { Modal } from "~/components/modal/modal";

import {
  useGetRoles,
  useGetUserByUId,
  useUpdatePasswordUserAction,
  useUpdateUser,
} from "~/routes/(authenticated)/admin/layout";

export default component$(() => {
  const getUser = useGetUserByUId();
  const updateUserAction = useUpdateUser();
  const getRoles = useGetRoles();
  const UpdatePasswordUserAction = useUpdatePasswordUserAction();

  // const isAdmin = useGetAdminUser({userSignal.value?.user?.email});
  return (
    <>
      <div class="mx-auto max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          modifica utente
        </h5>
        <div class="p-5">
          <Modal.Root>
            <Modal.Trigger
              class="mb-3 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              type="button"
            >
              modifica password
            </Modal.Trigger>
            <Modal.Panel class="modal-backdrop relative m-auto max-h-full w-full max-w-2xl rounded-lg p-4 shadow md:w-md">
              <div>
                <Form
                  action={UpdatePasswordUserAction}
                  class="mx-auto max-w-sm"
                >
                  <div>
                    <input
                      id="id"
                      name="id"
                      type="number"
                      class="form-control"
                      value={getUser.value?.id}
                      hidden
                    />
                    <input
                      id="name"
                      name="name"
                      class="form-control"
                      value={getUser.value?.name}
                      hidden
                    />
                    <input
                      id="email"
                      name="email"
                      class="form-control"
                      value={getUser.value?.email}
                      hidden
                    />

                    <div class="mb-2">
                      <label
                        for="password"
                        class="mb-2 block text-sm font-medium text-gray-900"
                      >
                        nuova password
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={UpdatePasswordUserAction.formData?.get(
                          "password",
                        )}
                        autocomplete="on"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    {UpdatePasswordUserAction.value?.fieldErrors && (
                      <p class="mt-2 text-sm text-red-600">
                        {UpdatePasswordUserAction.value.fieldErrors.password}
                        <span class="font-medium"></span>
                      </p>
                    )}

                    <div class="mb-2">
                      <label
                        for="password2"
                        class="mb-2 block text-sm font-medium text-gray-900"
                      >
                        ripeti password
                      </label>
                      <input
                        id="password2"
                        type="password"
                        name="password2"
                        value={UpdatePasswordUserAction.formData?.get(
                          "password2",
                        )}
                        autocomplete="on"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    {UpdatePasswordUserAction.value?.fieldErrors && (
                      <p class="mt-2 text-sm text-red-600">
                        {UpdatePasswordUserAction.value.fieldErrors.password2}
                        <span class="font-medium"></span>
                      </p>
                    )}
                    {UpdatePasswordUserAction.value?.error && (
                      <p class="mt-2 text-sm text-red-600">
                        <span class="font-medium">
                          {" "}
                          {UpdatePasswordUserAction.value.error}{" "}
                        </span>
                      </p>
                    )}
                    {UpdatePasswordUserAction.value?.success && (
                      <p class="mt-2 text-sm text-green-600">
                        <span class="font-medium">
                          {" "}
                          password modificata correttamente{" "}
                        </span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    class="me-2 mt-4 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
                  >
                    Salva
                  </button>

                  <Modal.Close class="me-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300">
                    chiudi
                  </Modal.Close>
                </Form>
              </div>
            </Modal.Panel>
          </Modal.Root>

          <Form
            id="updateUserAction"
            action={updateUserAction}
            class="mx-auto max-w-sm"
          >
            {/* <button class="mb-3 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
                  Modifica password
                </button> */}

            <input
              name="id"
              type="number"
              class="form-control"
              value={getUser.value?.id}
              hidden
            />
            {updateUserAction.value?.failed &&
              updateUserAction.value.fieldErrors.id && (
                <p class="mt-2 text-sm text-red-600">
                  <span class="font-medium">
                    {" "}
                    id: {updateUserAction.value.fieldErrors.id}{" "}
                  </span>
                </p>
              )}

            <div class="mb-2">
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                nome
              </label>
              <input
                id="name"
                value={getUser.value?.name}
                name="name"
                autocomplete="off"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {updateUserAction.value?.failed &&
              updateUserAction.value.fieldErrors.name && (
                <p class="mt-2 text-sm text-red-600">
                  <span class="font-medium">
                    {" "}
                    {updateUserAction.value.fieldErrors.name}{" "}
                  </span>
                </p>
              )}

            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900"
            >
              email
            </label>
            <div class="relative mb-2">
              {/* <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <svg
                  class="h-4 w-4 text-gray-500"
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
                name="email"
                value={getUser.value?.email}
                type="email"
                autocomplete="off"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {updateUserAction.value?.failed &&
              updateUserAction.value.fieldErrors.email && (
                <p class="mt-2 text-sm text-red-600">
                  <span class="font-medium">
                    {" "}
                    {updateUserAction.value.fieldErrors.email}{" "}
                  </span>
                </p>
              )}

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
                values={getRoles.value}
                selected={getUser.value?.role}
              ></Select>
            </div>

            {updateUserAction.value?.failed &&
              updateUserAction.value.fieldErrors.role && (
                <p class="mt-2 text-sm text-red-600">
                  <span class="font-medium">
                    {" "}
                    {updateUserAction.value.fieldErrors.role}{" "}
                  </span>
                </p>
              )}

            <button
              class="me-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300"
              type="submit"
            >
              Salva
            </button>

            {updateUserAction.value?.email && (
              <div
                class="mt-3 mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800"
                role="alert"
              >
                <span class="font-medium">
                  {" "}
                  Aggiornamento utente "{updateUserAction.value.name}"
                  effettuato con successo.{" "}
                </span>
              </div>
            )}
          </Form>
        </div>
      </div>

      {/* <Modal
          title="Cambio password"
          targetid="changepassModal"
        >
          <>
          <Form id="UpdatePasswordUserAction" action={UpdatePasswordUserAction} class="max-w-sm mx-auto">
            

            <div>
              <input id="id" name="id" type="number" class="form-control" value={getUser.value?.id} hidden />
              <input id="name" name="name" class="form-control" value={getUser.value?.name} hidden />
              <input id="email" name="email" class="form-control" value={getUser.value?.email} hidden />

              <div class="mb-2">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">nuova password</label>
                <input id="password" type="password" name="password" value={UpdatePasswordUserAction.formData?.get("password")} autocomplete="on" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
              </div>
               {UpdatePasswordUserAction.value?.fieldErrors && <p class="mt-2 text-sm text-red-600 ">{UpdatePasswordUserAction.value.fieldErrors.password}<span class="font-medium"></span></p>}


              <div class="mb-2">
                <label for="password2" class="block mb-2 text-sm font-medium text-gray-900 ">ripeti password</label>
                <input id="password2" type="password" name="password2" value={UpdatePasswordUserAction.formData?.get("password2")} autocomplete="on" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
              </div>
              {UpdatePasswordUserAction.value?.fieldErrors && <p class="mt-2 text-sm text-red-600 ">{UpdatePasswordUserAction.value.fieldErrors.password2}<span class="font-medium"></span></p>}
              {UpdatePasswordUserAction.value?.error && <p class="mt-2 text-sm text-red-600 "><span class="font-medium"> {UpdatePasswordUserAction.value.error} </span></p> }
              {UpdatePasswordUserAction.value?.success && <p class="mt-2 text-sm text-green-600 "><span class="font-medium"> password modificata correttamente </span></p> }

            </div>

            <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4">Salva</button>

          </Form>
          </>
        </Modal> */}
    </>
  );
});
