import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";


const ForgetPasswordScreen =({navigation}) =>{
    const [username, setUsername] = useState('')
    const [companyname, setCompanyname] = useState('')
    const handleRequest =() =>{
        if(username && companyname){
        navigation.navigate('RequestOTP')
    }else{
        Alert.alert("Please enter the credentials")
    }}
    return(
        <View style={Styles.container}>
            <Text style={Styles.header}>Expense EZ Logo</Text>
            <Text style={Styles.title}>Forget Password</Text>
            <Text style={Styles.text}>Create an account to get started</Text>
            <Text style={Styles.titletext}>User Name</Text>
            <TextInput
            style={Styles.input}
            placeholder="User Name"
            value={username}
            onChangeText={setUsername}
            />
            <Text style={Styles.titletext}>Company Name</Text>
            <TextInput
            style={Styles.input}
            placeholder="Company Name"
            value={companyname}
            onChangeText={setCompanyname}
            />
             
            <TouchableOpacity style={Styles.button} >
                <Text style={Styles.buttontext} onPress={handleRequest}>Request OTP</Text>
            </TouchableOpacity>


        </View>
    )
    }
    const Styles = StyleSheet.create({
        container:{
            flex:1,
            padding:20,
        },
        header:{
            fontSize:24,
            fontWeight:'bold',
            padding:30,
            textAlign:'center'
        },
        title:{
            fontWeight:'bold',
            fontSize:18,
           
        },
        text:{
            color:'gray',
            fontSize:12,
            marginBottom:5,
            padding:5,
        },
        titletext:{
            fontSize:16,
            fontWeight:'bold',
            marginBottom:10,
        },
        input:{
        width:'100%',
        padding:10,
        borderWidth:1,
        borderRadius:10,
        marginBottom:15,
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
    }
    )

export default ForgetPasswordScreen;