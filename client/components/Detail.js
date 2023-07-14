import {
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Button,
} from "react-native";
import COLORS from "../utils/color";
import CustomButton from "./UI/CustomButton";
import { useEffect, useState } from "react";
import FetchData from "../utils/fetchData";
import useUserStore from "../stores/userStore";
import useNavigationStore from "../stores/navigationStore";

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
        Giá:
        {(price * quantity).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
      <Text style={[styles.text]}>Số lượng : {quantity}</Text>
      <Button title="+" onPress={() => setQuantity((state) => state + 1)} />
      <Button
        title="-"
        onPress={() => setQuantity((state) => (state > 1 ? --state : state))}
      />
      <Text style={[styles.text]}>
        Ngày đăng: {new Date(createdAt).toLocaleDateString("vi")}
      </Text>
      <Text style={[styles.text]}>Phân loại: {type}</Text>
      <Text style={[styles.text]}>Mô tả: {description}</Text>
      <CustomButton
        title={"Mua"}
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
});

export default Detail;
