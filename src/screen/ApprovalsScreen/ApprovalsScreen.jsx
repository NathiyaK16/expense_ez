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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Checkbox, Card } from 'react-native-paper';
import axios from 'axios';
import { BASEPATH } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/useTheme';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function ApprovalScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [approvals, setApprovals] = useState([]);
  const [allApprovals, setAllApprovals] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [dateOpen, setDateOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);
  
  const [dateValue, setDateValue] = useState(null);
  const [amountValue, setAmountValue] = useState(null);

  const dateItems = [
    { label: 'Today', value: 'today' },
    { label: 'All', value: 'all' }
  ];

  const amountItems = [
    { label: 'More than 1000', value: '1000' },
    { label: 'More than 5000', value: '5000' },
    { label: 'More than 10000', value: '10000' },
    { label: 'All', value: 'all' },
  ];

  useEffect(() => {
    if (!Array.isArray(allApprovals)) return;

    let filtered = allApprovals;

    if (dateValue === 'today') {
      const today = new Date();
      filtered = filtered.filter(item => {
        const createdAt = new Date(item.created_at);
        return (
          createdAt.getFullYear() === today.getFullYear() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getDate() === today.getDate()
        );
      });
    }

    if (amountValue && amountValue !== 'all') {
      filtered = filtered.filter(item => {
        const amount = item.documents?.[0]?.entered_amount || 0;
        return amount > Number(amountValue);
      });
    }

    setApprovals(filtered);
  }, [dateValue, amountValue, allApprovals]);

  useEffect(() => {
    fetchApprovals();
  }, []);
  const formatDateTime = (date) => {
    const d = new Date(date);
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  
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
      setAllApprovals(pendingApprovals);
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

  const handleAction = async (actionType) => {
    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Please select at least one claim.');
      return;
    }
  
    setActionLoading(true); // Show loading spinner
  
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');
      //const now = new Date().toISOString();
      const now = formatDateTime(new Date());

      // Map selected claims to the payload
      const updateApprovals = approvals
        .filter(item => selectedItems.includes(String(item.claim_id)))
        .map(item => ({
          company_id,
          claim_id: item.claim_id,
          policy_id: item.policy_id,
          emp_id: item.emp_id,
          levels: item.levels,
          approver_id: emp_id,
          status_of_approval: actionType === 'approve' ? 'Approved' : 'Rejected',
         
          // approved_at: actionType === 'approve' ? now : null,
          // rejected_at: actionType === 'reject' ? now : null,
          approved_at: actionType === 'approve' ? now : '',
          rejected_at: actionType === 'reject' ? now : '',
          rejected_reason: actionType === 'reject' ? 'Rejected by approver' : '',
          ...(item.advance_id && { advance_id: item.advance_id }),
          ...(item.advance_amount && { advance_amount: item.advance_amount }),
        }));
  
      console.log("Update approvals payload: ", updateApprovals);  // Log payload to check it
  
      // Ensure that the updateApprovals array is not empty
      if (updateApprovals.length === 0) {
        Alert.alert('No claims to update', 'No selected claims to approve/reject.');
        return;
      }
  
      const response = await axios.patch(
        `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`,
        { update_claims: updateApprovals },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log("Backend response:", response.data);
  
      if (response.data.status === 'success') {
        // Optimistic update: Remove the approved/rejected claims from the list
        const updatedApprovals = approvals.filter(item => !selectedItems.includes(String(item.claim_id)));
        setApprovals(updatedApprovals);
        setAllApprovals(updatedApprovals);
  
        setSelectedItems([]);
        Alert.alert('Success', 'Approval status updated successfully');
      } else {
        Alert.alert('Failed', 'Unable to approve claims.');
      }
  
    } catch (error) {
      console.error(`${actionType} error:`, error);
      Alert.alert('Error', `Something went wrong during ${actionType}.`);
    } finally {
      setActionLoading(false); // Hide loading spinner
    }
  };
  

  const renderItem = ({ item }) => {
    return(
      <TouchableOpacity
              style={[styles.approvalItem, { backgroundColor: theme.cardBg }]}
              onPress={() => { }}>
      <View style={styles.approvalContent}>

        <Checkbox
          status={selectedItems.includes(String(item.claim_id)) ? 'checked' : 'unchecked'}
          onPress={() => toggleSelect(String(item.claim_id))}
        />
        <View style={{ flex: 1 }}>
          
          <Text style={styles.empName}>{item.emp_name}</Text>
<Text style={styles.claimCode}>Claim ID:{item.claim_id}</Text>
<Text style={styles.expenseText}>
  <Text style={{ fontWeight: 'bold' }}>{item.expense_head_name}</Text> - {item.sub_expense_head_name}
</Text>

        </View>
        <View style={styles.rightContent}>
          <Text style={styles.amountText}>INR. {item.documents?.[0]?.entered_amount?.toFixed(2) ?? '0.00'}</Text>
          <Text style={styles.dateText}>
            {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'No Date'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  };
  const handleError = (error, actionType) => {
    console.error(`${actionType} error:`, error);
    Alert.alert(
      'Error',
      error?.response?.data?.message || `Something went wrong during ${actionType}. Please try again later.`
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDateOpen(false);
        setAmountOpen(false);
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
        </View>

<View style={styles.searchBar}>
  <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
  <TextInput
    style={[styles.searchInput, { color: theme.text }]}
    placeholder="Search Employee"
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
              zIndex={2000}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={approvals.filter(item =>
              (item.emp_name || '').toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={renderItem}
            keyExtractor={item => String(item.claim_id)}
            contentContainerStyle={{ paddingBottom: 80 }}
            initialNumToRender={10} // Number of items to render initially
            maxToRenderPerBatch={20} // Max number of items to render per batch
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleAction('reject')}
          >
            {actionLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.rejectButtonText}>Reject</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleAction('approve')}
          >
            {actionLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.approveButtonText}>Approve</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  // searchBar: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 10,
  //   marginVertical: 10,
  // },
  // searchInput: {
  //   flex: 1,
  //   height: 50,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 10,

  // },
  // searchIcon: {
  //   position: 'absolute',
  //   left: 10, 
  // },
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
    width:'90%',
    marginLeft:20
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  
  approvalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
  },
  approvalContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 12,
  },
  
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 5
  },
  dropdown: {
    borderColor: '#888',
    backgroundColor: 'white',
    minHeight: 40
  },
  dropdownText: {
    color: 'black',
    fontSize: 14
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderColor: '#888'
  },
  empName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  claimCode: {
    color:'#222',
    fontSize: 14,
    padding:5
  },
  expenseText: {
    color: '#444',
    fontSize: 16,
   
  },
  // rightContent: {
  //   alignItems: 'flex-end',
  //   flex: 1,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  // },
  // rightContent: {
  //   alignItems: 'flex-end',
  //   paddingLeft: 10,
  // },
  
  dateText: { 
    color: '#222', 
    marginTop: 5 
  },
  amountText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  rejectButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  approveButton: {
    backgroundColor: '#7E8356',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  rejectButtonText: {
    color: 'black',
    fontSize: 16,
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
