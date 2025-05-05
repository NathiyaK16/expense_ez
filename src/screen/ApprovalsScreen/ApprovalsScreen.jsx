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



import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Checkbox, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASEPATH } from '../config';

export default function ApprovalScreen() {
  const [approvals, setApprovals] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=Admin&company_id=durr`); // 🔁 Replace with real URL
      const data = response?.data?.approval_claim_data?.approval_hiery_data || [];
      setApprovals(data);
    } catch (error) {
      console.error('Axios Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Checkbox
          status={selectedItems.includes(item.policy_detail_id) ? 'checked' : 'unchecked'}
          onPress={() => toggleSelect(item.policy_detail_id)}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.empName}>{item?.employee_name || 'Unknown User'}</Text>
          <Text style={styles.claimCode}>Policy ID: {item.policy_detail_id}</Text>
          <Text style={styles.expenseText}>
            <Text style={{ fontWeight: 'bold' }}>{item.expense_head_name}</Text> - {item.sub_expense_name}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.amount}>INR. {item.policy_amount?.toFixed(2)}</Text>
          <Text style={styles.date}>
            {item.effective_end
              ? new Date(item.effective_end).toLocaleDateString()
              : 'No Date'}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchFilterRow}>
        <TextInput
          placeholder="Search Employee"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {/* <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={22} color="#666" />
        </TouchableOpacity> */}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={approvals.filter((item) =>
            (item.employee_name || '')
              .toLowerCase()
              .includes(search.toLowerCase())
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.policy_detail_id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <View style={styles.footerButtons}>
        <Button mode="outlined" style={styles.rejectButton}>
          Reject
        </Button>
        <Button mode="contained" style={styles.approveButton}>
          Approve
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
  },
  filterButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  card: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  empName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  claimCode: {
    fontSize: 12,
    color: '#999',
  },
  expenseText: {
    fontSize: 13,
    color: '#555',
  },
  rightContent: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  footerButtons: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rejectButton: {
    flex: 1,
    marginRight: 10,
    borderColor: '#c33',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#556b2f',
  },
});
