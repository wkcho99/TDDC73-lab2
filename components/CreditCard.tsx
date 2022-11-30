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
import { Expiry } from "./Form";
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
  expiryDate?: Expiry;
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
  cvv,
  focused,
}: CreditCardProps) => {
  const cardImage = useMemo(() => require("../assets/image/6.jpeg"), []);
  const cardNumberSections =
    cardNumber?.replaceAll(" ", "").match(/.{1,4}/g) ?? [];
  const formattedDate = `${expiryDate?.month ?? "MM"}/${
    expiryDate?.year ?? "YY"
  }`;
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
  const cardLogo = useMemo(() => getLogoByType(cardType), [cardType]);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    focused === "cvv" ? flipToBack() : flipToFront();
  });
  return (
    <View>
      <Animated.View style={{ ...styles.container, ...flipToFrontStyle }}>
        <ImageBackground
          source={cardImage}
          resizeMode="cover"
          style={styles.card}
        >
          <View style={styles.blackband}></View>
          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 5,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              <Text style={{ color: "white" }}>CVV</Text>
            </View>
            <View style={styles.cvv}>
              <Text>{"*".repeat(cvv?.length ?? 0)}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Image
                source={cardLogo}
                resizeMode="contain"
                style={styles.chip}
              />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
      <Animated.View style={{ ...styles.container, ...flipToBackStyle }}>
        <ImageBackground
          source={cardImage}
          resizeMode="cover"
          style={styles.card}
        >
          <View style={styles.frontCard}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                source={require("../assets/image/chip.png")}
                resizeMode="contain"
                style={styles.chip}
              />
              <FadingImage source={cardLogo} style={styles.chip} />
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
                <CardNumberText>{cardHolder || "FULLNAME"}</CardNumberText>
              </FocusableBox>
              <FocusableBox
                style={styles.cardHolder}
                isFocused={focused === "expiryDate"}
              >
                <Text style={{ color: "gray" }}>Expires</Text>
                <CardNumberText>{formattedDate}</CardNumberText>
              </FocusableBox>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: -180,
    marginHorizontal: 10,
    minHeight: 230,
    minWidth: 300,
    overflow: "hidden",
    zIndex: 999,
    backfaceVisibility: "hidden",
  },
  frontCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    minHeight: "90%",
  },
  card: {
    paddingTop: 20,
    paddingBottom: 130,
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
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 45,
  },
  cardHolder: {
    flexDirection: "column",
  },
  blackband: {
    marginTop: 5,
    height: 45,
    backgroundColor: "black",
    opacity: 0.85,
  },
  cvv: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 20,
  },
});
