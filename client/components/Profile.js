import { View, Text, StyleSheet } from "react-native";
import useUserStore from "../stores/userStore";
import COLORS from "../utils/color";
import CustomButton from "./UI/CustomButton";
import useNavigationStore from "../stores/navigationStore";
import useMyPostsStore from "../stores/myPostsStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Profile() {
  const navigation = useNavigationStore((state) => state.navigation);
  const { username, bankName, bankAccount } = useUserStore(
    (state) => state.user
  );
  const setUser = useUserStore((state) => state.setUser);
  const setPosts = useMyPostsStore((state) => state.setPosts);
  function logoutHandler() {
    setUser(null);
    setPosts([]);
    navigation.navigate("Login");
    AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tên người dùng : {username}</Text>
      <Text style={styles.text}>Ngân hàng : {bankName}</Text>
      <Text style={styles.text}>Tài khoản ngân hàng : {bankAccount}</Text>
      <CustomButton title={"Đăng xuất"} onPress={logoutHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.text_2,
    fontSize: 21,
    marginBottom: 15,
  },
  container: {
    borderWidth: 1,
    borderBottomColor: COLORS.anchor,
  },
});

export default Profile;
