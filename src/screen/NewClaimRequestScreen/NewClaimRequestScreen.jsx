

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useTheme } from '../../theme/useTheme';
import { BASEPATH } from '../config';
import {launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid, Platform, Linking } from 'react-native';
import { ActivityIndicator } from 'react-native';

const NewClaimRequestScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [policyMap, setPolicyMap] = useState({});
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [loading, setLoading] = useState(false); 


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

  const [apiData, setApiData] = useState({
    amount: '',
    policyMap: {},
    expense_head: '',  // Main expense category from OCR
    subexpense_head: '',  // Sub expense category from OCR
    date: '',  // Date from OCR
    // other fields from the API as needed
  });
  

  const handleCancel = () => {
    navigation.navigate('Claims');
  };

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
  
  
  // const handleUploadBill = async () => {
  //   const permissionGranted = await requestGalleryPermission();
  
  //   if (!permissionGranted) {
  //     Alert.alert(
  //       'Permission Denied',
  //       'Please enable photo access in settings to upload bills.',
  //       [
  //         { text: 'Cancel', style: 'cancel' },
  //         { text: 'Open Settings', onPress: () => Linking.openSettings() },
  //       ],
  //     );
  //     return;
  //   }
  
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       includeBase64: true,
  //       quality: 0.8,
  //     },
  //     async (response) => {
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //       } else if (response.errorCode) {
  //         console.log('Image Picker Error:', response.errorMessage);
  //         Alert.alert('Error', 'Failed to pick image');
  //       } else {
  //         const base64Image = response.assets?.[0]?.base64;
  
  //         if (base64Image) {
  //           try {
  //             const payload = {
  //               company_id: 'your_company_id',
  //               expense_head: mainCategory, // already set by the user
  //               subexpense_head: subCategory, // already set by the user
  //               document: [`data:image/jpeg;base64,${base64Image}`],
  //             };
  
  //             // Trigger the API to process the image and get data
  //             const apiResponse = await axios.post(
  //               `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator/`,
  //               payload,
  //             );
  
  //             const data = apiResponse.data;
  
  //             setApiData({
  //               amount: data.amount,
  //               expense_head: data.expense_head,
  //               subexpense_head: data.subexpense_head,
  //               date: data.date,
  //             });
            
  //             Alert.alert('Success', 'Image uploaded and data populated');
  //           } catch (err) {
  //             console.error(err);
  //             Alert.alert('Upload failed', 'Please try again later.');
  //           }
  //         }
  //       }
  //     },
  //   );
  // };
  const handleChooseImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error:', response.errorMessage);
          Alert.alert('Error', 'Failed to pick image');
        } else {
          const base64Image = response.assets?.[0]?.base64;
          if (base64Image) {
            setSelectedImage({
              uri: response.assets[0].uri,
              base64: base64Image,
            });
          }
        }
      }
    );
  };
  
  const handleUploadBill = async () => {
    if (!selectedImage) {
      return Alert.alert('No Image Selected', 'Please choose an image before uploading.');
    }
  
    setLoading(true); // Start the loading indicator
  
    const permissionGranted = await requestGalleryPermission();
  
    if (!permissionGranted) {
      Alert.alert(
        'Permission Denied',
        'Please enable photo access in settings to upload the bill.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      setLoading(false); // Stop loading indicator if permission is denied
      return;
    }
  
    try {
      const payload = {
        company_id: 'your_company_id',
        expense_head: mainCategory,
        subexpense_head: subCategory,
        document: [`data:image/jpeg;base64,${selectedImage.base64}`],
      };
  
      // Trigger the API to process the image and get data
      const apiResponse = await axios.post(
        `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator/`,
      );
  
      const data = apiResponse.data;
  
      // Set the extracted data into the state
      setApiData({
        amount: data.amount,
        expense_head: data.expense_head,
        subexpense_head: data.subexpense_head,
        date: data.date,
      });
      
      
      Alert.alert('Success', 'Image uploaded and data populated');
    } catch (err) {
      console.error(err);
      Alert.alert('Upload failed', 'Please try again later.');
    }
  
    setLoading(false); // Stop the loading indicator
  };
  

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const permission = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const alreadyGranted = await PermissionsAndroid.check(permission);
    if (alreadyGranted) return true;

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Photo Access Needed',
      message: 'We need access to your gallery to upload the bill.',
      buttonPositive: 'OK',
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS handles permissions differently
};
const handleSubmit = () => {
  if (!mainCategory || !subCategory || !amount) {
    return Alert.alert("Missing Fields", "Please fill all the fields before submitting.");
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return Alert.alert("Invalid Amount", "Please enter a valid amount greater than 0.");
  }

  navigation.navigate('SubmitClaim');
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
                dropdownIconColor={theme.text}
                onValueChange={(value) => {
                  setMainCategory(value);
                  setSubCategory(null);
                }}>
                <Picker.Item label="Select Main Category" value={null} />
                {mainCategories.map(item => (
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
                  dropdownIconColor={theme.text}
                  onValueChange={setSubCategory}>
                  <Picker.Item label="Select Subcategory" value={null} />
                  {policyMap[mainCategory]?.map((item, index) => (
                    <Picker.Item key={index} label={item.sub_expense_name} value={item.sub_expense_name} />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          

          {subCategory && (
            <View style={[styles.inputGroup, { paddingTop: 10 }]}>
              {/* <Text style={[styles.label, { color: theme.text }]}>Policy Details</Text> */}
              <View style={styles.policyHeader}>
  <Text style={[styles.label, { color: theme.text }]}>View Policy</Text>
  <TouchableOpacity onPress={() => setShowPolicyDetails(!showPolicyDetails)}>
    <Icon
      name={showPolicyDetails ? "eye-off-outline" : "eye-outline"}
      size={20}
      color={theme.text}
    />
  </TouchableOpacity>
</View>

              {showPolicyDetails && (() => {
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
        <View style={styles.row}>
          <View style={[styles.inputGroup,styles.halfInput]}>
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

          <View style={[styles.inputGroup,styles.halfInput]}>
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
          </View>
          
<View style={styles.inputGroup}>
  {/* <Text style={[styles.label, { color: theme.text }]}>Upload Bill</Text>
  <TouchableOpacity 
    style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
    onPress={handleUploadBill}
  >
    <Icon name="cloud-upload-outline" size={24} color={theme.text} />
  </TouchableOpacity> */}
// Image Picker Button (Before Upload)
<TouchableOpacity 
  style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
  onPress={() => handleChooseImage()}>
  <Icon name="image-outline" size={24} color={theme.text} />
  <Text style={[styles.uploadText, { color: theme.text }]}>Choose Image</Text>
</TouchableOpacity>

// If an image is selected, show it
{selectedImage && (
  <View style={styles.selectedImageContainer}>
    <Image 
      source={{ uri: `data:image/jpeg;base64,${selectedImage.base64}` }} 
      style={styles.selectedImage} 
    />
    <Text style={[styles.imageInfo, { color: theme.text }]}>Image Selected</Text>
  </View>
)}

// Upload Button
{selectedImage && !loading && (
  <TouchableOpacity
    style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
    onPress={handleUploadBill}
  >
    <Icon name="cloud-upload-outline" size={24} color={theme.text} />
    <Text style={[styles.uploadText, { color: theme.text }]}>Upload Bill</Text>
  </TouchableOpacity>
)}

// Loading indicator while the API is being called
{loading && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.text} />
    <Text style={[styles.loadingText, { color: theme.text }]}>Uploading...</Text>
  </View>
)}

{apiData.expense_head && (
  <View style={{ padding: 10, backgroundColor: '#f4f4f4', borderRadius: 10, marginVertical: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>Extracted Info (OCR):</Text>
    <Text>Main Expense (OCR): {apiData.expense_head}</Text>
    <Text>Sub Expense (OCR): {apiData.subexpense_head}</Text>
    <Text>Date (OCR): {apiData.date}</Text>
    <Text>Amount (OCR): {apiData.amount}</Text>
  </View>
)}

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
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  formContainer: { 
    padding: 15 
  },
 
  inputGroup: {
     marginBottom: 10,
     },
  label: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 5 
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: { 
    flex: 1,
    height: 50 
  },
  policyContainer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    },
  halfInput: {
    flex: 1,
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
  selectedImageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  imageInfo: {
    fontSize: 14,
    color: '#555',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
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



