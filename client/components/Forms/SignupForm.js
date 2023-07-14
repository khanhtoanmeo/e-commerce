import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import FetchData from "../../utils/fetchData";
import COLORS from "../../utils/color";
import useUserStore from "../../stores/userStore";
import useNavigationStore from "../../stores/navigationStore";
import CustomInput from "../UI/CustiomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignupForm() {
  const navigation = useNavigationStore((state) => state.navigation);

  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bankName, setBankName] = useState("VPBank");
  const [bankAccount, setBankAccount] = useState("");

  async function SignupHandler() {
    if (!email || !password || !username || !bankAccount || !bankName)
      return Alert.alert("Vui lòng điền đủ thông tin");

    const data = await FetchData.signup(
      email,
      password,
      username,
      bankName,
      bankAccount
    );
    if (data.status === "Fail") return Alert.alert("Lỗi", data.message);
    if (data.status === "Ok") {
      setUser(data.user);
      AsyncStorage.setItem("token", data.token);
      navigation.navigate("Real app");
      navigation.reset({
        index: 0,
        routes: [{ name: "Real app" }],
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Tên người dùng</Text>
            <CustomInput
              placeholderTextColor={COLORS.text_2}
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              placeholder="Nhập tên người dùng"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Email</Text>
            <CustomInput
              placeholderTextColor={COLORS.text_2}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              placeholder="Nhập email"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <CustomInput
              placeholderTextColor={COLORS.text_2}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              placeholder="Nhập mật khẩu"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Chọn ngân hàng</Text>

            <Picker
              selectedValue={bankName}
              onValueChange={(itemValue) => setBankName(itemValue)}
              style={styles.input}
            >
              <Picker.Item
                color={COLORS.action}
                label="VPBank"
                value="VPBank"
              />
              <Picker.Item
                color={COLORS.action}
                label="Techcombank"
                value="Techcombank"
              />
              <Picker.Item
                color={COLORS.action}
                label="Vietcombank"
                value="Vietcombank"
              />
              <Picker.Item
                color={COLORS.action}
                label="Seabank"
                value="Seabank"
              />
              <Picker.Item
                color={COLORS.action}
                label="Bắc Á bank"
                value="Bắc Á bank"
              />
            </Picker>
          </View>
          <View style={styles.field}>
            <Text style={styles.inputLabel}>Tài khoản ngân hàng</Text>
            <CustomInput
              placeholderTextColor={COLORS.text_2}
              style={styles.input}
              onChangeText={(text) => setBankAccount(text)}
              placeholder="Nhập tài khoản ngân hàng"
            />
          </View>
        </View>
        <CustomButton title="Đăng ký" onPress={SignupHandler} />
        <Text
          style={styles.anchor}
          onPress={() => navigation.navigate("Login")}
        >
          Đăng nhập
        </Text>
      </View>
    </View>
  );
}

export default SignupForm;

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
    marginTop: 15,
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
    height: 35,
    padding: 5,
    marginVertical: "1%",
    borderRadius: 7,
    color: COLORS.text_2,
    backgroundColor: COLORS.action,
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
