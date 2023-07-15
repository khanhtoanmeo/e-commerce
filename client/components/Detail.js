import { Text, View, Image, StyleSheet, Alert, Button } from "react-native";
import COLORS from "../utils/color";
import CustomButton from "./UI/CustomButton";
import { useEffect, useState } from "react";
import FetchData from "../utils/fetchData";
import useUserStore from "../stores/userStore";
import useNavigationStore from "../stores/navigationStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
function Detail({ route }) {
  const myId = useUserStore((state) => state.user.id);
  const bankAccount = useUserStore((state) => state.user.bankAccount);
  const navigation = useNavigationStore((state) => state.navigation);
  const { image, name, price, createdAt, description, type, user_id } =
    route.params.data;

  const [username, setUsername] = useState("");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    FetchData.getUserById(user_id).then(({ user }) => {
      setUsername(user.username);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={[styles.text]}>Người bán: {username}</Text>
      <Text style={[styles.text]}>Sản phẩm:{name}</Text>

      <Text style={[styles.text]}>
        Ngày đăng: {new Date(createdAt).toLocaleDateString("vi")}
      </Text>
      <Text style={[styles.text]}>Phân loại: {type}</Text>
      <Text style={[styles.text]}>Mô tả: {description}</Text>
      <Text style={[styles.text]}>
        Giá:
        {(price * quantity).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
      <View style={styles.quantity}>
        <Text style={[styles.text]}>Số lượng : {quantity}</Text>
        <CustomButton
          title={<MaterialIcons name="add" size={24} color="black" />}
          onPress={() => setQuantity((state) => state + 1)}
          style={styles.custom}
          textStyle={styles.customText}
        />
        <CustomButton
          title={<Ionicons name="remove" size={24} color="black" />}
          onPress={() => setQuantity((state) => (state > 1 ? --state : state))}
          textStyle={styles.customText}
          style={styles.custom}
        />
      </View>
      <CustomButton
        title={"Mua"}
        style={{
          backgroundColor: COLORS.action,
          width: 200,
          alignSelf: "flex-end",
          marginRight: 10,
          marginBottom: 6,
        }}
        textStyle={{ color: COLORS.text_button }}
        onPress={async () => {
          const data = await FetchData.createInvoice(
            user_id,
            myId,
            name,
            quantity,
            price * quantity
          );
          if (data.status === "Ok")
            Alert.alert(
              "Thành công",
              `Mua hàng thành công, đã trừ ${(price * quantity).toLocaleString(
                "vi",
                {
                  style: "currency",
                  currency: "VND",
                }
              )} vào tài khoản ngân hàng ${bankAccount}`
            );
          else Alert.alert("Fail", data.message);

          navigation.navigate("WorldStack");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "40%",
  },
  container: {
    backgroundColor: COLORS.border,
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    marginLeft: Math.round(Math.random() * 30),
  },
  custom: {
    width: 80,
    borderRadius: 32,
    marginRight: 3,
    backgroundColor: COLORS.text_button,
  },
  customText: {
    color: COLORS.action,
  },

  quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Detail;
