import Image from "next/image";
import LazyVideo from "@components/Common/LazyVideo";

/*  Layout matches the reference template:
    4 columns, mixed row spans for a magazine-style collage.

    ┌──────┬──────┬──────────┬──────┐
    │      │      │          │      │
    │  01  │  02  │    03    │  04  │
    │      │      │          │      │
    │      │      ├──────────┤      │
    ├──────┤      │          │      │
    │      ├──────┤    06    ├──────┤
    │  05  │      │          │      │
    │      │  07  ├──────────┤  08  │
    ├──────┤      │    09    │      │
    └──────┴──────┴──────────┴──────┘
*/

/*  Reference layout — 4 columns, 2 items per column, staggered heights:
    ┌─────────┬─────────┬──────────────┬─────────┐
    │         │         │              │         │
    │  img 1  │  img 2  │              │         │
    │  (40%)  │  (50%)  │    img 3     │  img 4  │
    │         │         │    (55%)     │  (65%)  │
    ├─────────┤         │              │         │
    │         ├─────────┤              │         │
    │         │         ├──────────────┤         │
    │  img 5  │  img 6  │              ├─────────┤
    │  (60%)  │  (50%)  │    img 7     │  img 8  │
    │         │         │    (45%)     │  (35%)  │
    │         │         │              │         │
    └─────────┴─────────┴──────────────┴─────────┘
*/
const COLLAGE = [
  // Col 1 top — gravity right to show more of the right side
  { type: "image", src: "https://res.cloudinary.com/dpqto9jrm/image/upload/c_fill,g_east,w_900,h_900,q_auto,f_auto/v1776748920/IMG_5411_e3ryzv.jpg", alt: "Kebab platter", pos: "col-start-1 row-start-1 row-end-4" },
  // Col 2 top
  { type: "video", src: "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543813/gif_pw9li3.mp4",         alt: "KC in action",        pos: "col-start-2 row-start-1 row-end-5" },
  // Col 3-4 top — Cover Photo zoomed in tighter
  { type: "image", src: "https://res.cloudinary.com/dpqto9jrm/image/upload/q_auto,f_auto/v1776668487/Cover_Photo_g0cch4.jpg", alt: "KC Cover Photo", pos: "col-start-3 col-end-5 row-start-1 row-end-4" },
  // Col 1 bottom
  { type: "video", src: "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543820/Takeaway_uknx2k.mp4",   alt: "Takeaway",            pos: "col-start-1 row-start-4 row-end-8" },
  // Col 2 bottom
  { type: "image", src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1776667989/Screenshot_2026-04-16_085147_taygse.png", alt: "KC Food showcase", pos: "col-start-2 row-start-5 row-end-8" },
  // Col 3 mid-bottom
  { type: "image", src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543799/DSC09448_qpjd6k.jpg",   alt: "Restaurant interior",  pos: "col-start-3 row-start-4 row-end-8" },
  // Col 4 mid-bottom
  { type: "image", src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486280/07-1_roky4s.jpg",       alt: "French Taco",         pos: "col-start-4 row-start-4 row-end-6" },
  // Col 4 bottom
  { type: "image", src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543783/02_cmpkxs.jpg",         alt: "Sandwich art",        pos: "col-start-4 row-start-6 row-end-8" },
];

const CollageStrip = () => {
  return (
    <section className="w-full overflow-hidden">

      {/* CTA */}
      {/* <div className="text-center py-14 sm:py-20 px-6">
        <h2
          className="font-bold text-KC_GREEN font-wildysans leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          Save Your Spot
        </h2>
        <p className="text-sm sm:text-base text-KC_GREEN max-w-md mx-auto leading-relaxed mb-8">
          Book a table via WhatsApp and we&apos;ll have everything ready for you.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-KC_PEACH px-8 py-3.5 text-sm
            font-semibold uppercase tracking-wide text-KC_GREEN
            transition hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Book via WhatsApp
        </a>
      </div> */}

      {/* Photo Collage — Mobile: simple 2-col grid */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:hidden">
        {COLLAGE.map((item, i) => (
          <div key={i} className={`relative overflow-hidden aspect-square ${i === 0 ? "col-span-2 aspect-video" : ""}`}>
            {item.type === "video" ? (
              <LazyVideo
                src={item.src}
                width={800}
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            )}
          </div>
        ))}
      </div>

      {/* Photo Collage — Desktop: 4-col positioned grid */}
      <div className="hidden sm:grid sm:grid-cols-4 gap-3 px-3" style={{ gridTemplateRows: "repeat(7, 12vw)" }}>
        {COLLAGE.map((item, i) => (
          <div key={i} className={`relative overflow-hidden ${item.pos}`}>
            {item.type === "video" ? (
              <LazyVideo
                src={item.src}
                width={800}
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="25vw"
              />
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default CollageStrip;
