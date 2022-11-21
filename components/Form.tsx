import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Input } from "./Input";
import { Card, Fonts } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
export interface CreditCard {
  expiredDate: Date;
  cardHolder: string;
  cardNumber: string;
}
export const CreditCardForm = () => {
  const [cardCVV, setCardCVV] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);
  const onCardCVVChange = (value: string) => {
    setCardCVV(value);
  };
  const onCardHolderChange = (value: string) => {
    setCardHolder(value);
  };
  const onCardNumberChange = (value: string) => {
    const number: string = value;
    const formattedNumber = number
      .replaceAll(" ", "")
      .match(/.{1,4}/g)
      ?.join(" ");
    setCardNumber(formattedNumber ?? "");
  };
  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View>
      <Card mode="elevated" style={Styles.container}>
        <Text>Card Number</Text>
        <Input
          value={cardNumber}
          onChangeText={onCardNumberChange}
          keyboardType="numeric"
          maxLength={19}
        />
        <Text>Card Holders</Text>
        <Input onChangeText={onCardHolderChange} value={cardHolder} />
        <Text>Expiration Date</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            onChange={onDateChange}
          />
        )}
        <Text>CVV</Text>
        <Input
          keyboardType="numeric"
          onChangeText={onCardCVVChange}
          maxLength={3}
        />
      </Card>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    width: "100%",
    minWidth: 300,
    alignContent: "center",
    fontFamily: "Source Sans Pro",
  },
});
