import { View, Text, Image, StyleSheet } from "react-native";
import COLORS from "../../utils/color";

function MyPost({ data }) {
  const { image, name, price, createdAt } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {new Date(createdAt).toLocaleDateString("vi")}
      </Text>
      <Text style={[styles.text]}>Mặt hàng: {name}</Text>
      <Text style={styles.text}>
        Giá:
        {price.toLocaleString("vi", { style: "currency", currency: "VND" })}
      </Text>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: COLORS.text_2,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
  },
  text: {
    color: COLORS.text_4,
    marginVertical: 6,
    fontSize: 20,
    marginHorizontal: 18,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 10,
  },
  date: {
    color: COLORS.border,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
  },
});
export default MyPost;
