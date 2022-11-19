import React, { useCallback,useState } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';

import MonthPicker from 'react-native-month-year-picker';
export interface CreditCard {
  expiredDate: Date,
  cardHolder: string
  cardNumber: string
}
export const CreditCardForm = ({}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: boolean) => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );
    return(
        <View>
            <Text>Card Number</Text>
          <TextInput
          keyboardType='numeric'
          />
            <Text>Card Holders</Text>
            <TextInput/>
            <Text>Expiration Date</Text>
            {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        />
      )}
        </View>
    );
    }