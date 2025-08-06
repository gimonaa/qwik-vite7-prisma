import { component$, Slot } from "@qwik.dev/core";

export interface ModalProps {
  title: string;
  targetid: string;
}

export const Modal = component$<ModalProps>((props) => {
  return (
    <div
      id={props.targetid}
      aria-hidden="true"
      class="fixed top-0 right-0 left-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0"
    >
      <div class="relative max-h-full w-full max-w-2xl p-4">
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div class="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {props.title}
              <Slot name="header"></Slot>
            </h3>
            <button
              type="button"
              data-modal-hide={props.targetid}
              class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Chiudi</span>
            </button>
          </div>

          <div class="space-y-4 p-4 text-base leading-relaxed text-gray-500 md:p-5 dark:text-gray-400">
            <Slot></Slot>
          </div>

          <div class="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
            <Slot name="footer"></Slot>
            <button
              data-modal-hide={props.targetid}
              type="button"
              class="me-2 mb-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Esci
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
