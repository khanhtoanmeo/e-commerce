import Detail from "../components/Detail";
import Invoices from "../components/Invoices/Invoices";
import OthersPosts from "../components/Posts/OthersPosts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function WorldScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorldStack" component={OthersPosts} />
      <Stack.Screen
        options={{ headerShown: true, headerTitle: "Hóa đơn của tôi" }}
        name="InvoicesStack"
        component={Invoices}
      />
      <Stack.Screen
        name="DetailStack"
        component={Detail}
        options={{ headerShown: true, headerTitle: "Chi tiết sản phẩm" }}
      />
    </Stack.Navigator>
  );
}

export default WorldScreen;
