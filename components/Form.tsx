import React, { useCallback,useState } from 'react';
import { StyleSheet, Text, View,TextInput, Button, NativeSyntheticEvent,TextInputChangeEventData } from 'react-native';
import {Input} from './Input'
import { Card, Fonts } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
export interface CreditCard {
  expiredDate: Date,
  cardHolder: string
  cardNumber: string
}
export const CreditCardForm = () => {
  const [cardCVV,setCardCVV] = useState("")
  const [cardHolder,setCardHolder] = useState("")
  const [cardNumber,setCardNumber] = useState("")
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onCardCVVChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCardCVV(e.target.value);
  }
  const onCardHolderChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCardHolder(e.target.value);
  }
  const onCardNumberChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const number: string = e.target.value as string;
    const formattedNumber = number.replaceAll(' ', '').match(/.{1,4}/g)?.join(" ");
    setCardNumber(formattedNumber ?? "")
  }
  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  
    return(
        <View>
          <Card mode='elevated' style={Styles.container}>
      
          <Text>Card Number</Text>
          <Input
          value={cardNumber}
          onChange={onCardNumberChange}
          keyboardType='numeric'
          maxLength={19}
          />
            <Text>Card Holders</Text>
            <Input onChange={onCardHolderChange} 
            value={cardHolder}
            />
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
      keyboardType='numeric' 
      onChange={onCardCVVChange} 
      maxLength={3} />
      </Card>
        </View>
    );
    }
    const Styles = StyleSheet.create({
      container :{
        height: '100%',
        width: '100%',
          alignContent:'center',
          fontFamily: "Source Sans Pro"
      }
      
  })