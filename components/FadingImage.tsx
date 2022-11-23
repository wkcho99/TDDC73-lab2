import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface FadingImageProps {
  source: any;
  style: any;
}
export const FadingImage: React.FC<FadingImageProps> = ({ source, style }) => {
  const fadeAnim = useRef(new Animated.Value(0));
  const onLoad = () => {
    Animated.timing(fadeAnim.current, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeAnim.current = new Animated.Value(0);
  }, [source, fadeAnim.current]);
  return (
    <Animated.Image
      onLoad={onLoad}
      source={source}
      resizeMode="contain"
      style={StyleSheet.flatten([
        style,
        {
          opacity: fadeAnim.current,
          transform: [
            {
              scale: fadeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        },
      ])}
    ></Animated.Image>
  );
};
