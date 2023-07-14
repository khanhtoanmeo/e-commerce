import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import COLORS from "../../utils/color";

function CustomInput(props) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextInput
      {...props}
      style={[
        props.style,
        {
          backgroundColor: isFocus ? COLORS.anchor : COLORS.text_3,
          color: COLORS.text_2,
        },
      ]}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
}

export default CustomInput;
