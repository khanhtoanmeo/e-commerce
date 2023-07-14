import { Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from "../../utils/color";

function CustomButton({ onPress, title }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={styles.pressable}
        android_ripple={{ color: COLORS.text_2 }}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
  },
  pressable: {
    padding: 10,
    backgroundColor: COLORS.action,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  text: {
    color: COLORS.text_button,
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomButton;
