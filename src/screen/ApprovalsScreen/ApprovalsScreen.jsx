// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useTheme } from '../../theme/useTheme';  

// const ApprovalsScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   //const [approvals, setApprovals] = useState(allApprovals);
//   const [searchQuery, setSearchQuery] = useState('');
 
//   const[dateOpen, setDateOpen] = useState(false);
//   const[statusOpen, setStatusOpen] = useState(false);
//   const[amountOpen, setAmountOpen] = useState(false);

//   const[dateValue, setDateValue] = useState(null);
//   const[statusValue, setStatusValue] = useState(null);
//   const[amountValue, setAmountValue] = useState(null);
  
//   const dateItems = [
//     {label:"Today", value:'today'},
//     {label:'All', value:'all'},
//   ];
//   const statusItems =[
//     {label:'Approved', value:'approved'},
//     {label:'Pending', value:'pending'},
//     {label:'Rejected', value:'rejected'},
//     {label:'All', value:'all'}
//   ];
//   const amountItems = [
//     {label:'> 1000', value:'1000'},
//     {label:'> 5000', value:'5000'},
//     {label:'> 10000', value: '10000'},
//     {label:'All', value: 'all'}
//   ]

//   // const handleSearch = (text) => {
//   //   setSearchQuery(text);
//   //   const filtered = allApprovals.filter(item =>
//   //     item.category.toLowerCase().includes(text.toLowerCase())
//   //   );
//   //   setClaims(filtered);
//   // };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
//         <TouchableOpacity>
//           <Icon name="notifications-outline" size={24} color={theme.text} />
//         </TouchableOpacity>
//       </View>

//         <View style={styles.searchContainer}>
//           <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             style={[styles.searchInput, { color: theme.text }]}
//             placeholder="Search Claims"
//             value={searchQuery}
//             // onChangeText={handleSearch}
//             placeholderTextColor={theme.text}
//           />
//         </View>
        
      

//       <View style={styles.segmentContainer}>
//         <TouchableOpacity style={styles.segmentButton}>
//           <Text style={[styles.segmentText, { color: theme.text }]}>Date</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.segmentButton}>
//           <Text style={[styles.segmentText, { color: theme.text }]}>status</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.segmentButton}>
//           <Text style={[styles.segmentText, { color: theme.text }]}>Amount</Text>
//         </TouchableOpacity>
//       </View>

      


//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   claimItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//   },
//   checkbox: {
//     marginRight: 10,
//   },
//   claimContent: {
//     flex: 1,
//   },
//   claimHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   searchBar: {
//     flexDirection: 'row',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginLeft:20,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//   },
//   filterButton: {
//     padding: 10,
//   },
//   filterContainer: {
//     borderColor: '#7E8356',
//     backgroundColor: '#f9f9e0',
//     borderWidth: 1,
//     borderRadius: 5,
//     height: 50,
//   },
//   segmentContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//   },
//   segmentButton: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 10,
//   },
//   segmentText: {
//     color: '#666',
//   },
//   claimsList: {
//     flex: 1,
//     padding: 10,
//   },
//   categoryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//   },
//   statusText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//   },
//   dateText: {
//     color: '#666',
//     marginTop: 5,
//   },
//   amountText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   addClaimButton: {
//     backgroundColor: '#7E8356',
//     padding: 15,
//     margin: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   addClaimText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });

// export default ApprovalsScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { Checkbox, Button, Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTheme } from '../../theme/useTheme';

// export default function ApprovalScreen() {
//   const { theme } = useTheme();
//   const [query, setQuery] = useState('');
//   const [approvals, setApprovals] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchApprovals();
//   }, []);

//   const fetchApprovals = async () => {
//     setLoading(true);
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const data = response?.data?.approval_claim_data?.approval_hiery_data || [];
//       const pendingApprovals = data.filter(item =>
//         item.status_of_approval?.toLowerCase() === 'pending'
//       );

//       setApprovals(pendingApprovals);
//       console.log('Pending Approvals:', pendingApprovals);
//     } catch (error) {
//       console.error('Axios Error:', error);
//       Alert.alert('Error', 'Failed to fetch approval data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = text => {
//     setQuery(text);
//     setSearch(text); 
//   };

