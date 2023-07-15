import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import COLORS from "./utils/color";
import WorldScreen from "./screens/WorldScreen";
import PostUploadScreen from "./screens/PostUploadScreen";
import { Fontisto, Entypo } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function RealApp() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: "10%",
        },
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: COLORS.text_button,
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({}) => (
            <Fontisto name="person" size={20} color={COLORS.text_3} />
          ),
        }}
      />
      <BottomTab.Screen
        name="World"
        component={WorldScreen}
        options={{
          tabBarIcon: () => (
            <Entypo name="shop" size={20} color={COLORS.text_3} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={PostUploadScreen}
        options={{
          tabBarIcon: () => (
            <Fontisto name="upload" size={20} color={COLORS.text_3} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarHidden: true,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen}></Stack.Screen>
        <Stack.Screen name="Real app" component={RealApp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
