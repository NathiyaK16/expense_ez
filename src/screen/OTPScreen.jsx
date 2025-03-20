import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";

const OTPScreen =({navigation}) =>{
    const [otp, setOTP] = useState('')
    const [error, setError] = useState("");
    const handleContinue =() =>{
        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit OTP");
            return;
          }
          setError("");
        navigation.navigate('CreatePassword')
    }
    return(
        <View style={Styles.container}>
            <Text style={Styles.title}>Enter Confirmation code</Text>
            <Text style={Styles.text}>A 4-digit code was sent to your email</Text>
            <TextInput 
            style={[Styles.input, error ? Styles.inputError : null]}
            placeholder="Enter OTP" 
            value={otp} 
            onChangeText={setOTP} 
            keyboardType="numeric" 
            maxLength={4} 
            />
            {error ? <Text style={Styles.errorText}>{error}</Text> : null}
           <TouchableOpacity>
             <Text style={Styles.link}>Resend code</Text>
           </TouchableOpacity>
           <TouchableOpacity style={Styles.button} >
             <Text style={Styles.buttontext} onPress={handleContinue}>Continue</Text>
           </TouchableOpacity>

        </View>
    )
}
const Styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    title:{
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    },
    text:{
        color:'gray',
        fontSize:12,
        marginBottom:5,
        padding:15,
        textAlign:'center'
    },
    input:{ 
        width: '100%', 
        padding: 20,
        borderWidth: 1,
        borderRadius: 10, 
        marginBottom: 15, 
        textAlign: 'center' 
    },
    inputError: {
        borderColor: "red", 
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    link:{
        color:'blue',
        marginBottom:10,
        textAlign:'center',
    },
    button:{
        borderRadius:10,
        backgroundColor:'#7E8356',
        padding:15,
    },
    
    buttontext:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center', 
    },
})
export default OTPScreen;