import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeProvider';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import OnboardingScreen from './src/screen/OnboardingScreen/OnboardingScreen';
import LoginScreen from './src/screen/LoginScreen/LoginScreen';
import ForgetPasswordScreen from './src/screen/ForgetPasswordScreen/ForgetPasswordScreen';
import OTPScreen from './src/screen/OTPScreen/OTPScreen';
import CreatePasswordScreen from './src/screen/CreatePasswordScreen/CreatePasswordScreen';
import NewClaimRequestScreen from './src/screen/NewClaimRequestScreen/NewClaimRequestScreen';
import HomeScreen from './src/screen/HomeScreen/HomeScreen';
import ClaimsScreen from './src/screen/ClaimsScreen/ClaimsScreen';
import ApprovalsScreen from './src/screen/ApprovalsScreen/ApprovalsScreen';
import ProfileScreen from './src/screen/ProfileScreen/ProfileScreen';
import ClaimSubmitScreen from './src/screen/ClaimSubmitScreen/ClaimSubmitScreen';

//import ThemeProvider from "./theme/ThemeProvider";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: true , animation:"shift", tabBarActiveTintColor: '#7E8356', 
    tabBarInactiveTintColor: 'gray',}} >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        tabBarIcon: ({ color, size,focused }) => <Icon name="home" color={focused ? "#7E8356" : color} size={size} /> 
      }} 
    />
    <Tab.Screen 
      name="Claims" 
      component={ClaimsScreen} 
      options={{ 
        tabBarIcon: ({ color, size , focused}) => <Icon name="file-document" color={focused ? "#7E8356" : color} size={size} /> 
      }} 
    />
    <Tab.Screen 
      name="Approvals" 
      component={ApprovalsScreen} 
      options={{ 
        tabBarIcon: ({ color, size , focused }) => <Icon name="check-circle" color={focused ? "#7E8356" : color} size={size} /> 
      }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ 
        tabBarIcon: ({ color, size , focused}) => <Icon name="account" color={focused ? "#7E8356" : color} size={size} /> 
      }} 
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={BottomTabs} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="RequestOTP" component={OTPScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="NewClaimRequest" component={NewClaimRequestScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Claims" component={ClaimsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SubmitClaim" component={ClaimSubmitScreen} options={{headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
