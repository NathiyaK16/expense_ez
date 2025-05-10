import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,TouchableOpacity,View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from "../../theme/useTheme";
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) =>{
  const { theme } = useTheme();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUnreadCount();
    });

    getUnreadCount(); 

    return unsubscribe;
  }, [navigation]);

  const getUnreadCount = async () => {
    const count = await AsyncStorage.getItem('unreadCount');
    setUnreadCount(parseInt(count || '0', 10));
  };
  const handleNotification = () => {
    navigation.navigate('Notification');
   }
  return(
    <View style={[Styles.container,{backgroundColor:theme.background}]}>
      <View style={Styles.header}>
      <Text style={[Styles.headerTitle,{color:theme.text}]} class="app_logo"> Expense ez Logo</Text>
      {/* <TouchableOpacity  onPress={handleNotification} >
                <Icon name="notifications-outline" size={24} color={theme.text} />
                {unreadCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -4,
          top: -4,
          backgroundColor: 'red',
          borderRadius: 10,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 12 }}>{unreadCount}</Text>
        </View>
      )}
              </TouchableOpacity> */}
              <View style={{ position: 'absolute', right: 20, top: 20 }}>
  <TouchableOpacity onPress={handleNotification}>
    <Icon name="notifications-outline" size={28} color={theme.text} />
    {unreadCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: 'red',
          borderRadius: 10,
          width: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: theme.text, fontSize: 10, fontWeight: 'bold' }}>
          {unreadCount}
        </Text>
      </View>
    )}
  </TouchableOpacity>
</View>

      </View>
      <View>
      </View>
    </View>
  )
}
const Styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // padding: 15,
    // backgroundColor: '#FFFFFF'
    flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 40,  // Adjust if you have SafeAreaView
  paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  
})
export default HomeScreen;