import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  Animated,
} from "react-native";
import { FadingImage } from "./FadingImage";
import { FocusableBox } from "./FocusableBox";
import { Label } from "./Label";
export enum CardType {
  AMEX = 1,
  DINERSCLUB,
  JCB,
  MASTER,
  TROY,
  UNION,
  VISA,
}
export interface CreditCardInput {
  expiryDate?: Date;
  cardHolder?: String;
  cardNumber?: String;
  cvv?: String;
  cardType?: CardType;
}
export interface CreditCardProps extends CreditCardInput {
  focused?: keyof CreditCardInput;
}
export const CardNumberText: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Text
      style={{
        fontFamily: "Source Sans Pro",
        fontWeight: "500",
        fontSize: 15,
        marginRight: 15,
        color: "white",
      }}
    >
      {children}
    </Text>
  );
};
export const CreditCard = ({
  expiryDate,
  cardHolder,
  cardNumber,
  cardType,
  focused,
}: CreditCardProps) => {
  const cardImage = useMemo(() => require("../assets/image/6.jpeg"), []);
  const cardNumberSections =
    cardNumber?.replaceAll(" ", "").match(/.{1,4}/g) ?? [];
  const formattedDate = expiryDate
    ? `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}`
    : "MM/YY";
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
        source={cardImage}
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
        <FocusableBox
          isFocused={focused === "cardNumber"}
          style={styles.cardNumber}
        >
          <CardNumberText>{cardNumberSections[0]}</CardNumberText>
          <CardNumberText>{cardNumberSections[1]}</CardNumberText>
          <CardNumberText>{cardNumberSections[2]}</CardNumberText>
          <CardNumberText>{cardNumberSections[3]}</CardNumberText>
        </FocusableBox>
        <View style={styles.cardInfo}>
          <FocusableBox
            isFocused={focused === "cardHolder"}
            style={styles.cardHolder}
          >
            <Text style={{ color: "gray" }}>Card Holder</Text>
            <CardNumberText>{cardHolder}</CardNumberText>
          </FocusableBox>
          <FocusableBox
            style={styles.cardHolder}
            isFocused={focused === "expiryDate"}
          >
            <Text style={{ color: "gray" }}>Card Holder</Text>
            <CardNumberText>{formattedDate}</CardNumberText>
          </FocusableBox>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: -150,
    minHeight: 200,
    minWidth: 300,
    overflow: "hidden",
  },
  card: {
    paddingTop: 20,
    paddingBottom: 130,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  },
  chip: {
    height: 40,
    width: 80,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 45,
  },
  cardHolder: {
    flexDirection: "column",
  },
});
