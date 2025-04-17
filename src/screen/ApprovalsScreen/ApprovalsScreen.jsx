import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '../../theme/useTheme'; 

const ApprovalsScreen = () =>{
    const { theme, themeName} = useTheme();
console.log(theme, themeName)
    return(
        <View style={[Styles.container, {backgroundColor:theme.background}]}>
            <Text style={{...Styles.header, ...{color:theme.text}}}>THIS IS Approval PAGE</Text>
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