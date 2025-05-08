
// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   TextInput,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { BASEPATH } from '../config';
// import DropDownPicker from 'react-native-dropdown-picker';

// const NotificationScreen = ({ navigation }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [allNotifications, setAllNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [dateOpen, setDateOpen] = useState(false);
//   const [statusOpen, setStatusOpen] = useState(false);

//   const [dateValue, setDateValue] = useState('all');
//   const [statusValue, setStatusValue] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const dateItems = [
//     { label: 'Today', value: 'today' },
//     { label: 'All', value: 'all' },
//   ];

//   const statusItems = [
//     { label: 'Approved', value: 'approved' },
//     { label: 'Rejected', value: 'rejected' },
//     { label: 'All', value: 'all' },
//   ];

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const rawNotifications = response.data?.status_claims_notifications || [];

//       const formatted = rawNotifications.map((item) => {
//         const approver = item.approver_name || item.approver_id || 'Someone';
//         const status = item.status_of_approval;
//         const action =
//           status === 'Approved'
//             ? 'approved'
//             : status === 'Rejected'
//             ? 'rejected'
//             : 'updated';

//         return {
//           ...item,
//           message: `${approver} ${action} your claim`,
//         };
//       });

//       setAllNotifications(formatted);
//       setNotifications(formatted);
//     } catch (error) {
//       console.log('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let filtered = [...allNotifications];

//     if (dateValue === 'today') {
//       const today = new Date().toISOString().split('T')[0];
//       filtered = filtered.filter(item => item.submitted_date === today);
//     }

//     if (statusValue && statusValue !== 'all') {
//       filtered = filtered.filter(item => {
//         const cleanStatus = item.status_of_approval?.trim().toLowerCase();
//         return cleanStatus === statusValue.toLowerCase();
//       });
//     }

//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(item =>
//         item.message?.toLowerCase().includes(query) ||
//         item.approver_name?.toLowerCase().includes(query) ||
//         item.status_of_approval?.toLowerCase().includes(query)
//       );
//     }

//     setNotifications(filtered);
//   }, [dateValue, statusValue, searchQuery, allNotifications]);

//   const markAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((notif) =>
//         notif.id === id ? { ...notif, status_read: 'read' } : notif
//       )
//     );
//   };

//   const renderItem = ({ item }) => {
//     const initials = item.approver_name
//       ? item.approver_name
//           .split(' ')
//           .map((n) => n[0])
//           .join('')
//           .toUpperCase()
//       : 'NA';

//     return (
//       <TouchableOpacity
//         style={styles.notificationCard}
//         onPress={() => markAsRead(item.id)}
//       >
//         <View style={styles.row}>
//           <View style={styles.avatarContainer}>
//             {item.approver_image_url ? (
//               <Image source={{ uri: item.approver_image_url }} style={styles.avatar} />
//             ) : (
//               <View style={styles.initialsCircle}>
//                 <Text style={styles.initialsText}>{initials}</Text>
//               </View>
//             )}
//           </View>

//           <View style={styles.messageContainer}>
//             <Text style={styles.mainMessage}>
//               <Text style={styles.boldText}>
//                 {item.approver_name || initials}{' '}
//               </Text>
//               {item.message.replace(`${item.approver_name || initials} `, '')}
//             </Text>
//             <Text style={styles.date}>
//               {item.created_at
//                 ? new Date(item.created_at).toLocaleString('en-GB', {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     hour12: true,
//                     day: '2-digit',
//                     month: 'long',
//                     year: 'numeric',
//                   })
//                 : 'No Date'}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.divider} />
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <TouchableWithoutFeedback
//     onPress={() =>{
//       setDateOpen(false);
//       setStatusOpen(false);
//       Keyboard.dismiss();
//     }}
//     >
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerRow}>
//         <Text style={styles.headerTitle}>Notifications</Text>
//       </View>

//       <View style={styles.searchBar}>
//         <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
//         <TextInput
//           placeholder="Search Notifications"
//           style={styles.searchInput}
//           placeholderTextColor="#888"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       <View style={styles.filterRow}>
//         <View style={styles.dropdownWrapper}>
//           <DropDownPicker
//             open={dateOpen}
//             value={null}
//             items={dateItems}
//             setOpen={setDateOpen}
//             setValue={setDateValue}
//             setItems={() => {}}
//             placeholder="Date"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//           />
//         </View>

//         <View style={styles.dropdownWrapper}>
//           <DropDownPicker
//             open={statusOpen}
//             value={null}
//             items={statusItems}
//             setOpen={setStatusOpen}
//             setValue={setStatusValue}
//             setItems={() => {}}
//             placeholder="Status"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//           />
//         </View>
//       </View>

