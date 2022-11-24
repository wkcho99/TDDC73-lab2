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
      toValue: 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (props.onFocusCallback) props.onFocusCallback();
    setIsFocused(true);
  };
  const onBlur = () => {
    Animated.timing(shadowAnim.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (props.onBlurCallback) props.onBlurCallback();

    setIsFocused(false);
  };
  const customStyle = isFocused
    ? StyleSheet.flatten([styles.input, styles.focus])
    : styles.input;
  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.container,
        { elevation: shadowAnim.current },
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
    minHeight: 40,
    padding: 10,
    height: "auto",
    color: "#000000",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
  },
  focus: {
    borderColor: "deepskyblue",
    outlineStyle: "none",
  },
  container: {
    padding: 5,
    marginBottom: 5,
    elevation: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 2,
    //   height: 3,
    // },
    // shadowRadius: 4.65,
  },
});
