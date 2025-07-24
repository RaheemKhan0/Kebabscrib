import {
  Html,
  Text,
  Img,
  Container,
  Hr,
  Section,
} from "@react-email/components";
import { OrderType } from "types/order";

const LOGO_URL = "https://res.cloudinary.com/dpqto9jrm/image/upload/q_auto,f_auto/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png";

export const OrderReceipt = ({ order }: { order: OrderType }) => {
  console.log("order : ", order);
  return (
    <Html>
      <Container style={{ padding: "20px", fontFamily: "sans-serif" }}>
        {/* Logo */}
        <Img
          src={LOGO_URL}
          alt="Kebabs Crib"
          width="150"
          style={{ marginBottom: "20px" }}
        />

        <Text style={{ fontSize: "18px" }}>Hi {order.customer_name},</Text>
        <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
          Thank you so much for your order! Here is your receipt:
        </Text>

        <Hr />

        {/* Order Items */}
        <Section>
          {order.items.map((item, index) => (
            <Container key={index} style={{ marginBottom: "20px" }}>
              {/* Product Image */}
              {item.item_img_url && (
                <Img
                  src={item.item_img_url.replace(
                    "/upload",
                    "/upload/q_auto,f_auto",
                  )}
                  alt={item.item_name}
                  width="100"
                  style={{ borderRadius: "8px", marginBottom: "10px" }}
                />
              )}

              <Text style={{ fontWeight: "bold", fontSize: "16px" }}>
                {item.item_name} - AED {item.item_price.single} x{" "}
                {item.Quantity}
              </Text>

              {item.mealdrink && item.mealdrink.item_name && (
                <Text style={{ marginTop: "4px" }}>
                  Meal Drink: {item.mealdrink.item_name}
                </Text>
              )}
              {item.tacoMeats && item.tacoMeats?.length > 0 && (
                <Text>Meats: {item.tacoMeats.filter(meat => meat.item_name).join(", ")}</Text>
              )}
              {item.extra_Sauces && item.extra_Sauces?.length > 0 && (
                <Text>Extra Sauces: {item.extra_Sauces.filter((sauce) => sauce.item_name).join(", ")}</Text>
              )}
              {item.extra_Cheese && item.extra_Cheese?.length > 0 && (
                <Text>Extra Cheese: {item.extra_Cheese.filter(cheese => cheese.item_name).join(", ")}</Text>
              )}
              {item.extra_Vegetables && item.extra_Vegetables?.length > 0 && (
                <Text>
                  Extra Vegetables: {item.extra_Vegetables.filter(veggies => veggies.item_name).join(", ")}
                </Text>
              )}
              <Hr />
            </Container>
          ))}
        </Section>

        {/* Total */}
        <Text
          style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}
        >
          Total: AED {order.total_price}
        </Text>
      </Container>
    </Html>
  );
};
