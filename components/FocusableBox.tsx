import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
interface FocusableBoxProps {
  isFocused: boolean;
  children?: React.ReactNode;
  style?: any;
}
export const FocusableBox: React.FC<FocusableBoxProps> = ({
  isFocused,
  children,
  style,
}) => {
  const borderAnim = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(borderAnim.current, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);
  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.container,
        style,
        {
          borderColor: borderAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "white"],
          }),
        },
      ])}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
});
