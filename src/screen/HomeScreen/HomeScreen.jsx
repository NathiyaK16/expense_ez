import React from "react";
import { StyleSheet, Text,TouchableOpacity,View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from "../../theme/useTheme";
const HomeScreen = ({navigation}) =>{
  const { theme } = useTheme();
  return(
    <View style={[Styles.container,{backgroundColor:theme.background}]}>
      <View style={Styles.header}>
      <Text style={[Styles.headerTitle,{color:theme.text}]} class="app_logo"> Expense ez Logo</Text>
      <TouchableOpacity>
        <Icon name="notifications-outline" size={24} color={theme.text} />
      </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  
})
export default HomeScreen;