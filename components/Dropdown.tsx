import React, { useState, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SelectDropdownProps } from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export interface DropdownProps extends SelectDropdownProps {
  onFocusCallback?: () => void;
  onBlurCallback?: () => void;
}
export const Dropdown = (props: DropdownProps) => {
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
    ? StyleSheet.flatten([Styles.dropdownBtnStyle, Styles.focus])
    : Styles.dropdownBtnStyle;
  return (
    <Animated.View
      style={StyleSheet.flatten([
        Styles.container,
        { shadowOpacity: shadowAnim.current },
      ])}
    >
      <SelectDropdown
        dropdownIconPosition="right"
        {...props}
        renderDropdownIcon={(isOpened: boolean) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={12}
            />
          );
        }}
        buttonStyle={customStyle}
        buttonTextStyle={Styles.buttonTextStyle}
        dropdownStyle={Styles.dropdownDropdownStyle}
        rowStyle={Styles.dropdownRowStyle}
        rowTextStyle={Styles.dropdownRowTxtStyle}
      />
    </Animated.View>
  );
};
const Styles = StyleSheet.create({
  dropdownBtnStyle: {
    marginLeft: 10,
    height: 40,
    maxWidth: 120,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  dropdownDropdownStyle: { backgroundColor: "#EFEFEF", borderRadius: 10 },
  dropdownRowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomWidth: 0
  },
  dropdownRowTxtStyle: { color: "#444", textAlign:'left' },
  focus: {
    borderColor: "#87ceeb",
    outlineStyle: "none",
  },
  container: {
    marginBottom: 5,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 8,
  },
  buttonTextStyle:{
    fontSize: 16,
  }
});
