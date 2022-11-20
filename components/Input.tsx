import React, { useCallback, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputProps,
  Animated,
} from "react-native";
export interface InputProps extends TextInputProps {
  onFocusCallback?: () => void;
  onBlurCallback?: () => void;
}
export const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const shadowAnim = useRef(new Animated.Value(0));
  const onFocus = () => {
    Animated.timing(shadowAnim.current, {
      toValue: 0.4,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsFocused(true);
  };
  const onBlur = () => {
    Animated.timing(shadowAnim.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsFocused(false);
  };
  const customStyle = isFocused
    ? StyleSheet.flatten([styles.input, styles.focus])
    : styles.input;
  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.container,
        { shadowOpacity: shadowAnim.current },
      ])}
    >
      <TextInput
        {...props}
        style={customStyle}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 3,
    height: "auto",
    color: "#000000",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 4,
  },
  focus: {
    borderColor: "#87ceeb",
    outlineStyle: "none",
  },
  container: {
    marginBottom: 5,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 3,
    shadowColor: "#171717",
  },
});
