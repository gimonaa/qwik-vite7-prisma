import {
  component$,
  type Signal,
  $,
  useSignal,
  useVisibleTask$,
} from "@qwik.dev/core";
import { Image } from "~/components/ui/image";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsStop,
  BsPlay,
} from "@qwikest/icons/bootstrap";
import { Slider } from "~/components/ui/slider";
import { Collapsible } from "@qwik-ui/headless";

export interface CarouselProps {
  imgList: { name?: string | undefined; image?: string | undefined }[] | null;
  imgXList?: { name?: string | undefined; image?: string | undefined }[] | null;
  imgYList?: { name?: string | undefined; image?: string | undefined }[] | null;
  lastImgSig: Signal<number>;
  ymdSig: Signal<string>;
  limitControl?: boolean;
  delayMovieSig?: Signal<number>;
}

export const Carousel = component$<CarouselProps>(
  ({ imgList, lastImgSig, delayMovieSig, limitControl, ...props }) => {
    const isMovingSig = useSignal(false);
    const intervalId = useSignal<any>(null);
    const imgRef = useSignal<HTMLImageElement>();
    // const heightRef = useSignal<number>(0);
    const widthRef = useSignal<number>(0);
    const selectImgSig = useSignal(imgList?.length || 0);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      // typeSig &&track(typeSig);

      //wait before set the width
      setTimeout(() => {
        widthRef.value =
          imgRef.value?.width || (widthRef.value > 0 ? widthRef.value : 0);
      }, 100);

      // console.debug("size vis task:", imgRef.value?.width, widthRef.value);

      widthRef.value =
        (imgRef.value?.width &&
          (imgRef.value.width > 0 ? imgRef.value.width : 0)) ||
        (widthRef.value > 0 ? widthRef.value : 0);
      // console.debug("size vis task:", imgRef.value?.width, widthRef.value);

      const onResize = () => {
        widthRef.value =
          imgRef.value?.width || (widthRef.value > 0 ? widthRef.value : 0);
      };
      window.addEventListener("resize", onResize);

      // console.debug("size vis task fine", imgRef.value?.width, widthRef.value);
      return () => window.removeEventListener("resize", onResize);
    });

    const nextImg = $(async () => {
      if (selectImgSig.value >= (imgList?.length || 0)) {
        selectImgSig.value = 1;
      } else {
        selectImgSig.value++;
      }
    });

    const prevImg = $(async () => {
      if (selectImgSig.value == 1) {
        selectImgSig.value = imgList?.length || 0;
      } else {
        selectImgSig.value--;
      }
    });

    const lastImg = $(async () => {
      selectImgSig.value = imgList?.length || 0;
    });

    const firstImg = $(async () => {
      selectImgSig.value = 1;
    });

    const startMovie = $(async () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
      intervalId.value = setInterval(
        () => nextImg(),
        delayMovieSig?.value || 300,
      );
      isMovingSig.value = true;
    });

    const stopMovie = $(async () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
      isMovingSig.value = false;
    });

    const delayMovie = $(async (interval: number) => {
      if (isMovingSig.value) {
        stopMovie();
        if (delayMovieSig) delayMovieSig.value = interval;
        startMovie();
      } else {
        if (delayMovieSig) delayMovieSig.value = interval;
      }
    });

    return (
      <>
        {/* <div class="text-center text-3xl font-bold">{props.imgList && props.imgList[selectImgSig.value-1]?.name}</div> */}
        <div class="mt-2 md:flex md:flex-row">
          <div class="p-2 md:min-w-64">
            {/* <Collapsible.Root class="w-full" open={localStorage.getItem("lastHours") === "true" ? true : false}  onClick$={() => localStorage.setItem("lastHours","false")} > */}
            {limitControl === true ? (
              <>
                {imgList && imgList.length > 1 && (
                  <Collapsible.Root class="w-full" open>
                    <Collapsible.Trigger class="g-accordion w-full">
                      <span>controlli</span>
                    </Collapsible.Trigger>
                    <Collapsible.Content class="collapsible-content collapsible-content-outline">
                      <button
                        class={`g-button m-1 p-2 text-xl`}
                        title="prev"
                        onClick$={$(() => (stopMovie(), prevImg()))}
                      >
                        <BsChevronLeft />
                      </button>
                      <button
                        class={`g-button m-1 p-2 text-xl`}
                        title="next"
                        onClick$={$(() => (stopMovie(), nextImg()))}
                      >
                        <BsChevronRight />
                      </button>
                    </Collapsible.Content>
                  </Collapsible.Root>
                )}
              </>
            ) : (
              <>
                <Collapsible.Root class="w-full" open>
                  <Collapsible.Trigger class="g-accordion w-full">
                    <span>ultime ore</span>
                  </Collapsible.Trigger>
                  <Collapsible.Content class="collapsible-content collapsible-content-outline">
                    <input
                      name="lastImg"
                      class="g-input text-sm"
                      type="number"
                      value={lastImgSig.value}
                      onChange$={(ev, el) =>
                        (lastImgSig.value = selectImgSig.value =
                          Number(el.value))
                      }
                    ></input>
                    <Slider
                      name="lastImg"
                      class="w-full"
                      type="range"
                      min="0"
                      max="24"
                      value={lastImgSig.value}
                      onChange$={(ev, el) =>
                        (lastImgSig.value = selectImgSig.value =
                          Number(el.value))
                      }
                    ></Slider>
                  </Collapsible.Content>
                </Collapsible.Root>

                <Collapsible.Root class="w-full" open>
                  <Collapsible.Trigger class="g-accordion w-full">
                    <span>delay</span>
                  </Collapsible.Trigger>
                  <Collapsible.Content class="collapsible-content collapsible-content-outline">
                    <input
                      name="delay"
                      class="g-input text-sm"
                      type="number"
                      value={delayMovieSig?.value}
                      onChange$={(ev, el) => delayMovie(Number(el.value))}
                    ></input>
                    <Slider
                      name="delay"
                      class="w-full"
                      type="range"
                      min="100"
                      max="1000"
                      value={delayMovieSig?.value}
                      onChange$={(ev, el) => delayMovie(Number(el.value))}
                    ></Slider>
                  </Collapsible.Content>
                </Collapsible.Root>

                <Collapsible.Root class="w-full" open>
                  <Collapsible.Trigger class="g-accordion w-full">
                    <span>controlli</span>
                  </Collapsible.Trigger>
                  <Collapsible.Content class="collapsible-content collapsible-content-outline">
                    <button
                      class={`g-button m-1 p-2 text-xl ${isMovingSig.value && "bg-blue-200"} `}
                      title="play"
                      onClick$={() => startMovie()}
                    >
                      <BsPlay />
                    </button>
                    <button
                      class={`g-button m-1 p-2 text-xl ${!isMovingSig.value && "bg-blue-200"}`}
                      title="stop"
                      onClick$={() => stopMovie()}
                    >
                      <BsStop />
                    </button>
                    <button
                      class={`g-button m-1 p-2 text-xl`}
                      title="first"
                      onClick$={() => (stopMovie(), firstImg())}
                    >
                      <BsChevronDoubleLeft />
                    </button>
                    <button
                      class={`g-button m-1 p-2 text-xl`}
                      title="prev"
                      onClick$={() => (stopMovie(), prevImg())}
                    >
                      <BsChevronLeft />
                    </button>
                    <button
                      class={`g-button m-1 p-2 text-xl`}
                      title="next"
                      onClick$={() => (stopMovie(), nextImg())}
                    >
                      <BsChevronRight />
                    </button>
                    <button
                      class={`g-button m-1 p-2 text-xl`}
                      title="last"
                      onClick$={() => (stopMovie(), lastImg())}
                    >
                      <BsChevronDoubleRight />
                    </button>
                  </Collapsible.Content>
                </Collapsible.Root>
              </>
            )}
          </div>

          <div>
            {/* da sistemare se ci sono troppe immagini esce dalla vista */}
            <div class="flex">
              {imgList &&
                imgList.map((_, k) => (
                  <div
                    class={`item h-3 flex-1 border border-blue-700 ${k + 1 <= selectImgSig.value ? "bg-blue-300" : ""}`}
                    key={k}
                  ></div>
                ))}
            </div>
            <div class="max-h-screen md:h-[calc(100vh-120px)]">
              {imgList &&
                imgList.map((v, k) => (
                  <div
                    id={`carousel-${k + 1}`}
                    class={`carousel-items ${k + 1 == selectImgSig.value ? "" : "hidden"} max-h-screen md:h-[calc(100vh-120px)]`}
                    key={k + 1}
                  >
                    {props.imgXList?.length && (
                      <>
                        <div
                          id={`imgX-${k + 1}`}
                          class={`h-[80px] ${imgRef.value?.width && `w-[${imgRef.value.width - 100}px]`} mr-[80px]`}
                          style={
                            {
                              // width: `${widthRef.value - 80}px`,
                              // width: `${imgRef.value?.width && imgRef.value.width - 100}px`,
                            }
                          }
                        >
                          <Image
                            src={`${props.imgXList.length && props.imgXList.find((x) => x.name == v.name)?.image}`}
                            loading="eager"
                            style={{
                              width: `${widthRef.value}px`,
                            }}
                            class={`h-[80px] object-fill`}
                          />
                        </div>
                      </>
                    )}
                    <div class="flex">
                      {/* y : {widthRef.value} */}
                      <div
                        // ref={imgRef}
                        class={`flex-1`}
                      >
                        <Image
                          ref={imgRef}
                          src={`${v.image}`}
                          loading="eager"
                          // onResize$={() => {
                          //   console.log(imgRef.value);
                          //   if (imgRef.value) {
                          //     widthRef.value = imgRef.value.offsetWidth;
                          //   }
                          // }}
                          onWheel$={(e) => {
                            e.preventDefault();
                            if (e.deltaY < 0) {
                              prevImg();
                            } else {
                              nextImg();
                            }
                          }}
                        ></Image>
                      </div>
                      {props.imgYList && (
                        <div
                          id={`imgY-${k + 1}`}
                          class={`w-[80px]`}
                          style={{
                            // height: `${widthRef.value}px`,
                            width: `80px`,
                          }}
                        >
                          <Image
                            src={`${props.imgYList.length && props.imgYList.find((x) => x.name == v.name)?.image}`}
                            // loading="lazy"
                            style={{ height: `${widthRef.value}px` }}
                            class="max-h-screen w-[80px] md:max-h-[calc(100vh-120px)]"
                            // height={widthRef.value}
                            // width={200}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  },
);
