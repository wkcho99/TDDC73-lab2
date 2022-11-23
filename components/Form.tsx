import React, { useState, useDeferredValue } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "./Input";
import { Dropdown } from "./Dropdown";
import { Card } from "react-native-paper";
import { Label } from "./Label";
export interface CreditCard {
  expiredDate: Date;
  cardHolder: string;
  cardNumber: string;
}
export interface Expiry {
  month: string;
  year: string;
}
export const CreditCardForm = () => {
  const [cardCVV, setCardCVV] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState({} as Expiry);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = [
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
  ];
  const deferredCardNumber = useDeferredValue(cardNumber);
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

  return (
    <View>
      <Card mode="elevated" style={Styles.container}>
        <Label>Card Number</Label>
        <Input
          value={deferredCardNumber}
          onChangeText={onCardNumberChange}
          keyboardType="numeric"
          maxLength={19}
        />
        <Label>Card Holders</Label>
        <Input onChangeText={onCardHolderChange} value={cardHolder} />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={Styles.dropdownContainer}>
            <Label>Expiration Date</Label>
            <View style={{ flexDirection: "row" }}>
              <Dropdown
                data={month}
                onSelect={(selectedItem, index) => {
                  setDate((prev) => ({ ...prev, month: selectedItem }));
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                // renderDropdownIcon={(isOpened) => {
                //   return (
                //     <FontAwesome
                //       name={isOpened ? "chevron-up" : "chevron-down"}
                //       color={"#444"}
                //       size={18}
                //     />
                //   );
                // }}
                defaultButtonText="Month"
              />
              <Dropdown
                data={year}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                // renderDropdownIcon={(isOpened) => {
                //   return (
                //     <FontAwesome
                //       name={isOpened ? "chevron-up" : "chevron-down"}
                //       color={"#444"}
                //       size={18}
                //     />
                //   );
                // }}
                // buttonStyle={Styles.dropdownBtnStyle}
                // dropdownStyle={Styles.dropdownDropdownStyle}
                // rowStyle={Styles.dropdownRowStyle}
                // rowTextStyle={Styles.dropdownRowTxtStyle}
                defaultButtonText="Year"
              />
            </View>
          </View>
          <View style={{ minWidth: 75 }}>
            <Label>CVV</Label>
            <Input
              keyboardType="numeric"
              onChangeText={onCardCVVChange}
              maxLength={3}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    marginTop: 200,
    padding: 10,
    width: "100%",
    alignContent: "center",
  },
  dropdownContainer: {
    marginRight: 10,
    minWidth: 250,
  },
});
