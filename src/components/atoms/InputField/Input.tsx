import React from "react";
import { KeyboardType, StyleSheet } from "react-native";
import { Input as RNInput } from "react-native-elements";

export type InputProps = {
  inputStyle: object;
  maxLength: number;
  blurOnSubmit: boolean;
  autoCapitalize: "none" | "sentences" | "words" | "characters";
  autoCorrect: boolean;
  keyboardType: KeyboardType;
  value: string;
  onChangeText: (number: string) => void;
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <RNInput
      {...props}
      containerStyle={{ ...styles.input, ...props.inputStyle }}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: "grey",
    marginVertical: 10,
  },
});

export default Input;
