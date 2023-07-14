import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../utils/color";
import useUserStore from "../../stores/userStore";

function Invoice(data) {
  const { totalPrice, product, quantity, createdAt, seller_id } = data.data;
  const id = useUserStore((state) => state.user.id);

  const isSeller = seller_id === id;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.heading,
          {
            backgroundColor: isSeller ? COLORS.sell : COLORS.buy,
          },
        ]}
      >
        {isSeller ? "Đơn bán" : "Đơn mua"}
      </Text>
      <Text style={styles.text}>
        Thời gian: {new Date(createdAt).toLocaleString("vi")}
      </Text>
      <Text style={styles.text}>Sản phẩm: {product}</Text>
      <Text style={styles.text}>Số lượng: {quantity}</Text>
      <Text style={styles.text}>
        Tổng giá trị:{" "}
        {totalPrice.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 5,
  },
  text: {
    fontSize: 20,
  },
  heading: {
    fontSize: 27,
    textAlign: "center",
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    fontWeight: 700,
    borderRadius: 10,
  },
});

export default Invoice;
