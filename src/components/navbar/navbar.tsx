import { component$, Slot, useSignal, $ } from "@qwik.dev/core";
import { Link, useLocation } from "@qwik.dev/router";
import Userpanel from "./userpanel";
import Logo from "~/media/arpa-logo.svg?url&jsx";
import { useGetMenu } from "~/routes/(authenticated)/layout";
// import { BsChevronLeft, BsChevronRight } from "@qwikest/icons/bootstrap";
import { FlArrowUpRightFromSquareOutline as ExtLink } from "@qwikest/icons/flowbite";
import { CloseSmall } from "../svg/CloseSmall";
import { Maggiore } from "../svg/maggiore";

export const Navbar = component$(() => {
  const getMenu = useGetMenu();
  const isOpenSig = useSignal(true);
  const mobisOpenSig = useSignal(false);
  const loc = useLocation();
  const prefetch = useSignal(false);
  // console.debug("loc", loc.url);
  const entryUrl = loc.url.pathname.split("/")[1];
  const appNaame = import.meta.env.PUBLIC_NAME;

  const dropdownStatesSig = useSignal<{ [key: string]: boolean }>({
    [entryUrl]: true,
  });
  const toggleDropdown = $((menuId: string) => {
    dropdownStatesSig.value = {
      // ...dropdownStatesSig.value,  // scommentando questo i vari menu rimangono aperti
      [menuId]: !dropdownStatesSig.value[menuId],
    };
  });

  return (
    <div>
      {/* sm control menu */}
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        // aria-controls="sidebar-multi-level-sidebar"
        onClick$={() => {
          mobisOpenSig.value = !mobisOpenSig.value;
        }}
        type="button"
        class={`ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 ${mobisOpenSig.value ? "sm:hidden" : "sm:hidden"} hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none`}
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* md control menu */}
      <button
        aria-label="toggle sidebar"
        title="menu"
        class={`fixed top-3 z-50 hidden cursor-pointer rounded-full border border-l-0 border-gray-300 bg-[#005da4] p-1 text-2xl text-white shadow-lg transition-all duration-200 ease-in-out sm:block ${isOpenSig.value ? "left-56" : "left-2 -translate-x-0"} `}
        onClick$={() => (isOpenSig.value = !isOpenSig.value)}
      >
        {isOpenSig.value ? <CloseSmall /> : <Maggiore />}
      </button>

      {mobisOpenSig.value && (
        <div
          class="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-md transition-opacity dark:bg-gray-900/80"
          onClick$={() => (mobisOpenSig.value = false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        class={`no-scroll fixed top-0 left-0 z-40 h-screen transform overflow-y-auto border-r border-gray-200 bg-gray-50 shadow-lg transition-transform duration-200 ${mobisOpenSig.value ? "translate-x-0" : "-translate-x-full"} ${isOpenSig.value ? "w-60" : "w-60 sm:hidden"} w-60 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div class="no-scrollbar h-lvh overflow-y-auto bg-gray-50 px-3 py-4">
          <Link
            href="/"
            class="mr-6 mb-5 flex items-center ps-2.5"
            onClick$={() => (mobisOpenSig.value = false)}
          >
            <Logo class="me-3 h-6 sm:h-7" />
            <span class="self-center text-xl font-semibold whitespace-nowrap">
              {appNaame}
            </span>
          </Link>

          {/* Menu */}
          {getMenu.value.map((menuitem, index) => (
            <ul class="space-y-1 font-medium" key={"menu" + index}>
              <li>
                {
                  menuitem.subMenu.length > 0 ? (
                    <>
                      <button
                        type="button"
                        class={`${menuitem.subMenu.length > 0 ? "text-gray-900" : "disabled text-gray-300"} group flex w-full cursor-pointer items-center rounded-lg p-2 text-base transition duration-75 hover:bg-gray-100`}
                        // aria-controls={`${menuitem.subMenu.length > 0 ? "dropdownmenu"+index : ""}`}
                        onClick$={() => toggleDropdown(menuitem.title)}
                        data-collapse-toggle={`${menuitem.subMenu.length > 0 ? "dropdownmenu" + index : ""}`}
                      >
                        <span class="ms-3 flex-1 text-left whitespace-nowrap rtl:text-right">
                          {menuitem.title}
                        </span>
                        <svg
                          class={`h-3 w-3 transform ${
                            dropdownStatesSig.value[menuitem.title]
                              ? "rotate-180"
                              : "rotate-0"
                          } transition-transform`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <ul
                        key={"submenu" + index}
                        id={"dropdownmenu" + index}
                        class={`space-y-1 py-2 ${dropdownStatesSig.value[menuitem.title] ? "" : "hidden"} `}
                      >
                        {/* Sub Menu  */}
                        {menuitem.subMenu.map((sub, index) => (
                          <li key={"submenu" + index}>
                            <div class="flex">
                              <Link
                                aria-hidden={false}
                                prefetch={prefetch.value}
                                aria-label={sub.title}
                                href={sub.url}
                                onClick$={() => (mobisOpenSig.value = false)}
                                class={`group w-full items-center rounded-lg p-2 pl-8 text-gray-900 transition duration-75 hover:bg-gray-100 ${loc.url.pathname + loc.url.search === sub.url && "bg-blue-100"} `}
                              >
                                {sub.title}
                              </Link>
                              <Link
                                target="_blank"
                                href={sub.url}
                                prefetch={prefetch.value}
                                class={`p-2`}
                              >
                                <ExtLink class="w-2" />
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <></>
                  )
                  // <>
                  //   <button type="button"
                  //     class={`${menuitem.subMenu.length > 0 ? "text-gray-900" : "text-gray-300 disabled"} flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 `}
                  //     >
                  //     <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{menuitem.title}</span>
                  //   </button>
                  // </>
                }
              </li>
            </ul>
          ))}
          <Userpanel />
        </div>
      </aside>

      <div
        onClick$={() => (mobisOpenSig.value = false)}
        class={` ${mobisOpenSig.value && ""} ${
          loc.url.pathname === "/stazioni/mappa/" ||
          loc.url.pathname === "/stazioni/leaflet-map/" ||
          loc.url.pathname === "/iframe/" ||
          loc.url.pathname.includes("/omnia/") ||
          loc.url.pathname.includes("/mapserver/")
            ? ""
            : "p-4 md:px-8"
        } ${isOpenSig.value && "sm:ml-60"} `}
      >
        <div class="w-full">
          <Slot></Slot>
        </div>
      </div>
    </div>
  );
});
