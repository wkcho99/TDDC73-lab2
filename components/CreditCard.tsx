import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  Animated,
} from "react-native";
import { FadingImage } from "./FadingImage";
export enum CardType {
  AMEX = 1,
  DINERSCLUB,
  JCB,
  MASTER,
  TROY,
  UNION,
  VISA,
}
export interface CreditCardProps {
  expiryDate?: Date | String;
  cardHolder?: String;
  cardNumber?: String;
  cardType?: CardType;
}
export const CreditCard = ({
  expiryDate,
  cardHolder,
  cardNumber,
  cardType,
}: CreditCardProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const getLogoByType = useCallback((type?: CardType) => {
    const basePath = "../assets/image";
    switch (type) {
      case CardType.AMEX:
        return require(`${basePath}/amex.png`);
      case CardType.DINERSCLUB:
        return require(`${basePath}/dinersclub.png`);
      case CardType.JCB:
        return require(`${basePath}/jcb.png`);
      case CardType.VISA:
        return require(`${basePath}/visa.png`);
      case CardType.UNION:
        return require(`${basePath}/unionpay.png`);
      case CardType.MASTER:
        return require(`${basePath}/mastercard.png`);
      case CardType.TROY:
        return require(`${basePath}/troy.png`);
      default:
        return undefined;
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/6.jpeg")}
        resizeMode="cover"
        style={styles.card}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={require("../assets/image/chip.png")}
            resizeMode="contain"
            style={styles.chip}
          />
          <FadingImage source={getLogoByType(cardType)} style={styles.chip} />
        </View>
        <View></View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: -150,
    zIndex: 999,
    minHeight: 200,
    minWidth: 300,
    overflow: "hidden",
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  },
  chip: {
    height: 40,
    width: 80,
  },
});
