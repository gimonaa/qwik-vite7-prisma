import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";

const bookmarks = [
  { name: "www", url: "https://www.meteo.fvg.it" },
  { name: "www int", url: "https://www-int.meteo.fvg.it" },
  { name: "webcam", url: "https://www.meteo.fvg.it/webcam.php" },
  { name: "omnia", url: "https://omnia.meteo.fvg.it" },
];

export const Bookmarks = component$(() => {
  return (
    <>
      {bookmarks.map((bookmark, k) => {
        return (
          <Link
            prefetch={false}
            key={k}
            target="_blank"
            href={bookmark.url}
            class="mb-2 block text-sm font-medium text-gray-900"
          >
            <div class="items-center text-xs text-gray-600 md:flex">
              <div class="pr-4 pl-2 text-xl text-gray-900 md:min-w-32">
                {bookmark.name}
              </div>{" "}
              <div class="truncate pl-2">[{bookmark.url}]</div>
            </div>
          </Link>
        );
      })}
    </>
  );
});
