import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ApprovalsScreen = () =>{
    return(
        <View style={Styles.container}>
            <Text>THIS IS Approval PAGE</Text>
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
})
export default ApprovalsScreen;