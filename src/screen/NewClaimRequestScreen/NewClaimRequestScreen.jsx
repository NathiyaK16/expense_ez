import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useTheme } from '../../theme/useTheme';
import { BASEPATH } from '../config';
import {launchImageLibrary} from 'react-native-image-picker';
const NewClaimRequestScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [scannedImage, setScannedImage] = useState(null);
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [policyMap, setPolicyMap] = useState({});


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

  const handleCancel = () => {
    navigation.navigate('Claims');
  };

  const handleSubmit = () => {
    navigation.navigate('SubmitClaim');
  };


  // useEffect(() => {
  //   axios.get('http://192.168.0.24:8081/v1/client/policy/get_all_policies2/?operation=read&company_id=durr')
  //     .then(res => {
  //       const apiData = res?.data?.data || [];
  //       const categories = [];
  //       const policyMap = {};

  //       apiData.forEach(item => {
  //         const { main_expense_head, main_expense_name, policy_details } = item;
  //         categories.push({ id: main_expense_head, name: main_expense_name });
  //         policyMap[main_expense_name] = policy_details;
  //       });

  //       setMainCategories(categories);
  //       setPolicyMap(policyMap);
  //     })
  //     .catch(() => {
  //       Alert.alert("Something went wrong");
  //     });
  // }, []);


  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`);
        const apiData = response?.data?.data || [];
  
        const categories = apiData.map(item => ({
          id: item.main_expense_head,
          name: item.main_expense_name,
        }));
  
        const map = {};
        apiData.forEach(item => {
          map[item.main_expense_name] = item.policy_details;
        });
  
        setMainCategories(categories);
        setPolicyMap(map);
      } catch (error) {
        Alert.alert('Something went wrong');
      }
    };
  
    fetchPolicies();
  }, []);
  

  const handleUploadBill = async () => {
    let isMounted = true;  // Mounted flag for safety
  
    try {
      // Launch image library to allow the user to select an image from the device
      const result = await launchImageLibrary({
        mediaType: 'photo',       // Specify that you want to pick a photo
        includeBase64: true,      // Include base64-encoded string (optional)
      });
  
      if (!isMounted) return;  // Check if the component is still mounted
  
      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
  
      // Check if assets exist in the result
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];  // Get the first selected image
  
        console.log('Image selected: ', asset.uri);  // URI of the selected image
  
        // You can now upload the image or perform any other operations you need
        // You can use asset.uri to get the path of the image on the device
      } else {
        Alert.alert('Error', 'No image selected.');
      }
  
    } catch (error) {
      console.error('Upload Error:', error);
      if (isMounted) {
        Alert.alert('Error', 'Something went wrong while selecting or uploading the image.');
      }
    }
  
    // Cleanup to handle component unmounting
    useEffect(() => {
      return () => {
        isMounted = false;
      };
    }, []);
  };
  
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.borderColor }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>New Claim Request</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Main Expense Category</Text>
            <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
              <Picker
                selectedValue={mainCategory}
                style={[styles.picker, { color: theme.text }]}
                onValueChange={(value) => {
                  setMainCategory(value);
                  setSubCategory(null);
                }}>
                {!mainCategory && (
                  <Picker.Item label="Select Main Category" value={null} enabled={false} />
                )}
                {mainCategories.map((item) => (
                  <Picker.Item key={item.id} label={item.name} value={item.name} />
                ))}
              </Picker>
            </View>
          </View>

          {mainCategory && (
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Sub Expense Category</Text>
              <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
                <Picker
                  selectedValue={subCategory}
                  style={[styles.picker, { color: theme.text }]}
                  onValueChange={(value) => setSubCategory(value)}>
                  {!subCategory && (
                    <Picker.Item label="Select Subcategory" value={null} enabled={false} />
                  )}
                  {policyMap[mainCategory]?.map((item, index) => (
                    <Picker.Item key={index} label={item.sub_expense_name} value={item.sub_expense_name} />
                  ))}
                </Picker>
              </View> 
            </View>
          )}

          {subCategory && (
            <View style={[styles.inputGroup, { paddingTop: 10 }]}>
              <Text style={[styles.label, { color: theme.text }]}>Policy Details</Text>
              {(() => {
                const selectedPolicy = policyMap[mainCategory]?.find(
                  (item) => item.sub_expense_name === subCategory
                );
                if (!selectedPolicy) return null;
                return (
                  <View style={[styles.policyContainer, { backgroundColor: theme.background }]}>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Amount Limit: ₹{selectedPolicy.policy_amount}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Frequency: {selectedPolicy.frequency}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Max Claims: {selectedPolicy.no_of_times_claim}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Valid From: {selectedPolicy.effective_from}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Valid To: {selectedPolicy.effective_end}</Text>
                    {selectedPolicy.descriptions && selectedPolicy.descriptions !== 'null' && (
                      <Text style={[styles.policyItem, { color: theme.text }]}>Description: {selectedPolicy.descriptions}</Text>
                    )}
                  </View>
                );
              })()}
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Amount</Text>
            <View style={[styles.amountContainer, { borderColor: theme.borderColor }]}>
              <TextInput
                style={[styles.amountInput, { color: theme.text }]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={theme.secondaryColor}
              />
              <Text style={[styles.currencyText, { color: theme.text }]}>INR</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Date</Text>
            <TouchableOpacity
              style={[styles.datePickerButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: theme.text }]}>{formatDate(date)}</Text>
              <Icon name="calendar-outline" size={20} color={theme.text} />
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
            <Text style={[styles.label, { color: theme.text }] } >Upload Bill</Text>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}onPress={handleUploadBill}>
              <Icon name="cloud-upload-outline" size={24} color={theme.text} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={handleUploadBill}>
              <Text style={[styles.uploadText, { color: theme.text }]}>Upload Bills</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.borderColor}]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: theme.buttonBg }]}
              onPress={handleSubmit}
            >
              <Text style={[styles.submitButtonText, { color: theme.buttonTextColor }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#fff' 
    },
  scrollContainer: { 
    paddingBottom: 80
   },
  header: {
    padding: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  formContainer: { padding: 15 },
  scanButton: {
    backgroundColor: '#f9f9e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e0e0b0',
  },
  scanButtonText: { color: '#333', fontWeight: '500' },
  scannedImage: { width: 300, height: 400, marginTop: 20, borderRadius: 8 },
  orText: { textAlign: 'center', color: '#666', marginVertical: 10 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#333', marginBottom: 5 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: { flex: 1, height: 55 },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  amountInput: { flex: 1, height: 45 },
  currencyText: { color: '#666', fontWeight: '500' },
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
  dateText: { color: '#333' },
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
  uploadText: { marginLeft: 8, color: '#333' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '40%',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#b5b5b1',
  },
  cancelButtonText: {
     color: '#333', 
     fontWeight: '500'
     },
  submitButton: {
    flex: 1,
    backgroundColor: '#7E8356',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  submitButtonText: { color: '#fff', fontWeight: '500' },
  policyContainer: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  policyItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default NewClaimRequestScreen;


