import { View, Text, Pressable, Image, StyleSheet, Button } from "react-native";
import COLORS from "../../utils/color";
import useNavigationStore from "../../stores/navigationStore";
function OtherPost({ data }) {
  const { image, name, price } = data;
  const navigation = useNavigationStore((state) => state.navigation);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate("DetailStack", {
          data,
        });
      }}
    >
      <View>
        <Image style={styles.image} source={{ uri: image }} alt="Image" />
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 130,
  },
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 7,
  },
  name: {
    color: COLORS.text_3,
    fontSize: 24,
    marginHorizontal: 10,
    marginVertical: 8,
    fontWeight: 900,
  },
  price: {
    fontSize: 24,
    marginHorizontal: 10,
    color: COLORS.text_1,
    marginTop: 30,
  },
});

export default OtherPost;
