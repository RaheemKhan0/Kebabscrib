import { CartItem } from "@utils/context/ShoppingCartContext";
import { useOrder } from "@utils/context/OrderContext";
interface Props {
  _id: string | undefined;
  customerName: string;
  items: CartItem[];
}

const PendingItem = ({ customerName, items, _id }: Props) => {
  const { completeorder } = useOrder();

  return (
    <div className="bg-white font-parkinsans rounded-xl shadow-md p-6 w-full h-full flex flex-col justify-between">
      {/* Customer Name */}
      <h3 className="text-2xl font-bold text-KC_GREEN mb-4">{customerName}</h3>

      {/* Items */}
      <div className="flex flex-col justify-start">
        <ul className="space-y-4 mb-4">
          {items.map((item, idx) => (
            <li key={idx} className="border-b pb-3">
              <p className="text-md font-semibold text-KC_BROWN">
                {item.item_name}{" "}
                <span className="text-sm text-gray-500 mr-1">
                  {item.meal ? "(Meal)" : "(Single)"}
                </span>
                <span className="text-sm text-gray-500">
                  ({item.item_category})
                </span>
              </p>

              <div className="ml-4 mt-1 text-sm text-gray-700 space-y-1">
                {/* Sauces */}
                {item.extra_Sauces && (
                  <p>
                    <span className="font-medium">Sauces:</span>{" "}
                    {item.extra_Sauces
                      .map((sauce) => sauce.item_name)
                      .join(", ")}
                  </p>
                )}

                {/* Cheese */}
                {item.extra_Cheese && (
                  <p>
                    <span className="font-medium">Cheese:</span>{" "}
                    {item.extra_Cheese
                      .map((cheese) => cheese.item_name)
                      .join(", ")}
                  </p>
                )}

                {/* Vegetables */}
                {item.extra_Vegetables && (
                  <p>
                    <span className="font-medium">Vegetables:</span>{" "}
                    {item.extra_Vegetables
                      .map((veg) => veg.item_name)
                      .join(", ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        {/* Action Button */}
        <div>
          <button
            className="w-full py-2 px-4 bg-KC_GREEN text-white rounded-xl hover:bg-KC_PEACH transition-colors duration-300"
            onClick={() => {
              completeorder(_id);
            }}
          >
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingItem;
