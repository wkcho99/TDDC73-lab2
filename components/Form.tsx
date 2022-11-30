import React, { useState, useDeferredValue, useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  
} from "react-native";
import { Input } from "./Input";
import { Dropdown } from "./Dropdown";
import { Button, Card } from "react-native-paper";
import { Label } from "./Label";
import { CardType, CreditCard, CreditCardInput } from "./CreditCard";
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
  const [focused, setFocused] = useState<keyof CreditCardInput>();
  const [date, setDate] = useState({} as Expiry);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
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
  const showMonth = () => {
    return month.map((n)=>{
      if(n<10){
        return '0'+n
      }
      else return n
    })
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <CreditCard
          cardHolder={cardHolder}
          cardNumber={cardNumber}
          cardType={CardType.MASTER}
          cvv={cardCVV}
          focused={focused}
        ></CreditCard>
        <Card mode="elevated" style={Styles.container}>
          <Label>Card Number</Label>
          <Input
            value={deferredCardNumber}
            onChangeText={onCardNumberChange}
            keyboardType="numeric"
            maxLength={19}
            onFocusCallback={()=>setFocused("cardNumber")}
          />
          <Label>Card Holders</Label>
          <Input onChangeText={onCardHolderChange} value={cardHolder} onFocusCallback={()=>setFocused("cardHolder")}/>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={Styles.dropdownContainer}>
              <Label>Expiration Date</Label>
              <View style={{ flexDirection: "row" }}>
                <Dropdown
                  data={showMonth()}
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
                  onSelect={(selectedItem, index) => {
                    setDate((prev) => ({ ...prev, year: selectedItem }));
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
            <View style={{ minWidth: 75, height: 40 }}>
              <Label>CVV</Label>
              <Input
                keyboardType="numeric"
                onChangeText={onCardCVVChange}
                maxLength={4}
                onFocusCallback={()=>setFocused("cvv")}
              />
            </View>
          </View>
          <Button style={Styles.submit} textColor="white">
            Submit
          </Button>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};
const Styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 200,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "white",
  },
  dropdownContainer: {
    marginRight: 10,
    minWidth: 250,
  },
  submit: {
    marginTop: 25,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
  },
});
