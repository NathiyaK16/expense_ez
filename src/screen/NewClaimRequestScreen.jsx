import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,ScrollView,Image,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentScanner from "react-native-document-scanner-plugin";

const NewClaimRequestScreen = ({navigation}) => {
  const [scannedImage,setScannedImage] = useState(null);
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date(null));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const scanDocument = async () =>{
    const scannedImages = await DocumentScanner.scanDocument();
    if(scannedImages && scannedImages.length > 0){
      setScannedImage(scannedImages[0]);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Claim Request</Text>
        </View>

        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.scanButton} onPress={scanDocument}>
            <Text style={styles.scanButtonText}>Scan Bill</Text>
          </TouchableOpacity>

          {scannedImage && (
        <Image source={{ uri: scannedImage }} style={styles.scannedImage} />
      )}

          <Text style={styles.orText}>or</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Main Expense Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={mainCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setMainCategory(itemValue)}
              >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Travel" value="Travel" />
                <Picker.Item label="Accommodation" value="Accommodation" />
                <Picker.Item label="Office Supplies" value="Office Supplies" />
              </Picker>
              {/*<Icon name="chevron-down" size={18} color="#333" style={styles.pickerIcon} />*/}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sub Expense Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={subCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setSubCategory(itemValue)}
              >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Beverages" value="Beverages" />
                <Picker.Item label="Snacks" value="Snacks" />
              </Picker>
              {/*<Icon name="chevron-down" size={18} color="#333" style={styles.pickerIcon} />*/}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountContainer}>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0"
              />
              <Text style={styles.currencyText}>INR</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(date)}</Text>
              <Icon name="calendar-outline" size={20} color="#333" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Bill</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Icon name="cloud-upload-outline" size={24} color="#333" />
              <Text style={styles.uploadText}>Upload Bills</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/*<View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="document-text-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="checkmark-circle-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Approvals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="person-outline" size={24} color="#666" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    padding: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    padding: 15,
  },
  scanButton: {
    backgroundColor: '#f9f9e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e0e0b0',
  },
  scanButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  scannedImage: {
    width: 300,
    height: 400,
    marginTop: 20,
    borderRadius: 8,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    flex: 1,
    height: 45,
  },
  pickerIcon: {
    paddingRight: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  amountInput: {
    flex: 1,
    height: 45,
  },
  currencyText: {
    color: '#666',
    fontWeight: '500',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  uploadText: {
    marginLeft: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '40%',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderWidth:1,
    borderColor:'#b5b5b1',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7E8356',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
 /* tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },*/
});

export default NewClaimRequestScreen;

{/*import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";

const NewClaimRequestScreen = ({ navigation }) => {
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>New Claim Request</Text>

      <TouchableOpacity style={styles.scanButton}>
        <Text>Scan Bill</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Main Expense Category</Text>
      <RNPickerSelect
        onValueChange={setMainCategory}
        items={[
          { label: "Food", value: "Food" },
          { label: "Travel", value: "Travel" },
          { label: "Accommodation", value: "Accommodation" },
        ]}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Sub Expense Category</Text>
      <RNPickerSelect
        onValueChange={setSubCategory}
        items={[
          { label: "Snacks", value: "Snacks" },
          { label: "Beverages", value: "Beverages" },
        ]}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Amount (INR)</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
        <Text>{date.toDateString()}</Text>
        <Icon name="calendar-outline" size={20} color="#333" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={(e, selectedDate) => {
          setShowDatePicker(false);
          if (selectedDate) setDate(selectedDate);
        }} />
      )}

      <TouchableOpacity style={styles.uploadButton}>
        <Icon name="cloud-upload-outline" size={24} color="#333" />
        <Text>Upload Bill</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={{ color: "#fff" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  label: { marginTop: 10, fontWeight: "500" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginTop: 5 },
  scanButton: { padding: 15, borderWidth: 1, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  datePicker: { flexDirection: "row", justifyContent: "space-between", padding: 12, borderWidth: 1, borderRadius: 8, marginTop: 5 },
  uploadButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 12, borderWidth: 1, borderRadius: 8, marginTop: 10 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancelButton: { flex: 1, padding: 15, alignItems: "center", marginRight: 10, borderWidth: 1, borderRadius: 8 },
  submitButton: { flex: 1, backgroundColor: "#8a8c61", padding: 15, alignItems: "center", borderRadius: 8 },
});

const pickerSelectStyles = {
  inputIOS: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginTop: 5 },
  inputAndroid: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginTop: 5 },
};

export default NewClaimRequestScreen;*/}


