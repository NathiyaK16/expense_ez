import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';  

const CreatePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  
  const handleSubmit = () => {
    if (password === confirmpassword) {
      navigation.navigate('New Claim Request')
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>Expense EZ Logo</Text>
      <Text style={Styles.title}>Create your own password</Text>
      <Text style={Styles.text}>Create your own password</Text>
      
      <Text style={Styles.titletext}>Password</Text>
      
      
      <View style={Styles.inputContainer}>
        <TextInput
          style={Styles.input}
          placeholder="Create a password"
          secureTextEntry={!isPasswordVisible}  
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity onPress={togglePasswordVisibility} style={Styles.icon}>
          <Icon name={isPasswordVisible ? 'eye' : 'eye-off'}  />
        </TouchableOpacity>
      </View>

      
      <View style={Styles.inputContainer}>
        <TextInput 
          style={Styles.input} 
          placeholder="Confirm password"
          secureTextEntry={!isConfirmPasswordVisible}  
          value={confirmpassword} 
          onChangeText={setConfirmPassword} 
        />
        
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={Styles.icon}>
          <Icon name={isConfirmPasswordVisible ? 'eye' : 'eye-off'}  />
        </TouchableOpacity>
      </View>

      
      <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
        <Text style={Styles.buttontext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 30,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
    padding: 5,
  },
  titletext: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#7E8356',
    padding: 15,
  },
  buttontext: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreatePasswordScreen;
