import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Icon } from 'react-native';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle between showing and hiding the password
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!isPasswordVisible} // Set secureTextEntry based on visibility
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
        <Text style={styles.iconText}>
          {isPasswordVisible ? 'Hide' : 'Show'} {/* Text changes based on visibility */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  iconText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default PasswordInput;
