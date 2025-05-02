import React from "react";
import {StyleSheet,Text, TouchableOpacity, View } from "react-native";
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


// import React from 'react';
// import {View,Text, TouchableOpacity,StyleSheet, SafeAreaView, StatusBar, Platform,} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const ClaimSubmitScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Set white status bar for iOS style */}
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="#7E8356"
//         translucent={false}
//       />

//       <View style={styles.centerContent}>
//         <View style={styles.iconContainer}>
//           <Icon name="checkmark-done-outline" size={40} color="#7E8356" />
//         </View>

//         <Text style={styles.title}>Claim Submitted</Text>
//         <Text style={styles.subtitle}>Successfully</Text>
//       </View>

//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#7E8356',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 60,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   centerContent: {
//     alignItems: 'center',
//     marginTop: Platform.OS === 'android' ? 40 : 0,
//   },
//   iconContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 18,
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   backButton: {
//     marginBottom: 20,
//   },
//   backText: {
//     fontSize: 14,
//     color: '#fff',
//     textDecorationLine: 'underline',
//   },
// });

// export default ClaimSubmitScreen;
