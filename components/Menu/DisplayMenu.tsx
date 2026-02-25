import Image from "next/image";


export const DisplayMenu = () => {
  return (
    <section className="mx-auto mt-10 max-w-screen-xl px-4 sm:px-6 lg:px-10">
      {/* <div className="rounded-[32px] border border-KC_GREEN/10 bg-white p-6 shadow-lg sm:p-8"> */}
        <div className="relative mx-auto flex min-h-[520px] w-full flex-col items-center justify-center gap-6 sm:min-h-[600px] lg:min-h-[680px]">
          <div className="relative flex w-full flex-col items-center justify-center">
            <div className="relative z-10 w-[96%] max-w-[980px] bg-transparent p-0 shadow-none ring-0 sm:w-[92%]">
              <div className="polaroid-frame">
                {/* <span className="polaroid-tape" aria-hidden /> */}
                <div className="tape"></div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[#f6efe2]">
                <Image
                  src="/menu_images/desSandwiches_menu.jpeg"
                  alt="Kebabs Crib sandwiches menu"
                  fill
                  className="object-contain"
                  priority
                />
                </div>
              </div>
            </div>

            <div className="relative -mt-10 w-[90%] max-w-[900px] -rotate-1 bg-transparent p-0 shadow-none ring-0 sm:-mt-14 sm:w-[86%]">
              <div className="polaroid-frame">
                {/* <span className="polaroid-tape" aria-hidden /> */}
                <div className="tape"></div>

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[#f6efe2]">
                <Image
                  src="/menu_images/desBag_sides_fries.jpeg"
                  alt="Kebabs Crib sides and fries"
                  fill
                  className="object-contain"
                />
                </div>
              </div>
            </div>

            <div className="relative -mt-8 w-[84%] max-w-[820px] rotate-[1deg] bg-transparent p-0 shadow-none ring-0 sm:-mt-12 sm:w-[80%]">
              <div className="polaroid-frame">
                {/* <span className="polaroid-tape" aria-hidden /> */}
                <div className="tape"></div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[#f6efe2]">
                <Image
                  src="/menu_images/taco_menu.jpeg"
                  alt="Kebabs Crib taco menu"
                  fill
                  className="object-contain"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
}
