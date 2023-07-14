import { View, Text, Alert, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import { useState } from "react";
import FetchData from "../../utils/fetchData";
import COLORS from "../../utils/color";
import useUserStore from "../../stores/userStore";
import useNavigationStore from "../../stores/navigationStore";
import CustomInput from "../UI/CustiomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigationStore((state) => state.navigation);
  const setUser = useUserStore((state) => state.setUser);

  async function loginHandler() {
    if (!email || !password) return Alert.alert("Vui lòng điền đủ thông tin");
    const data = await FetchData.login(email, password);
    if (data.status === "Fail") Alert.alert("Lỗi", data.message);
    else if (data.status === "Ok") {
      setUser(data.user);
      await AsyncStorage.setItem("token", data.token);
      navigation.navigate("Real app");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Email</Text>
            <CustomInput
              onChangeText={(text) => setEmail(text)}
              placeholder="Nhập email"
              style={styles.input}
              placeholderTextColor={COLORS.text_2}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <CustomInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              placeholder="Nhập mật khẩu"
              placeholderTextColor={COLORS.text_2}
              secureTextEntry={true}
            />
          </View>
        </View>
        <CustomButton title="Đăng nhập" onPress={loginHandler} />
        <Text
          style={styles.anchor}
          onPress={() => navigation.navigate("Signup")}
        >
          Tạo tài khoản
        </Text>
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    alignItems: "center",
  },
  form: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    width: "85%",
    marginTop: "20%",
    paddingHorizontal: 3,
    paddingVertical: 10,
    alignItems: "center",
  },
  inputLabel: {
    color: COLORS.text_1,
    fontSize: 25,
  },
  input: {
    borderColor: COLORS.action,
    borderWidth: 1,
    width: 200,
    padding: 5,
    marginVertical: "5%",
    borderRadius: 7,
  },

  field: {
    alignItems: "center",
    marginVertical: 5,
  },
  anchor: {
    marginVertical: 16,
    color: COLORS.anchor,
  },
});

export default LoginForm;