//       <FlatList
//         data={notifications}
//         keyExtractor={(item, index) =>
//           item.id ? item.id.toString() : index.toString()
//         }
//         renderItem={renderItem}
//         ListEmptyComponent={
//           <View style={{ alignItems: 'center', marginTop: 20 }}>
//             <Text style={{ fontSize: 16, color: 'gray' }}>
//               No notifications found.
//             </Text>
//           </View>
//         }
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     height: 50,
//     backgroundColor: '#fff',
//     width: '100%',
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   dropdownWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   dropdown: {
//     borderColor: '#888',
//     backgroundColor: 'white',
//     minHeight: 40,
//   },
//   dropdownText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   dropdownContainer: {
//     backgroundColor: 'white',
//     borderColor: '#888',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   notificationCard: {
//     paddingVertical: 12,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   avatarContainer: {
//     marginRight: 12,
//   },
//   initialsCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#d8d8d8',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   initialsText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//   },
//   messageContainer: {
//     flex: 1,
//   },
//   mainMessage: {
//     fontSize: 16,
//     color: '#333',
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   date: {
//     marginTop: 4,
//     fontSize: 13,
//     color: '#888',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginTop: 12,
//   },
// });

// export default NotificationScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   TextInput,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { BASEPATH } from '../config';
// import DropDownPicker from 'react-native-dropdown-picker';

// const NotificationScreen = ({ navigation }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [allNotifications, setAllNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [dateOpen, setDateOpen] = useState(false);
//   const [statusOpen, setStatusOpen] = useState(false);

//   const [dateValue, setDateValue] = useState('all');
//   const [statusValue, setStatusValue] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const dateItems = [
//     { label: 'Today', value: 'today' },
//     { label: 'All', value: 'all' },
//   ];

//   const statusItems = [
//     { label: 'Approved', value: 'approved' },
//     { label: 'Rejected', value: 'rejected' },
//     { label: 'All', value: 'all' },
//   ];

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const rawNotifications = response.data?.status_claims_notifications || [];

//       const formatted = rawNotifications.map((item) => {
//         const approver = item.approver_name || item.approver_id || 'Someone';
//         const status = item.status_of_approval;
//         const action =
//           status === 'Approved'
//             ? 'approved'
//             : status === 'Rejected'
//             ? 'rejected'
//             : 'updated';

//         return {
//           ...item,
//           message: `${approver} ${action} your claim`,
//           status_read: 'unread', // Initialize the status as 'unread'
//         };
//       });

//       setAllNotifications(formatted);

//       // Retrieve stored read statuses and update them
//       const storedReadStatuses = await AsyncStorage.getItem('readStatuses');
//       if (storedReadStatuses) {
//         const readStatuses = JSON.parse(storedReadStatuses);
//         const updatedNotifications = formatted.map((notification) => {
//           if (readStatuses.includes(notification.id)) {
//             return { ...notification, status_read: 'read' };
//           }
//           return notification;
//         });
//         setNotifications(updatedNotifications);
//       } else {
//         setNotifications(formatted);
//       }
//     } catch (error) {
//       console.log('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let filtered = [...allNotifications];

//     if (dateValue === 'today') {
//       const today = new Date().toISOString().split('T')[0];
//       filtered = filtered.filter(item => item.submitted_date === today);
//     }

//     if (statusValue && statusValue !== 'all') {
//       filtered = filtered.filter(item => {
//         const cleanStatus = item.status_of_approval?.trim().toLowerCase();
//         return cleanStatus === statusValue.toLowerCase();
//       });
//     }

//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(item =>
//         item.message?.toLowerCase().includes(query) ||
//         item.approver_name?.toLowerCase().includes(query) ||
//         item.status_of_approval?.toLowerCase().includes(query)
//       );
//     }

//     setNotifications(filtered);
//   }, [dateValue, statusValue, searchQuery, allNotifications]);

//   const markAsRead = async (id) => {
//     // Update the notification status in state
//     const updatedNotifications = notifications.map((notif) =>
//       notif.id === id ? { ...notif, status_read: 'read' } : notif
//     );
//     setNotifications(updatedNotifications);

//     // Save the read notification ID to AsyncStorage
//     const readStatuses = await AsyncStorage.getItem('readStatuses');
//     let updatedReadStatuses = readStatuses ? JSON.parse(readStatuses) : [];
//     if (!updatedReadStatuses.includes(id)) {
//       updatedReadStatuses.push(id);
//       await AsyncStorage.setItem('readStatuses', JSON.stringify(updatedReadStatuses));
//     }
//   };

//   const renderItem = ({ item }) => {
//     const initials = item.approver_name
//       ? item.approver_name
//           .split(' ')
//           .map((n) => n[0])
//           .join('')
//           .toUpperCase()
//       : 'NA';

//     return (
//       <TouchableOpacity
//         style={[
//           styles.notificationCard,
//           item.status_read === 'unread' && styles.unreadNotification,
//         ]}
//         onPress={() => markAsRead(item.id)}
//       >
//         <View style={styles.row}>
//           <View style={styles.avatarContainer}>
//             {item.approver_image_url ? (
//               <Image source={{ uri: item.approver_image_url }} style={styles.avatar} />
//             ) : (
//               <View style={styles.initialsCircle}>
//                 <Text style={styles.initialsText}>{initials}</Text>
//               </View>
//             )}
//           </View>

//           <View style={styles.messageContainer}>
//             <Text style={styles.mainMessage}>
//               <Text style={styles.boldText}>
//                 {item.approver_name || initials}{' '}
//               </Text>
//               {item.message.replace(`${item.approver_name || initials} `, '')}
//             </Text>
//             <Text style={styles.date}>
//               {item.created_at
//                 ? new Date(item.created_at).toLocaleString('en-GB', {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     hour12: true,
//                     day: '2-digit',
//                     month: 'long',
//                     year: 'numeric',
//                   })
//                 : 'No Date'}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.divider} />
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <TouchableWithoutFeedback
//       onPress={() => {
//         setDateOpen(false);
//         setStatusOpen(false);
//         Keyboard.dismiss();
//       }}
//     >
//       <SafeAreaView style={styles.container}>
//         <View style={styles.headerRow}>
//           <Text style={styles.headerTitle}>Notifications</Text>
//         </View>

//         <View style={styles.searchBar}>
//           <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
//           <TextInput
//             placeholder="Search Notifications"
//             style={styles.searchInput}
//             placeholderTextColor="#888"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         <View style={styles.filterRow}>
//           <View style={styles.dropdownWrapper}>
//             <DropDownPicker
//               open={dateOpen}
//               value={null}
//               items={dateItems}
//               setOpen={setDateOpen}
//               setValue={setDateValue}
//               setItems={() => {}}
//               placeholder="Date"
//               style={styles.dropdown}
//               textStyle={styles.dropdownText}
//               dropDownContainerStyle={styles.dropdownContainer}
//             />
//           </View>

//           <View style={styles.dropdownWrapper}>
//             <DropDownPicker
//               open={statusOpen}
//               value={null}
//               items={statusItems}
//               setOpen={setStatusOpen}
//               setValue={setStatusValue}
//               setItems={() => {}}
//               placeholder="Status"
//               style={styles.dropdown}
//               textStyle={styles.dropdownText}
//               dropDownContainerStyle={styles.dropdownContainer}
//             />
//           </View>
//         </View>

//         <FlatList
//           data={notifications}
//           keyExtractor={(item, index) =>
//             item.id ? item.id.toString() : index.toString()
//           }
//           renderItem={renderItem}
//           ListEmptyComponent={
//             <View style={{ alignItems: 'center', marginTop: 20 }}>
//               <Text style={{ fontSize: 16, color: 'gray' }}>
//                 No notifications found.
//               </Text>
//             </View>
//           }
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     height: 50,
//     backgroundColor: '#fff',
//     width: '100%',
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   dropdownWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   dropdown: {
//     borderColor: '#888',
//     backgroundColor: 'white',
//     minHeight: 40,
//   },
//   dropdownText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   dropdownContainer: {
//     backgroundColor: 'white',
//     borderColor: '#888',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   notificationCard: {
//     paddingVertical: 12,
//     borderRadius: 8,
//     backgroundColor: '#fff', // Default background for read notifications
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   unreadNotification: {
//     backgroundColor: '#f8f8f8', // Background for unread notifications
//     borderColor: '#007bff',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   avatarContainer: {
//     marginRight: 12,
//   },
//   initialsCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#d8d8d8',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   initialsText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//   },
//   messageContainer: {
//     flex: 1,
//   },
//   mainMessage: {
//     fontSize: 16,
//     color: '#333',
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   date: {
//     marginTop: 4,
//     fontSize: 13,
//     color: '#888',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginTop: 12,
//   },
// });

// export default NotificationScreen;

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASEPATH } from '../config';
import DropDownPicker from 'react-native-dropdown-picker';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [dateValue, setDateValue] = useState('all');
  const [statusValue, setStatusValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dateItems = [
    { label: 'Today', value: 'today' },
    { label: 'All', value: 'all' },
  ];

  const statusItems = [
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'All', value: 'all' },
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');

      if (!emp_id || !company_id) {
        throw new Error('Missing emp_id or company_id in AsyncStorage');
      }

      const response = await axios.get(
        `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
      );

      const rawNotifications = response.data?.status_claims_notifications || [];

      const formatted = rawNotifications.map((item) => {
        const approver = item.approver_name || item.approver_id || 'Someone';
        const status = item.status_of_approval;
        const action =
          status === 'Approved'
            ? 'approved'
            : status === 'Rejected'
            ? 'rejected'
            : 'updated';

        return {
          ...item,
          message: `${approver} ${action} your claim`,
          status_read: 'unread', // Initialize the status as 'unread'
        };
      });

      setAllNotifications(formatted);

      // Retrieve stored read statuses and update them
      const storedReadStatuses = await AsyncStorage.getItem('readStatuses');
      if (storedReadStatuses) {
        const readStatuses = JSON.parse(storedReadStatuses);
        const updatedNotifications = formatted.map((notification) => {
          if (readStatuses.includes(notification.id)) {
            return { ...notification, status_read: 'read' };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      } else {
        setNotifications(formatted);
      }
    } catch (error) {
      console.log('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...allNotifications];

    if (dateValue === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(item => item.submitted_date === today);
    }

    if (statusValue && statusValue !== 'all') {
      filtered = filtered.filter(item => {
        const cleanStatus = item.status_of_approval?.trim().toLowerCase();
        return cleanStatus === statusValue.toLowerCase();
      });
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.message?.toLowerCase().includes(query) ||
        item.approver_name?.toLowerCase().includes(query) ||
        item.status_of_approval?.toLowerCase().includes(query)
      );
    }

    setNotifications(filtered);
  }, [dateValue, statusValue, searchQuery, allNotifications]);

  const markAsRead = async (id) => {
    // Update the notification status in state
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, status_read: 'read' } : notif
    );
    setNotifications(updatedNotifications);

    // Save the read notification ID to AsyncStorage
    const readStatuses = await AsyncStorage.getItem('readStatuses');
    let updatedReadStatuses = readStatuses ? JSON.parse(readStatuses) : [];
    
    // Only add to readStatuses if it's not already added
    if (!updatedReadStatuses.includes(id)) {
      updatedReadStatuses.push(id);
      await AsyncStorage.setItem('readStatuses', JSON.stringify(updatedReadStatuses));
    }
  };

  const renderItem = ({ item }) => {
    const initials = item.approver_name
      ? item.approver_name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'NA';

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          item.status_read === 'unread' && styles.unreadNotification,
        ]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.row}>
          <View style={styles.avatarContainer}>
            {item.approver_image_url ? (
              <Image source={{ uri: item.approver_image_url }} style={styles.avatar} />
            ) : (
              <View style={styles.initialsCircle}>
                <Text style={styles.initialsText}>{initials}</Text>
              </View>
            )}
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.mainMessage}>
              <Text style={styles.boldText}>
                {item.approver_name || initials}{' '}
              </Text>
              {item.message.replace(`${item.approver_name || initials} `, '')}
            </Text>
            <Text style={styles.date}>
              {item.created_at
                ? new Date(item.created_at).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'No Date'}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDateOpen(false);
        setStatusOpen(false);
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search Notifications"
            style={styles.searchInput}
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={dateOpen}
              value={null}
              items={dateItems}
              setOpen={setDateOpen}
              setValue={setDateValue}
              setItems={() => {}}
              placeholder="Date"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={statusOpen}
              value={null}
              items={statusItems}
              setOpen={setStatusOpen}
              setValue={setStatusValue}
              setItems={() => {}}
              placeholder="Status"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>

        <FlatList
          data={notifications}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}>
                No notifications found.
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdown: {
    borderColor: '#888',
    backgroundColor: 'white',
    minHeight: 40,
  },
  dropdownText: {
    color: 'black',
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderColor: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationCard: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff', // Default background for read notifications
    borderWidth: 1,
    borderColor: '#ccc',
  },
  unreadNotification: {
    backgroundColor: '#f8f8f8', // Background for unread notifications
    borderColor: '#007bff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 12,
  },
  initialsCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#d8d8d8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  messageContainer: {
    flex: 1,
  },
  mainMessage: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 12,
  },
});

export default NotificationScreen;
