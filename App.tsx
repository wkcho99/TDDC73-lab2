import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CreditCardForm } from "./components/Form";
import { useFonts } from "expo-font";
import { CreditCard } from "./components/CreditCard";

export default function App() {
  const [isFontLoaded] = useFonts({
    "Source Sans Pro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });
  if (!isFontLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <CreditCardForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    maxHeight: 500,
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
