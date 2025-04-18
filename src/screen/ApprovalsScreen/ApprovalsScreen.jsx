import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useTheme } from '../../theme/useTheme'; 


const ApprovalsScreen = () =>{
    const { theme, themeName} = useTheme();
console.log(theme, themeName)
    return(
        <View style={[Styles.container, {backgroundColor:theme.background}]}>
            <Text style={{...Styles.header, ...{color:theme.text}}}>THIS IS APPROVAL PAGE</Text>
            {/* <TouchableOpacity>
                      <Icon name="notifications-outline" size={24} color={theme.text} />
                    </TouchableOpacity> */}
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