//   const toggleSelect = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleAction = async (actionType) => {
//     console.log('handleAction triggered with:', actionType);
//     if (selectedItems.length === 0) {
//       Alert.alert("No items selected", "Please select at least one claim.");
//       return;
//     }

//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');
//       const now = new Date().toISOString();

//       const updateApprovals = approvals
//         .filter((item) => selectedItems.includes(item.claim_id))
//         .map((item) => {
//           const update = {
//             company_id,
//             claim_id: item.claim_id,
//             policy_id: item.policy_id,
//             emp_id: item.emp_id,
//             levels: item.levels,
//             approver_id: emp_id,
//             status_of_approval: actionType === 'approve' ? 'Approved' : 'Rejected',
//             approved_at: actionType === 'approve' ? now : null,
//             rejected_at: actionType === 'reject' ? now : null,
//             rejected_reason: actionType === 'reject' ? 'Rejected by approver' : null,
//           };

//           if (item.advance_id != null) update.advance_id = item.advance_id;
//           if (item.advance_amount != null) update.advance_amount = item.advance_amount;

//           return update;
//         });

//       const response = await axios.patch(
//         `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`,
//         { update_approvals: updateApprovals },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data.status === 'success') {
//         const updatedApprovalsList = approvals.filter(
//           item => !selectedItems.includes(item.claim_id)
//         );
//         setApprovals(updatedApprovalsList);
//         setSelectedItems([]);
//         Alert.alert('Success', 'Approval status updated successfully');
//       } else {
//         Alert.alert("Failed", `Unable to ${actionType} claims.`);
//       }
//     } catch (error) {
//       console.error(`${actionType} error:`, error);
//       Alert.alert("Error", `Something went wrong during ${actionType}.`);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Checkbox
//           status={selectedItems.includes(item.claim_id) ? 'checked' : 'unchecked'}
//           onPress={() => toggleSelect(item.claim_id)}
//         />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.empName}>{item.emp_name || 'Unknown User'}</Text>
//           <Text style={styles.claimCode}>Claim ID: {item.claim_id}</Text>
//           <Text style={styles.expenseText}>
//             <Text style={{ fontWeight: 'bold' }}>{item.expense_head_name}</Text> - {item.sub_expense_head_name}
//           </Text>
//         </View>
//         <View style={styles.rightContent}>
//           <Text style={styles.amount}>
//             INR. {item.documents?.[0]?.ocr_amount?.toFixed(2) ?? '0.00'}
//           </Text>
//           <Text style={styles.date}>
//             {item.created_at
//               ? new Date(item.created_at).toLocaleDateString()
//               : 'No Date'}
//           </Text>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
//         <TouchableOpacity>
//           <Icon name="notifications-outline" size={24} color={theme.text} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <TextInput
//           style={[styles.searchInput, { color: theme.text }]}
//           placeholder="Search Approvals"
//           placeholderTextColor="#888"
//           value={query}
//           onChangeText={handleSearch}
//         />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={approvals.filter(item =>
//             (item.emp_name || '').toLowerCase().includes(search.toLowerCase())
//           )}
//           renderItem={renderItem}
//           keyExtractor={(item, index) =>
//             item?.policy_detail_id ? item.policy_detail_id.toString() : index.toString()
//           }
//           contentContainerStyle={{ paddingBottom: 80 }}
//         />
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.rejectButton, { borderColor: theme.borderColor }]}
//           onPress={() => handleAction('reject')}
//         >
//           <Text style={[styles.rejectButtonText, { color: theme.text }]}>Reject</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.approveButton, { backgroundColor: theme.buttonBg }]}
//           onPress={() => handleAction('approve')}
//         >
//           <Text style={[styles.approveButtonText, { color: theme.buttonTextColor }]}>Approve</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: { 
//     fontSize: 20, 
//     fontWeight: 'bold' 
//   },
//   searchBar: { 
//     flexDirection: 'row' 
//   },
//   searchInput: {
//      flex: 1, 
//      height: 50, 
//      paddingHorizontal: 10, 
//      borderWidth: 1, 
//      borderColor: '#ccc', 
//      margin: 10, 
//      borderRadius: 10 
//     },
//   filterButton: {
//     padding: 10,
//     marginLeft: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   card: {
//     marginVertical: 5,
//     padding: 10,
//     backgroundColor: '#fafafa',
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   empName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   claimCode: {
//     fontSize: 12,
//     color: '#999',
//   },
//   expenseText: {
//     fontSize: 13,
//     color: '#555',
//   },
//   rightContent: {
//     alignItems: 'flex-end',
//     marginLeft: 10,
//   },
//   amount: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#444',
//   },
//   date: {
//     fontSize: 12,
//     color: '#aaa',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: '40%',
//   },
//   rejectButton: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'black',
    
//   },
//   rejectButtonText: {
//      color: '#333', 
//      fontWeight: '500'
//      },
//   approveButton: {
//     flex: 1,
//     backgroundColor: '#7E8356',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
    
//   },
//   approveButtonText: { color: '#fff', fontWeight: '500' },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { Checkbox, Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTheme } from '../../theme/useTheme';

// export default function ApprovalScreen() {
//   const { theme } = useTheme();
//   const [query, setQuery] = useState('');
//   const [approvals, setApprovals] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchApprovals();
//   }, []);

//   const fetchApprovals = async () => {
//     setLoading(true);
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const data = response?.data?.approval_claim_data?.approval_hiery_data || [];
//       const pendingApprovals = data.filter(item =>
//         item.status_of_approval?.toLowerCase() === 'pending'
//       );

//       setApprovals(pendingApprovals);
//       console.log('Pending Approvals:', pendingApprovals);
//     } catch (error) {
//       console.error('Axios Error:', error);
//       Alert.alert('Error', 'Failed to fetch approval data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (text) => {
//     setQuery(text);
//     setSearch(text); 
//   };

//   // const toggleSelect = (id) => {
//   //   console.log('Selected Items Before Toggle:', selectedItems);  // Log before change
//   //   setSelectedItems((prev) =>
//   //     prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//   //   );
//   //   console.log('Selected Items After Toggle:', selectedItems);  // Log after change
//   // };
//   const toggleSelect = (id) => {
//     console.log('Selected Items Before Toggle:', selectedItems);  // Log before state change
//     setSelectedItems(prevSelectedItems => {
//       const updatedItems = prevSelectedItems.includes(id)
//         ? prevSelectedItems.filter((item) => item !== id)
//         : [...prevSelectedItems, id];
//       console.log('Selected Items After Toggle:', updatedItems);  // Log updated state here
//       return updatedItems;
//     });
//   };
  
//   // const handleAction = async (actionType) => {
//   //   console.log(`Button ${actionType} clicked!`); // Log to check if button press works
//   //   if (selectedItems.length === 0) {
//   //     Alert.alert("No items selected", "Please select at least one claim.");
//   //     return;
//   //   }

//   //   try {
//   //     const emp_id = await AsyncStorage.getItem('username');
//   //     const company_id = await AsyncStorage.getItem('companyname');
//   //     const now = new Date().toISOString();

//   //     const updateApprovals = approvals
//   //       .filter((item) => selectedItems.includes(item.claim_id))
//   //       .map((item) => {
//   //         const update = {
//   //           company_id,
//   //           claim_id: item.claim_id,
//   //           policy_id: item.policy_id,
//   //           emp_id: item.emp_id,
//   //           levels: item.levels,
//   //           approver_id: emp_id,
//   //           status_of_approval: actionType === 'approve' ? 'Approved' : 'Rejected',
//   //           approved_at: actionType === 'approve' ? now : null,
//   //           rejected_at: actionType === 'reject' ? now : null,
//   //           rejected_reason: actionType === 'reject' ? 'Rejected by approver' : null,
//   //         };

//   //         if (item.advance_id != null) update.advance_id = item.advance_id;
//   //         if (item.advance_amount != null) update.advance_amount = item.advance_amount;

//   //         return update;
//   //       });

//   //     const response = await axios.patch(
//   //       `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`,
//   //       { update_approvals: updateApprovals },
//   //       { headers: { 'Content-Type': 'application/json' } }
//   //     );

//   //     if (response.data.status === 'success') {
//   //       const updatedApprovalsList = approvals.filter(
//   //         item => !selectedItems.includes(item.claim_id)
//   //       );
//   //       setApprovals(updatedApprovalsList);
//   //       setSelectedItems([]);
//   //       Alert.alert('Success', 'Approval status updated successfully');
//   //     } else {
//   //       Alert.alert("Failed", `Unable to ${actionType} claims.`);
//   //     }
//   //   } catch (error) {
//   //     console.error(`${actionType} error:`, error);
//   //     Alert.alert("Error", `Something went wrong during ${actionType}.`);
//   //   }
//   // };

//   const handleAction = async (actionType) => {
//     console.log('handleAction triggered with:', actionType);
    
//     if (selectedItems.length === 0) {
//       Alert.alert("No items selected", "Please select at least one claim.");
//       return;
//     }
  
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');
//       const now = new Date().toISOString();
  
//       const updateApprovals = approvals
//         .filter((item) => selectedItems.includes(item.claim_id))
//         .map((item) => {
//           const update = {
//             company_id,
//             claim_id: item.claim_id,
//             policy_id: item.policy_id,
//             emp_id: item.emp_id,
//             levels: item.levels,
//             approver_id: emp_id,
//             status_of_approval: actionType === 'approve' ? 'Approved' : 'Rejected',
//             approved_at: actionType === 'approve' ? now : null,
//             rejected_at: actionType === 'reject' ? now : null,
//             rejected_reason: actionType === 'reject' ? 'Rejected by approver' : null,
//           };
  
//           if (item.advance_id != null) update.advance_id = item.advance_id;
//           if (item.advance_amount != null) update.advance_amount = item.advance_amount;
  
//           return update;
//         });
  
//       const response = await axios.patch(
//         `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`,
//         { update_approvals: updateApprovals },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
  
//       if (response.data.status === 'success') {
//         const updatedApprovalsList = approvals.filter(
//           item => !selectedItems.includes(item.claim_id)
//         );
//         setApprovals(updatedApprovalsList);
//         setSelectedItems([]);
//         Alert.alert('Success', 'Approval status updated successfully');
//       } else {
//         Alert.alert("Failed", `Unable to ${actionType} claims.`);
//       }
//     } catch (error) {
//       console.error(`${actionType} error:`, error);
//       Alert.alert("Error", `Something went wrong during ${actionType}.`);
//     }
//   };
  

//   const renderItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Checkbox
//           status={selectedItems.includes(item.claim_id) ? 'checked' : 'unchecked'}
//           onPress={() => toggleSelect(item.claim_id)}
//         />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.empName}>{item.emp_name || 'Unknown User'}</Text>
//           <Text style={styles.claimCode}>Claim ID: {item.claim_id}</Text>
//           <Text style={styles.expenseText}>
//             <Text style={{ fontWeight: 'bold' }}>{item.expense_head_name}</Text> - {item.sub_expense_head_name}
//           </Text>
//         </View>
//         <View style={styles.rightContent}>
//           <Text style={styles.amount}>
//             INR. {item.documents?.[0]?.ocr_amount?.toFixed(2) ?? '0.00'}
//           </Text>
//           <Text style={styles.date}>
//             {item.created_at
//               ? new Date(item.created_at).toLocaleDateString()
//               : 'No Date'}
//           </Text>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
//         <TouchableOpacity>
//           <Icon name="notifications-outline" size={24} color={theme.text} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <TextInput
//           style={[styles.searchInput, { color: theme.text }]}
//           placeholder="Search Approvals"
//           placeholderTextColor="#888"
//           value={query}
//           onChangeText={handleSearch}
//         />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
//       ) : approvals.length === 0 ? (
//         <Text>No approvals available.</Text>
//       ) : (
//         <FlatList
//           data={approvals.filter(item =>
//             (item.emp_name || '').toLowerCase().includes(search.toLowerCase())
//           )}
//           renderItem={renderItem}
//           keyExtractor={(item, index) =>
//             item?.policy_detail_id ? item.policy_detail_id.toString() : index.toString()
//           }
//           contentContainerStyle={{ paddingBottom: 80 }}
//         />
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.rejectButton, { borderColor: theme.borderColor }]}
//           onPress={() => handleAction('reject')}
//         >
//           <Text style={[styles.rejectButtonText, { color: theme.text }]}>Reject</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.approveButton, { backgroundColor: theme.buttonBg || '#7E8356' }]}
//           onPress={() => handleAction('approve')}
//         >
//           <Text style={[styles.approveButtonText, { color: theme.buttonTextColor || '#fff' }]}>Approve</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { Checkbox, Button, Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTheme } from '../../theme/useTheme';
// import { useFocusEffect } from '@react-navigation/native';

