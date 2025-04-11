import React from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';


const ClaimSubmitScreen =({navigation}) =>{

    const handleBack = () =>{
        navigation.navigate('NewClaimRequest')
    }
    return(
        <View style ={Styles.container}>
            <View style={Styles.iconContainer}>
            <Icon style={Styles.icon} name='check-double' size={30} color='#7E8356'/>
          </View>
          <View>
            <Text style={Styles.text}>Claim Submitted Successfully</Text>
            <TouchableOpacity>
                <Text style={Styles.link} onPress={handleBack}>Back</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#7E8356',
        justifyContent:'center',
    },
    iconContainer:{
        borderWidth:1,
        borderColor:'#7E8356',
        backgroundColor:'#f5f5f5',
        borderRadius:10,
        height:70,
        width:70,
        marginLeft:'45%',
        
    },
    icon:{
       marginLeft:'30%',
       marginTop:18,
       padding:'5',
    },
    text:{
        color:'white',
       fontWeight:'bold',
        textAlign:'center',
        color:'white',
        fontSize:35,
        justifyContent:'center',
        padding:10,
    },
    link:{
        color:'white',
        marginTop:'70%',
        textAlign:'center',
    },
})
export default ClaimSubmitScreen;