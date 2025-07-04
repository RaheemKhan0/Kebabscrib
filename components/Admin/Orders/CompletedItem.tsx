import { CartItem } from "@utils/context/ShoppingCartContext";

interface CompletedItemProps {
  customerName: string;
  items: CartItem[];
  total_price: Number;
  updatedAt: Date | undefined;
}

const CompletedItem: React.FC<CompletedItemProps> = ({
  customerName,
  items,
  total_price,
  updatedAt,
}) => {
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Unknown date";
  return (
    <div className="bg-white rounded-lg shadow p-5 space-y-4 border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-KC_GREEN">{customerName}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="text-sm border-b pb-2">
            <p className="font-medium">
              {item.item_name} ({item.item_category}) {item.meal ? "(Meal)" : "(Single)"}
            </p>

            {(item.extra_Sauces ?? []).length > 0 && (
              <p className="text-xs text-gray-600">
                Sauces:{" "}
                {(item.extra_Sauces ?? []).map((e) => e.item_name).join(", ")}
              </p>
            )}

            {(item.extra_Cheese ?? []).length > 0 && (
              <p className="text-xs text-gray-600">
                Cheese: {(item.extra_Cheese ?? []).join(", ")}
              </p>
            )}

            {(item.extra_Vegetables ?? []).length > 0 && (
              <p className="text-xs text-gray-600">
                Vegetables: {(item.extra_Vegetables ?? []).join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-right mt-4">
        <p className="text-lg font-semibold text-KC_BROWN">
          Total: AED {total_price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CompletedItem;
