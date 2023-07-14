import { View, StyleSheet } from "react-native";
import Profile from "../components/Profile";
import COLORS from "../utils/color";

import MyPosts from "../components/Posts/MyPosts";
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Profile />
      <MyPosts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export default ProfileScreen;
