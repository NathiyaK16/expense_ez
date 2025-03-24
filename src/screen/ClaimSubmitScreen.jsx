import React from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const ClaimSubmitScreen =({navigation}) =>{
    return(
        <View style ={Styles.container}>
            <FontAwesome6 style={Styles.icon} name='check-double'  />
            <Text style={Styles.text}>Claim Submitted Successfully</Text>
            <TouchableOpacity>
                <Text style={Styles.link}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}
const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#7E8356',
        justifyContent:'center',
    },
    icon:{
       marginLeft:'50%',
       padding:'5',
    },
    text:{
        color:'white',
       fontWeight:'bold',
        textAlign:'center',
        color:'white',
        fontSize:35,
    },
    link:{
        color:'white',
        marginTop:'70%',
        textAlign:'center',
    },
})
export default ClaimSubmitScreen;