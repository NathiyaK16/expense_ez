

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
// import { useTheme } from '../../theme/useTheme';
// import { BASEPATH } from '../config';

// const ClaimsScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [claims, setClaims] = useState([]);
//   const [allClaims, setAllClaims] = useState([]);
//   const [query, setQuery] = useState('');
//   const [expenseHeads, setExpenseHeads] = useState([]);
//   const [subExpenseHeads, setSubExpenseHeads] = useState([]);


//   const [dateOpen, setDateOpen] = useState(false);
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [amountOpen, setAmountOpen] = useState(false);

//   const [dateValue, setDateValue] = useState(null);
//   const [statusValue, setStatusValue] = useState(null);
//   const [amountValue, setAmountValue] = useState(null);

//   const dateItems = [
//     { label: 'Today', value: 'today' },
//     { label: 'All', value: 'all' },
//   ];
//   const statusItems = [
//     { label: 'Approved', value: 'approved' },
//     { label: 'Pending', value: 'pending' },
//     { label: 'Rejected', value: 'rejected' },
//     { label: 'All', value: 'all' },
//   ];
//   const amountItems = [
//     { label: 'More than 1000', value: 1000 },
//     { label: 'More than 5000', value: 5000 },
//     { label: 'More than 10000', value: 10000 },
//     { label: 'All', value: 'all' },
//   ];

//   const fetchClaims = async () => {
//     try {
//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=EMP002&company_id=durr`
//       );
//       setClaims(response.data.claims);
//       setAllClaims(response.data.claims);
//     } catch (error) {
//       console.error('Error fetching claims:', error);
//     }
//   };
 
//   useEffect(() => {
//     fetchClaims();
    
//   }, []);
  
//   useEffect(() => {
//     let filtered = allClaims;

//     if (dateValue === 'today') {
//       const today = new Date().toISOString().split('T')[0];
//       filtered = filtered.filter(item => item.submitted_date === today);
//     }

//     if (statusValue && statusValue !== 'all') {
//       filtered = filtered.filter(
//         item => item.status_of_approval?.toLowerCase() === statusValue.toLowerCase()
//       );
//     }

//     if (amountValue && amountValue !== 'all') {
//       filtered = filtered.filter(item => {
//         const amount = item.documents?.[0]?.entered_amount || 0;
//         return amount > amountValue;
//       });
//     }

//     setClaims(filtered);
//   }, [dateValue, statusValue, amountValue]);

//   const handleSearch = text => {
//     setQuery(text);
//     const filtered = allClaims.filter(item =>
//       item.descriptions?.toLowerCase().includes(text.toLowerCase())
//     );
//     setClaims(filtered);
//   };

//   const getStatusColor = status => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return '#219e4f';
//       case 'pending':
//         return '#7d421e';
//       case 'rejected':
//         return '#F44336';
//       default:
//         return '#9E9E9E';
//     }
//   };

//   const renderClaim = ({ item }) => {
//     const document = item.documents?.[0];

//     // Function to render a value, showing 'N/A' if it's null
//     const renderValue = value => (value ? value : 'N/A');

//     // Function to handle the navigation to ClaimDetailScreen
//     const handleClaimPress = () => {
//       navigation.navigate('ClaimDetailScreen', { claim: item });
//     };

//     return (
//       <TouchableOpacity
//         style={[styles.claimItem, { backgroundColor: theme.cardBg }]}
//         onPress={handleClaimPress}>
//         <View style={styles.claimContent}>
//           <View style={styles.claimHeader}>
//             <Text style={[styles.categoryText, { color: theme.text }]}>
//               Claim #{item.claim_id}
//             </Text>
//             <View
//               style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_of_approval) }]}>
//               <Text style={styles.statusText}>{renderValue(item.status_of_approval)}</Text>
//             </View>
//           </View>
//           <Text style={{ color: theme.text }}>
//             Main Category: {renderValue(item.expense_head)}
//           </Text>

//           <Text style={{ color: theme.text }}>
//             Sub Category: {renderValue(item.subexpense_head)}
//           </Text>
          
