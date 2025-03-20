import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ClaimsScreen = () =>{
    return(
        <SafeAreaView style={Styles.container}>
            <StatusBar barStyle='dark-content'/>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Claims</Text>
                <Icon style={Styles.icon} name='notifications-none' size={20}/>
            </View>
            
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      header: {
        padding: 26,
        backgroundColor: '#fff',
        flexDirection:'row',
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:'5%',
        flex:1,
      },
      icon:{
        top:15,
        right:10,
      },
      
})
export default ClaimsScreen;