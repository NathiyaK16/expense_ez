import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleUserNameChange = (text) => setUsername(text);
  const handleCompanyNameChange = (text) => setCompanyname(text);
  const handlePasswordChange = (text) => setPassword(text);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = () => {
    if (username && companyname && password) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert("Please enter all credentials");
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };
  // const handleLogin=async()=>{ 
  //   if (username && companyname && password) {
  //   const formData = {
  //     "company_id" :companyname,
  //     "emp_id" : username,
  //     "password" : password, 
  // }
  //   try{
  //     const response = await axios({
  //       method:"post",
  //       url:`http://192.168.0.23:8081/v1/expensez/login/`,
  //       data: formData,
  //       headers: {
  //         'Content-Type': 'application/json',  
  //       }
  //     }).then((res)=>{
  //       console.log('Response:--->>>>>>>>>>>>>>>>>>>>>>>>>>>>', res.data);
  //       navigation.replace('MainTabs');
  //     }).catch(()=>{
  //       Alert.alert("Something went wrong");
  //     })
      
  //     // if(response && response?.data && response?.data?.status== 200){
  //     //   navigation.replace('MainTabs');
  //     // }
  //   }
  //   catch(error){
  //     console.error("Error:",error);
  //   }
  // }else {
  //       Alert.alert("Please enter all credentials");
  //     }
     
  //     }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={username}
        onChangeText={handleUserNameChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyname}
        onChangeText={handleCompanyNameChange}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.link}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor:'#FDFFEC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor:'white',
  },
  passwordContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15, 
  },
  link: {
    color: '#7E8356',
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#7E8356',
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;

