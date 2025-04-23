import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,TextInput,FlatList,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '../../theme/useTheme';
import DropDownPicker from 'react-native-dropdown-picker';

const ClaimItem = ({ category, date, amount, status }) => {
  const { theme } = useTheme();
  const [isSelected, setSelection] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'Approved': return '#219e4f';
      case 'Pending': return '#7d421e';
      case 'Rejected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <View style={[styles.claimItem, { backgroundColor: theme.backgroundColor }]}>
      <CheckBox
        disabled={false}
        value={isSelected}
        onValueChange={setSelection}
        style={styles.checkbox}
      />
      <View style={styles.claimContent}>
        <View style={styles.claimHeader}>
          <Text style={[styles.categoryText, { color: theme.text }]}>{category}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <Text style={[styles.dateText, { color: theme.text }]}>{date}</Text>
        <Text style={[styles.amountText, { color: theme.text }]}>INR {amount.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const ClaimsScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const allClaims = [
    { id: '1', category: 'Travel', date: '25/03/2025', amount: 120.0, status: 'Approved' },
    { id: '2', category: 'Food', date: '25/03/2025', amount: 2000.0, status: 'Pending' },
    { id: '3', category: 'Purchase', date: '25/03/2025', amount: 600.0, status: 'Rejected' },
    { id: '4', category: 'Supplies', date: '25/03/2025', amount: 8000.0, status: 'Approved' },
  ];

  const [claims, setClaims] = useState(allClaims);
  const [query, setQuery] = useState('');

  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);

  const [dateValue, setDateValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const [amountValue, setAmountValue] = useState(null);

  const dateItems = [
    {label: 'All', value: 'all' }, 
    { label: 'Today', value: 'today' }
    ];
  const statusItems = [
    { label: 'All', value: 'all' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Rejected', value: 'Rejected' },
  ];
  const amountItems = [
    { label: 'All', value:'all' },
    { label: 'More than 1000', value: 1000 },
    { label: 'More than 5000', value: 5000 },
    { label: 'More than 10000', value: 10000 },
  ];

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = allClaims.filter(item =>
      item.category.toLowerCase().includes(text.toLowerCase())
    );
    setClaims(filtered);
  };

  
  useEffect(() => {
    let filtered = [...allClaims];
  
    if (dateValue && dateValue !== 'all') {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const formattedToday = `${dd}/${mm}/${yyyy}`;
      filtered = filtered.filter(item => item.date === formattedToday);
    }
  
    if (statusValue && statusValue !== 'all') {
      filtered = filtered.filter(item => item.status === statusValue);
    }
  
    if (amountValue && amountValue !== 'all') {
      filtered = filtered.filter(item => item.amount > amountValue);
    }
  
    setClaims(filtered);
  }, [dateValue, statusValue, amountValue]);
  

  const handleNewClaim = () => navigation.navigate('NewClaimRequest');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Claims</Text>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search Claims"
            value={query}
            onChangeText={handleSearch}
            placeholderTextColor={theme.text}
          />
        </View>
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
            selectedItemLabelStyle={{ display: 'none' }}
            dropDownContainerStyle={styles.dropdownContainer}
            arrowIconStyle={styles.arrowIcon}
            zIndex={2000}
            zIndexInverse={2000}
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
            selectedItemLabelStyle={{ display: 'none' }}
            dropDownContainerStyle={styles.dropdownContainer}
            arrowIconStyle={styles.arrowIcon}
            zIndex={2000}
            zIndexInverse={2000}
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
            selectedItemLabelStyle={{ display: 'none' }}
            dropDownContainerStyle={styles.dropdownContainer}
            arrowIconStyle={styles.arrowIcon}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
      </View>

      <FlatList
        data={claims}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClaimItem
            category={item.category}
            date={item.date}
            amount={item.amount}
            status={item.status}
          />
        )}
        contentContainerStyle={styles.claimsList}
      />

      <TouchableOpacity style={styles.addClaimButton} onPress={handleNewClaim}>
        <Text style={styles.addClaimText}>Add New Claim</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  claimItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  claimContent: {
    flex: 1,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  claimsList: {
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  dateText: {
    color: '#666',
    marginTop: 5,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addClaimButton: {
    backgroundColor: '#7E8356',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addClaimText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 1000,
    marginBottom: 10,
  },
  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdown: {
    borderColor: '#888',
    backgroundColor: '#1e1e1e',
    minHeight: 40,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: '#2a2a2a',
    borderColor: '#888',
  },
  arrowIcon: {
    tintColor: '#fff',
  },
});

export default ClaimsScreen;