// export default function ApprovalScreen() {
//   const { theme } = useTheme();
//   const [query, setQuery] = useState('');
//   const [approvals, setApprovals] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchApprovals();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       fetchApprovals(); // Re-fetch data when the screen comes into focus
//     }, [])
//   );

//   const fetchApprovals = async () => {
//     setLoading(true);
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const data = response?.data?.approval_claim_data?.approval_hiery_data || [];
//       // const pendingApprovals = data.filter(item =>
//       //   item.status_of_approval?.toLowerCase() === 'pending'
//       // );
//       const pendingApprovals = data.filter(item => {
//         console.log(`Claim ID: ${item.claim_id}, Status: ${item.status_of_approval}`);
//         return item.status_of_approval?.toLowerCase() === 'pending';
//       });
//       setApprovals(pendingApprovals);
//       console.log('Pending Approvals:', pendingApprovals);
//     } catch (error) {
//       console.error('Axios Error:', error);
//       Alert.alert('Error', 'Failed to fetch approval data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = text => {
//     setQuery(text);
//     setSearch(text); 
//   };

//   const toggleSelect = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleAction = async (actionType) => {
//     console.log('handleAction triggered with:', actionType);
//     if (selectedItems.length === 0) {
//       Alert.alert("No items selected", "Please select at least one claim.");
//       return;
//     }

