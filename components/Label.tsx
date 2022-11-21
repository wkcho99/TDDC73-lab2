import * as React from "react";
import { StyleSheet, Text } from "react-native";
export const Label: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <Text style={styles.text}>{children}</Text>;
};
const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
    fontFamily: "Source Sans Pro",
  },
});
