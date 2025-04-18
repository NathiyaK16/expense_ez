import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '../../theme/useTheme';  

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
        style={[styles.checkbox,{color:theme.text}]}
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
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();  // Access theme here

  const claims = [
    { id: '1', category: 'Travel', date: '25/03/2025', amount: 120.00, status: 'Approved' },
    { id: '2', category: 'Food', date: '25/03/2025', amount: 2000.00, status: 'Pending' },
    { id: '3', category: 'Purchase', date: '25/03/2025', amount: 600.00, status: 'Rejected' }
  ];

  const handleNewClaim = () => {
    navigation.navigate('NewClaimRequest');
  };

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
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.text}
          />
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={20} color="#7E8356" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.segmentContainer}>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>Filed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segmentButton}>
          <Text style={[styles.segmentText, { color: theme.text }]}>Amount</Text>
        </TouchableOpacity>
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
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
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

export default ClaimsScreen;
