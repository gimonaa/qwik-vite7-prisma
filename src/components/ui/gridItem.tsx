import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";

interface GridItemProps {
  title: string;
  href: string;
  imgSrc?: string;
  imgCover?: boolean;
  thumbnailBg?: boolean;
}

export const GridItem = component$<GridItemProps>((props) => {
  return (
    <li class="flex hover:text-blue-500">
      <Link href={props.href} target="_blank">
        <div
          class={
            { thumbnail: props.thumbnailBg, cover: props.imgCover } + ` g-box`
          }
        >
          <img
            class="rounded-lg"
            src={props.imgSrc}
            alt={props.title}
            width="250"
            height="120"
            loading="lazy"
          />
        </div>
        <div class="text-md p-2 text-center font-bold">{props.title}</div>
      </Link>
    </li>
  );
});
