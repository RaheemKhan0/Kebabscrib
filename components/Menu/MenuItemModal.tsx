import Image from "next/image";

interface PriceInfo {
  single: number;
  combo?: number;
}

export interface MenuItemModalData {
  item_name: string;
  item_description: string;
  item_price: PriceInfo;
  item_category: string;
  size?: string;
  item_img_url?: string;
}

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItemModalData;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen) return null;

  const optimisedUrl = item.item_img_url?.replace(
    "/upload",
    "/upload/w_800,q_auto,f_auto",
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-visible rounded-3xl border border-[#d9c7a8] bg-[#fff7e7] shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,93,51,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(244,207,75,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(0,98,68,0.08),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply [background-image:repeating-linear-gradient(45deg,rgba(125,93,51,0.08)_0,rgba(125,93,51,0.08)_1px,transparent_1px,transparent_6px)]" />
        <div className="polaroid-tape pointer-events-auto z-10">
          <button
            onClick={onClose}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#6b4f2a] transition-colors hover:text-[#3e2e19]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        
        <div className="relative grid gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
          
          <div className="flex flex-col gap-4">
            {optimisedUrl ? (
              <Image
                src={optimisedUrl}
                alt={item.item_name}
                width={700}
                height={450}
                className="h-64 w-full rounded-2xl border border-[#e6d6b8] object-cover shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-[#f3ead7] text-[#7a5a33]">
                <p>Image not available</p>
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b6b3c]">
                {item.item_category}
              </p>
              <h2 className="text-3xl font-bold text-[#2f2417] font-playfair">
                {item.item_name}
              </h2>
              {item.size && (
                <p className="text-sm text-[#6b4f2a]">Size: {item.size}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e6d6b8] bg-[#fffaf0] p-5 shadow-inner">
            <div>
              <h3 className="text-xl font-semibold text-[#4a351b] font-playfair">
                Description
              </h3>
              <p className="mt-2 text-[#5c472a] leading-relaxed">
                {item.item_description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#4a351b] font-playfair">
                Pricing
              </h3>
              <p className="mt-2 text-2xl font-bold text-[#0c6045]">
                AED {item.item_price.single.toFixed(2)}
              </p>
              {typeof item.item_price.combo === "number" && (
                <p className="text-sm text-[#6b4f2a]">
                  Combo AED {item.item_price.combo.toFixed(2)}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