//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');
//       const now = new Date().toISOString();

//       const updateApprovals = approvals
//         .filter((item) => selectedItems.includes(item.claim_id))
//         .map((item) => {
//           const update = {
//             company_id,
//             claim_id: item.claim_id,
//             policy_id: item.policy_id,
//             emp_id: item.emp_id,
//             levels: item.levels,
//             approver_id: emp_id,
//             status_of_approval: actionType === 'approve' ? 'Approved' : 'Rejected',
//             approved_at: actionType === 'approve' ? now : null,
//             rejected_at: actionType === 'reject' ? now : null,
//             rejected_reason: actionType === 'reject' ? 'Rejected by approver' : null,
//           };

//           if (item.advance_id != null) update.advance_id = item.advance_id;
//           if (item.advance_amount != null) update.advance_amount = item.advance_amount;

//           return update;
//         });

//       const response = await axios.patch(
//         `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`,
//         { update_approvals: updateApprovals },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       console.log("Approval update response:", response.data);

//       if (response.data.status === 'success') {
//         // Re-fetch the approvals data
//         await fetchApprovals();
//         setSelectedItems([]); // Clear selected items
//         Alert.alert('Success', 'Approval status updated successfully');
//       } else {
//         Alert.alert("Failed", `Unable to approve claims.`);
//       }
//     } catch (error) {
//       console.error(`${actionType} error:`, error);
//       Alert.alert("Error", `Something went wrong during ${actionType}.`);
//     }
//   };
  
  
//   const renderItem = ({ item }) => (
//     <Card style={styles.card}>
//       <View style={styles.cardContent}>
//         <Checkbox
//           status={selectedItems.includes(item.claim_id) ? 'checked' : 'unchecked'}
//           onPress={() => toggleSelect(item.claim_id)}
//         />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.empName}>{item.emp_name || 'Unknown User'}</Text>
//           <Text style={styles.claimCode}>Claim ID: {item.claim_id}</Text>
//           <Text style={styles.expenseText}>
//             <Text style={{ fontWeight: 'bold' }}>{item.expense_head_name}</Text> - {item.sub_expense_head_name}
//           </Text>
//         </View>
//         <View style={styles.rightContent}>
//           <Text style={styles.amount}>
//             INR. {item.documents?.[0]?.ocr_amount?.toFixed(2) ?? '0.00'}
//           </Text>
//           <Text style={styles.date}>
//             {item.created_at
//               ? new Date(item.created_at).toLocaleDateString()
//               : 'No Date'}
//           </Text>
//         </View>
//       </View>
//     </Card>
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
//         <TouchableOpacity>
//           <Icon name="notifications-outline" size={24} color={theme.text} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <TextInput
//           style={[styles.searchInput, { color: theme.text }]}
//           placeholder="Search Approvals"
//           placeholderTextColor="#888"
//           value={query}
//           onChangeText={handleSearch}
//         />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={approvals.filter(item =>
//             (item.emp_name || '').toLowerCase().includes(search.toLowerCase())
//           )}
//           renderItem={renderItem}
//           keyExtractor={(item, index) =>
//             item?.policy_detail_id ? item.policy_detail_id.toString() : index.toString()
//           }
//           contentContainerStyle={{ paddingBottom: 80 }}
//         />
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.rejectButton, { borderColor: theme.borderColor }]}
//           onPress={() => handleAction('reject')}
//         >
//           <Text style={[styles.rejectButtonText, { color: theme.text }]}>Reject</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.approveButton, { backgroundColor: theme.buttonBg }]}
//           onPress={() => handleAction('approve')}
//         >
//           <Text style={[styles.approveButtonText, { color: theme.buttonTextColor }]}>Approve</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: { 
//     fontSize: 20, 
//     fontWeight: 'bold' 
//   },
//   searchBar: { 
//     flexDirection: 'row' 
//   },
//   searchInput: {
//      flex: 1, 
//      height: 50, 
//      paddingHorizontal: 10, 
//      borderWidth: 1, 
//      borderColor: '#ccc', 
//      margin: 10, 
//      borderRadius: 10 
//     },
//   filterButton: {
//     padding: 10,
//     marginLeft: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   card: {
//     marginVertical: 5,
//     padding: 10,
//     backgroundColor: '#fafafa',
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   empName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   claimCode: {
//     fontSize: 12,
//     color: '#999',
//   },
//   expenseText: {
//     fontSize: 13,
//     color: '#555',
//   },
//   rightContent: {
//     alignItems: 'flex-end',
//     marginLeft: 10,
//   },
//   amount: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#444',
//   },
//   date: {
//     fontSize: 12,
//     color: '#aaa',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: '40%',
//   },
//   rejectButton: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//   },
//   rejectButtonText: {
//     color: '#333', 
//     fontWeight: '500',
//   },
//   approveButton: {
//     flex: 1,
//     backgroundColor: '#7E8356',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   approveButtonText: { color: '#fff', fontWeight: '500' },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Checkbox, Card, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASEPATH } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/useTheme';
import { useFocusEffect } from '@react-navigation/native';

export default function ApprovalScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [approvals, setApprovals] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovals();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchApprovals();
    }, [])
  );

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');
      const response = await axios.get(
        `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
      );
      const data = response?.data?.approval_claim_data?.approval_hiery_data || [];
      const pendingApprovals = data.filter(item =>
        item.status_of_approval?.toLowerCase() === 'pending'
      );
      setApprovals(pendingApprovals);
    } catch (error) {
      console.error('Axios Error:', error);
      Alert.alert('Error', 'Failed to fetch approval data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = text => {
    setQuery(text);
    setSearch(text);
  };

  const toggleSelect = id => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAction = async actionType => {
    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Please select at least one claim.');
      return;
    }
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');
      const now = new Date().toISOString();
      const updateApprovals = approvals
        .filter(item => selectedItems.includes(item.claim_id))
        .map(item => ({
          company_id,
          claim_id: item.claim_id,
          policy_id: item.policy_id,
          emp_id: item.emp_id,
          levels: item.levels,
          approver_id: emp_id,
          status_of_approval: actionType === 'approve' ? 'Approved' : 'Rejected',
          approved_at: actionType === 'approve' ? now : null,
          rejected_at: actionType === 'reject' ? now : null,
          rejected_reason: actionType === 'reject' ? 'Rejected by approver' : null,
          ...(item.advance_id && { advance_id: item.advance_id }),
          ...(item.advance_amount && { advance_amount: item.advance_amount }),
        }));
      const response = await axios.patch(
        `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`,
        { update_approvals: updateApprovals },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.status === 'success') {
        await fetchApprovals();
        setSelectedItems([]);
        Alert.alert('Success', 'Approval status updated successfully');
      } else {
        Alert.alert('Failed', 'Unable to approve claims.');
      }
    } catch (error) {
      console.error(`${actionType} error:`, error);
      Alert.alert('Error', `Something went wrong during ${actionType}.`);
    }
  };

  // const renderItem = ({ item }) => (
  //   <Card style={styles.card}>
  //     <View style={styles.cardContent}>
  //       <Checkbox
  //         status={selectedItems.includes(item.claim_id) ? 'checked' : 'unchecked'}
  //         onPress={() => toggleSelect(item.claim_id)}
  //       />
  //       <View style={{ flex: 1 }}>
  //         <Text style={styles.empName}>{item.emp_name || 'Unknown User'}</Text>
  //         <Text style={styles.claimCode}>{item.claim_id}</Text>
  //         <Text style={styles.expenseText}>
  //           <Text style={{ fontWeight: 'bold' }}>{item.expense_head_name}</Text> - {item.sub_expense_head_name}
  //         </Text>
  //       </View>
  //       <View style={styles.rightContent}>
  //         <Text style={styles.amount}>INR. {item.documents?.[0]?.ocr_amount?.toFixed(2) ?? '0.00'}</Text>
  //         <Text style={styles.date}>
  //           {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'No Date'}
  //         </Text>
  //       </View>
  //     </View>
  //   </Card>
  // );
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Checkbox
          status={selectedItems.includes(item.claim_id) ? 'checked' : 'unchecked'}
          onPress={() => toggleSelect(item.claim_id)}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.empName}>{item.emp_name || 'Unknown User'}</Text>
          <Text style={styles.claimCode}>{item.claim_id}</Text>
          <Text style={styles.expenseText}>
            <Text style={styles.expenseHead}>{item.expense_head_name}</Text>
            {item.sub_expense_head_name ? ` - ${item.sub_expense_head_name}` : ''}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.amount}>
            INR. {item.documents?.[0]?.ocr_amount?.toFixed(2) ?? '0.00'}
          </Text>
          <Text style={styles.date}>
            {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'No Date'}
          </Text>
        </View>
      </View>
    </Card>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top header with bell + badge */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
        <View>
          <Icon name="notifications-outline" size={24} color={theme.text} />
          <Badge style={styles.badge}>4</Badge>
        </View>
      </View>

      {/* Search + filter */}
      <View style={styles.searchBar}>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search Employee"
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-outline" size={24} color="#7E8356" />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <View style={styles.filterChips}>
        {['Today', 'Approved', 'Fixed', 'Amount'].map(chip => (
          <TouchableOpacity key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={approvals.filter(item =>
            (item.emp_name || '').toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={renderItem}
          keyExtractor={item => item.claim_id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleAction('reject')}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleAction('approve')}
        >
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom tab */}
      <View style={styles.bottomTab}>
        <Icon name="home-outline" size={24} color="#888" />
        <Icon name="document-text-outline" size={24} color="#888" />
        <Icon name="checkmark-done-outline" size={24} color="#7E8356" />
        <Icon name="person-outline" size={24} color="#888" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  filterChips: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  chipText: { fontSize: 12, color: '#333' },
  
  
    card: {
      marginVertical: 8,
      padding: 12,
      backgroundColor: '#fff',
      borderRadius: 12,
      elevation: 2,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    empName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    claimCode: {
      fontSize: 12,
      color: '#aaa',
      marginBottom: 4,
    },
    expenseText: {
      fontSize: 14,
      color: '#555',
    },
    expenseHead: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#333',
    },
    rightContent: {
      alignItems: 'flex-end',
      marginLeft: 10,
    },
    amount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    date: {
      fontSize: 12,
      color: '#999',
    },
    approveButton: {
      flex: 1,
      backgroundColor: '#7E8356',
      padding: 14,
      alignItems: 'center',
      borderRadius: 12,
      marginLeft: 8,
    },
    rejectButton: {
      flex: 1,
      padding: 14,
      alignItems: 'center',
      borderRadius: 12,
      marginRight: 8,
      borderWidth: 1,
      borderColor: '#7E8356',
    },
    approveButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    rejectButtonText: {
      color: '#7E8356',
      fontWeight: '600',
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    
    bottomTab: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#ccc',
    },
  });
  
  
  
  
  
  

