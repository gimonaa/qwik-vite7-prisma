import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { serverUserHistory } from "~/routes/(authenticated)/layout";
import { useSession } from "~/routes/plugin@auth";
import { FlArrowUpRightFromSquareOutline as ExtLink } from "@qwikest/icons/flowbite";

export const UserHistory = component$(() => {
  const userSignal = useSession();
  const userHistory = serverUserHistory(userSignal.value?.user.id || 0);

  return (
    <>
      {userHistory.then((history) => {
        return (
          <ul>
            {history?.map((v, k) => {
              return (
                <li class="p-2" key={k}>
                  <p class="truncate">
                    <a
                      target="_blank"
                      href={v.route}
                      title="apri in una nuova finestra"
                    >
                      <ExtLink class="mr-5 inline" />
                    </a>
                    <Link prefetch={false} href={v.route}>
                      {v.route}
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>
        );
      })}
    </>
  );
});
