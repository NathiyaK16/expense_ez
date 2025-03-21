import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ClaimsScreen = ({navigation}) =>{
  const handleAddNewClaim = () =>{
    navigation.navigate('NewClaimRequest');
};

    return(
        <SafeAreaView style={Styles.container}>
            <StatusBar barStyle='dark-content'/>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>Claims</Text>
                <Icon style={Styles.icon} name='notifications-none' size={20}/>
            </View>
            
              <TouchableOpacity style={Styles.button} onPress={handleAddNewClaim}>
                <Text style={Styles.buttonText}>Add New Claim</Text>
              </TouchableOpacity>
            
            
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
      button: {
        borderRadius: 10,
        backgroundColor: '#7E8356',
        padding: 15,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      
})
export default ClaimsScreen;