//           <Text style={[styles.dateText, { color: theme.text }]}>
//             {renderValue(item.submitted_date)}
//           </Text>
//           {/* <Text style={[styles.descriptionText, { color: theme.text }]}>
//             Description: {renderValue(item.descriptions)}
//           </Text> */}

          
//           {document?.entered_amount && (
//             <Text style={[styles.amountText, { color: theme.text }]}>
//               ₹{document.entered_amount}
//             </Text>
//           )}

          
          
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleNewClaim = () => navigation.navigate('NewClaimRequest');

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Claims</Text>
//         <TouchableOpacity>
//           <Icon name="notifications-outline" size={24} color={theme.text} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <View style={styles.searchContainer}>
//           <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             style={[styles.searchInput, { color: theme.text }]}
//             placeholder="Search Claims"
//             value={query}
//             onChangeText={handleSearch}
//             placeholderTextColor={theme.text}
//           />
//         </View>
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
//             zIndex={3000}
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
//             zIndex={2000}
//           />
//         </View>

//         <View style={styles.dropdownWrapper}>
//           <DropDownPicker
//             open={amountOpen}
//             value={null}
//             items={amountItems}
//             setOpen={setAmountOpen}
//             setValue={setAmountValue}
//             setItems={() => {}}
//             placeholder="Amount"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//             zIndex={1000}
//           />
//         </View>
//       </View>

//       <FlatList
//         data={claims}
//         keyExtractor={item => item.claim_id.toString()}
//         renderItem={renderClaim}
//         contentContainerStyle={styles.claimsList}
//       />

//       <TouchableOpacity style={styles.addClaimButton} onPress={handleNewClaim}>
//         <Text style={styles.addClaimText}>Add New Claim</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
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
//     borderRadius: 10,
//     padding: 15,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
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
//     marginLeft: 20,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//   },
//   claimsList: {
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
//     marginLeft:'60%',
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
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     },
//   dropdownWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//     backgroundColor:'white'
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
//     backgroundColor:'white',
//     borderColor: '#888',
//   },
// });

// export default ClaimsScreen;





