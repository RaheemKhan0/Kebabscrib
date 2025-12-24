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
  orderLink: string;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  isOpen,
  onClose,
  item,
  orderLink,
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
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-3xl font-bold text-gray-500 transition-colors hover:text-red-500"
          aria-label="Close"
        >
          ×
        </button>

        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-4">
            {optimisedUrl ? (
              <Image
                src={optimisedUrl}
                alt={item.item_name}
                width={700}
                height={450}
                className="h-64 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-100">
                <p className="text-gray-500">Image not available</p>
              </div>
            )}

            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">
                {item.item_category}
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {item.item_name}
              </h2>
              {item.size && (
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Description
              </h3>
              <p className="mt-2 text-gray-700">{item.item_description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">Pricing</h3>
              <p className="mt-2 text-2xl font-bold text-KebabGreen">
                AED {item.item_price.single.toFixed(2)}
              </p>
              {typeof item.item_price.combo === "number" && (
                <p className="text-sm text-gray-600">
                  Combo AED {item.item_price.combo.toFixed(2)}
                </p>
              )}
            </div>

            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#ff5a00] text-lg font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#ff7a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff5a00]"
              aria-label="Order this item on Talabat"
              onClick={(e) => e.stopPropagation()}
            >
              Order on Talabat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
