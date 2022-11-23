import React from 'react'
import {View,ImageBackground,StyleSheet,Image,Text} from 'react-native'
export interface CreditCardProps { 
    expiryDate?: Date | String
    cardHolder?: String
    cardNumber?: String
}
export const CreditCard = ({expiryDate,cardHolder,cardNumber}: CreditCardProps) => {
    return (
    <View style={styles.container}>
        <ImageBackground source={require("../assets/image/6.jpeg")} resizeMode="cover" style={styles.card}>
            <View style={{padding: 30}}>
                <View style={{height:50,width:"auto"}}>
                    <Image source={require("../assets/image/chip.png")} style={styles.chip} resizeMode="cover"/>
            </View>
        </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: -150,
        zIndex:999,
        minHeight: 200,
        minWidth: 300,
        overflow:"hidden"
    },
    card: {
        borderRadius:8,
        flex: 1,
        justifyContent: "center"
      },
    chip: {
        height:"auto",
        width: '100%'
    }
})