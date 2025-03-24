import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, View, Image, Switch   } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
//import { ThemeContext } from "./ThemeContext";



const ProfileScreen = ({navigation}) =>{
  
  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  // console.log(isDarkMode);
    return(
        <SafeAreaView style={Styles.container}>
          <StatusBar barStyle='dark-content'/>
            <View style={Styles.header}>
              <Text style={Styles.headertitle}>My Profile</Text>
            </View>

            <View style={Styles.profileCard}>
              <View style={Styles.avatarContainer}>
                <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                style={Styles.avatar} 
                />  
              </View>
              <TouchableOpacity style={Styles.editButton}>
                 <Icon name ='edit' size={16} color='blue' />
                </TouchableOpacity>

                <Text style={Styles.profileName}>Name</Text>
                <Text style={Styles.profileEmail}>Email id</Text>
                <Text style={Styles.phoneNumber}>Phone Number</Text>
            </View>
            <View style={Styles.sectionHeader}>
              <Text style={Styles.sectionTitle}>APP INFO</Text>
            </View>
            <View style={Styles.menuCard}>
              <View style={Styles.menuItem}>
                <View style={Styles.iconContainer}>
                <Ionicons name='moon' size={24}/></View>
                <Text style={Styles.menuText}>Dark Mode</Text>
                <Switch style={Styles.switch} value={false} />
              </View>
              <TouchableOpacity style={Styles.menuItem}>
                <FontAwesome name='bank' size={24} color='#fc7303'/>
                <Text style={Styles.menuText}>Bank & Cards</Text>
                <Entypo name='chevron-right' size={22} color="#121212"/>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.menuItem}>
                <Fontisto name='player-settings' size={24} color='#2e18f2' />
                <Text style={Styles.menuText}>Settings</Text>
                <Entypo name='chevron-right' size={22} color="#121212"/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={Styles.logoutButton} onPress={() => navigation.navigate('Logout')}>
                        <Text style={Styles.logoutText}>Log Out</Text>
                       </TouchableOpacity>
          
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  headertitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop:'5%'
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fffde7',
    margin: 16,
    borderRadius: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 10,
  },
  profileName:{
    fontWeight:'bold',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: 0.5,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#bdbbbb',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontWeight:'bold'
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  logoutButton:{
     width:'90%',
     borderRadius:10,
     backgroundColor:'red',
     marginTop:'60%',
     height:'5%',
     marginLeft:20,
  },
  logoutText:{
     color:'white',
     textAlign:'center',
     padding:'9',
     fontWeight:'bold',
  },
  iconContainer:{
      width:40,
      height:40,
      backgroundColor:"gray",
      borderRadius:999,
      justifyContent:'center',
      alignItems:'center',
  }
})
export default ProfileScreen;

