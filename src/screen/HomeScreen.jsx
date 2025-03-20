import React from "react";
import { StyleSheet, Text,View } from "react-native";


const HomeScreen = () =>{
  return(
    <View style={Styles.container}>
      <Text style={Styles.text}>WELCOME TO LANDING PAGE</Text>

    </View>
  )
}
const Styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text:{
    fontSize: 24,
    fontWeight: 'bold',
  
  }
})
export default HomeScreen;