import { CartItem } from "@utils/context/ShoppingCartContext";
import { useOrder } from "@utils/context/OrderContext";
interface Props {
  _id: string | undefined;
  customerName: string;
  items: CartItem[];
  createdAt : any;
}

const PendingItem = ({ customerName, items, _id , createdAt}: Props) => {
  const { completeorder } = useOrder();
    const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Unknown date";

  return (
    <div className="bg-white font-parkinsans rounded-xl shadow-md p-6 w-full h-full flex flex-col justify-between">
      {/* Customer Name */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-KC_GREEN">{customerName}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>

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
                {item.tacoSauce && (
                  <p>
                    <span className="font-medium">Taco Sauce: </span>{" "}
                    {item.tacoSauce.item_name}
                  </p>
                )}
                {item.tacoMeats && item.tacoMeats.length > 0 && (
                  <p>
                    <span className="font-medium">Taco Meats: </span>{" "}
                    {item.tacoMeats
                      .map((sauce) => sauce.item_name)
                      .join(", ")}
                  </p>
                )}
                {item.extraMeat && (
                  <p>
                    <span className="font-medium">Extra Meat:</span>{" "}
                    {item.extraMeat.item_name}
                  </p>
                )}
                {/* Sauces */}
                {item.extra_Sauces && item.extra_Sauces.length > 0 && (
                  <p>
                    <span className="font-medium">Extra Sauces:</span>{" "}
                    {item.extra_Sauces
                      .map((sauce) => sauce.item_name)
                      .join(", ")}
                  </p>
                )}

                {/* Cheese */}
                {item.extra_Cheese && item.extra_Cheese.length > 0 && (
                  <p>
                    <span className="font-medium">Extra Cheese:</span>{" "}
                    {item.extra_Cheese
                      .map((cheese) => cheese.item_name)
                      .join(", ")}
                  </p>
                )}

                {/* Vegetables */}
                {item.extra_Vegetables && item.extra_Vegetables.length > 0 && (
                  <p>
                    <span className="font-medium">Extra Vegetables:</span>{" "}
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
