import { Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from "../../utils/color";

function CustomButton({ onPress, title, style, textStyle }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPress}
        style={styles.pressable}
        android_ripple={{ color: COLORS.text_2 }}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.text_button,
  },
  pressable: {
    padding: 10,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  text: {
    color: COLORS.action,
    fontSize: 20,
    textAlign: "center",
  },
});

export default CustomButton;
