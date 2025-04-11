import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

const ClaimItem = ({ category, date, amount, status }) => {
  const [isSelected, setSelection] = useState(false);
  const getStatusColor = () => {
    switch(status) {
      case 'Approved': return '#219e4f';
      case 'Pending': return '#7d421e';
      case 'Rejected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    

<View style={styles.claimItem}>
      <CheckBox
        disabled={false}
        value={isSelected}
        onValueChange={setSelection}
        style={styles.checkbox}
      />
      <View style={styles.claimContent}>
        <View style={styles.claimHeader}>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.amountText}>INR {amount.toLocaleString()}</Text>
      </View>
    </View>
  );
};

  

const ClaimsScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const claims = [
    { 
      id: '1', 
      category: 'Travel', 
      date: '25/03/2025', 
      amount: 120.00, 
      status: 'Approved' 
    },
    { 
      id: '2', 
      category: 'Food', 
      date: '25/03/2025', 
      amount: 2000.00, 
      status: 'Pending' 
    },
    { 
      id: '3', 
      category: 'Purchase', 
      date: '25/03/2025', 
      amount: 600.00, 
      status: 'Rejected' 
    }
  ];

  const handleNewClaim = () =>{
    navigation.navigate('NewClaimRequest');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Claims</Text>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Claims"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        </View>
        <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={20} color="#7E8356" />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.segmentContainer}>
        <View>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={styles.segmentText}>Today</Text>
        </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.segmentButton}>
          <Text style={styles.segmentText}>Approved</Text>
        </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.segmentButton}>
          <Text style={styles.segmentText}>Filed</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={styles.segmentText}>Amount</Text>
        </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.claimsList}>
        {claims.map(claim => (
          <ClaimItem
            key={claim.id}
            category={claim.category}
            date={claim.date}
            amount={claim.amount}
            status={claim.status}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addClaimButton} onPress={handleNewClaim}>
        <Text style={styles.addClaimText}>Add New Claim</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  claimItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  checkbox: {
    marginRight: 10
  },
  claimContent: {
    flex: 1
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchBar:{
    flexDirection:'row'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    width:'80%',
    borderColor:'gray',
    borderWidth:1,
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    height: 50
  },
  filterButton: {
    padding: 10,
    marginTop:'15%'
  },
  filterContainer:{
    borderColor:'#7E8356',
    backgroundColor: '#f9f9e0',
    borderWidth:1,
    borderRadius:5,
    height:50,
    marginTop:'10',
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  segmentButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
  },
  segmentText: {
    color: '#666'
  },
  claimsList: {
    flex: 1,
    padding: 10
  },

  categoryText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12
  },
  dateText: {
    color: '#666',
    marginTop: 5
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },
  addClaimButton: {
    backgroundColor: '#7E8356',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  addClaimText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

export default ClaimsScreen;