import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";


const NewClaimRequestScreen = () =>{
    
    return(
        <View style ={Styles.container}>
            <TextInput
            style ={Styles.text}
            placeholder="Scan Bill"
            />
            </View>
    )
}
const Styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 20, 
    },
    text:{
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        textAlign:'center',
    },
    
})
export default NewClaimRequestScreen;