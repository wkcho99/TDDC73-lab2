import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CreditCardForm } from "./components/Form";
import { useFonts } from "expo-font";

export default function App() {
  const [isFontLoaded] = useFonts({
    "Source Sans Pro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });
  if (!isFontLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <CreditCardForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