import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useTheme } from '../../theme/useTheme';
import { BASEPATH } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ClaimsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [claims, setClaims] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [query, setQuery] = useState('');

  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);

  const [dateValue, setDateValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const [amountValue, setAmountValue] = useState(null);

  const dateItems = [
    { label: 'Today', value: 'today' },
    { label: 'All', value: 'all' },
  ];
  const statusItems = [
    { label: 'Approved', value: 'approved' },
    { label: 'Pending', value: 'pending' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'All', value: 'all' },
  ];
  const amountItems = [
    { label: 'More than 1000', value: 1000 },
    { label: 'More than 5000', value: 5000 },
    { label: 'More than 10000', value: 10000 },
    { label: 'All', value: 'all' },
  ];

  const fetchData = async () => {
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');
  
      if (!emp_id || !company_id) {
        throw new Error('Missing emp_id or company_id in AsyncStorage');
      }
      const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
      setClaims(response.data.claims);
      setAllClaims(response.data.claims);
      setPolicyDetails(response.data.policy_details_data);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  
  
  useEffect(() => {
    if (!Array.isArray(allClaims)) return;
    let filtered = allClaims;

    if (dateValue === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(item => item.submitted_date === today);
    }

    if (statusValue && statusValue !== 'all') {
      filtered = filtered.filter(
        item => item.status_of_approval?.toLowerCase() === statusValue.toLowerCase()
      );
    }

    if (amountValue && amountValue !== 'all') {
      filtered = filtered.filter(item => {
        const amount = item.documents?.[0]?.entered_amount || 0;
        return amount > amountValue;
      });
    }

    setClaims(filtered);
  }, [dateValue, statusValue, amountValue, allClaims]);
  
  
  const handleSearch = text => {
    setQuery(text);
    const filtered = allClaims.filter(item =>
      item.descriptions?.toLowerCase().includes(text.toLowerCase())
    );
    setClaims(filtered);
  };
  
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#065f46';
      case 'pending':
        return '#b58900';
      case 'rejected':
        return '#d32f2f';
      default:
        return '#000';
    }
  };
  
  const getExpenseNames = (claim, policyDetails) => {
    if (!Array.isArray(policyDetails)) return { main: 'N/A', sub: 'N/A' };
  
    console.log('Claim:', claim); 
    console.log('Policy Details:', policyDetails); 
  
    const match = policyDetails.find(
      (p) =>
        p.policy_detail_id === claim.policy_id &&
        p.main_expense_head_id === claim.expense_head &&
        p.sub_expense_head_id === claim.subexpense_head
    );
  
    console.log('Matching policy:', match); 
  
    return {
      main: match ? match.expense_head_name || 'N/A' : 'N/A',
      sub: match ? match.sub_expense_head_name || 'N/A' : 'N/A'
    };
  };
  
  const renderClaim = ({ item }) => {
    const { main, sub } = getExpenseNames(item, policyDetails);
 
    
    return (
      <TouchableOpacity
        style={[styles.claimItem, { backgroundColor: theme.cardBg }]}
        onPress={() => { }}>
        <View style={styles.claimContent}>
          <View style={styles.claimHeader}>
            <Text style={[styles.categoryText, { color: theme.text }]}>
              Claim #{item.claim_id}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_of_approval) }]}>
              <Text style={styles.statusText}>{item.status_of_approval}</Text>
            </View>
          </View>

          <Text style={{ color: theme.text }}>
            Main Category: {main}
          </Text>
          <Text style={{ color: theme.text }}>
            Sub Category: {sub}
          </Text>

          <Text style={[styles.dateText, { color: theme.text }]}>
            {item.submitted_date}
          </Text>

          {item.documents?.[0]?.entered_amount && (
            <Text style={[styles.amountText, { color: theme.text }]}>
              ₹{item.documents[0].entered_amount}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  
  
  const handleNotification = () => {
    navigation.navigate('ClaimNotification');
   }
  const handleNewClaim = () => navigation.navigate('NewClaimRequest');

  return (
   
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Claims</Text>
        <TouchableOpacity  onPress={handleNotification} >
          <Icon name="notifications-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search Claims"
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
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
            zIndex={3000}
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
            zIndex={2000}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={amountOpen}
            value={null}
            items={amountItems}
            setOpen={setAmountOpen}
            setValue={setAmountValue}
            setItems={() => {}}
            placeholder="Amount"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={1000}
          />
        </View>
      </View>

      {claims.length === 0 ? (
        <Text style={{ padding: 20, textAlign: 'center', color: theme.text }}>
          No claims found.
        </Text>
      ) : (
        <FlatList
          data={claims}
          keyExtractor={item => item.claim_id.toString()}
          renderItem={renderClaim}
        />
      )}

      <TouchableOpacity style={styles.addClaimButton} onPress={handleNewClaim}>
        <Text style={styles.addClaimText}>Add New Claim</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  claimItem: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  claimContent: { flex: 1 },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: { fontSize: 16, fontWeight: 'bold' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: { color: '#FFFFFF', fontSize: 12 },
  dateText: { color: '#666', marginTop: 5 },
  amountText: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  addClaimButton: {
    backgroundColor: '#7E8356',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addClaimText: { color: '#FFFFFF', fontWeight: 'bold' },
  searchBar: { 
    flexDirection: 'row' 
  },
  searchInput: {
     flex: 1, 
     height: 50, 
     paddingHorizontal: 10, 
     borderWidth: 1, 
     borderColor: '#ccc', 
     margin: 10, 
     borderRadius: 10 
    },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10 },
  dropdownWrapper: { flex: 1, marginHorizontal: 5 },
  dropdown: { borderColor: '#888', backgroundColor: 'white', minHeight: 40 },
  dropdownText: { color: 'black', fontSize: 14 },
  dropdownContainer: { backgroundColor: 'white', borderColor: '#888' },
});

export default ClaimsScreen;
