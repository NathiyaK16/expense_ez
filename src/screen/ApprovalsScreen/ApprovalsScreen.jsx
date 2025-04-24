import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/useTheme';  

const ApprovalsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [approvals, setApprovals] = useState(allApprovals);
  const [searchQuery, setSearchQuery] = useState('');
 
  const[dateOpen, setDateOpen] = useState(false);
  const[statusOpen, setStatusOpen] = useState(false);
  const[amountOpen, setAmountOpen] = useState(false);

  const[dateValue, setDateValue] = useState(null);
  const[statusValue, setStatusValue] = useState(null);
  const[amountValue, setAmountValue] = useState(null);
  
  const dateItems = [
    {label:"Today", value:'today'},
    {label:'All', value:'all'},
  ];
  const statusItems =[
    {label:'Approved', value:'approved'},
    {label:'Pending', value:'pending'},
    {label:'Rejected', value:'rejected'},
    {label:'All', value:'all'}
  ];
  const amountItems = [
    {label:'> 1000', value:'1000'},
    {label:'> 5000', value:'5000'},
    {label:'> 10000', value: '10000'},
    {label:'All', value: 'all'}
  ]

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = allApprovals.filter(item =>
      item.category.toLowerCase().includes(text.toLowerCase())
    );
    setClaims(filtered);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals</Text>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search Claims"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={theme.text}
          />
        </View>
        
      

      <View style={styles.segmentContainer}>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>Amount</Text>
        </TouchableOpacity>
      </View>

      


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
    marginLeft:20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  filterButton: {
    padding: 10,
  },
  filterContainer: {
    borderColor: '#7E8356',
    backgroundColor: '#f9f9e0',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  segmentButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  segmentText: {
    color: '#666',
  },
  claimsList: {
    flex: 1,
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
});

export default ApprovalsScreen;
