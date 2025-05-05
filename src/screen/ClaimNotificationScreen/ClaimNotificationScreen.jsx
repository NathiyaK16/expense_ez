import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASEPATH } from '../config';

const ClaimNotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      // const empId = await AsyncStorage.getItem('emp_id');
      // if (!empId) {
      //   console.warn('emp_id not found in AsyncStorage');
      //   setLoading(false);
      //   return;
      // }

      const response = await axios.get(
        `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=Admin&company_id=durr`
      );

      const rawNotifications = response.data?.status_claims_notifications || [];

      // Format notifications with readable messages
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
        };
      });

      setNotifications(formatted);
    } catch (error) {
      console.log('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status_read: 'read' } : notif
      )
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        item.status_read === 'not_read' && styles.unreadNotification,
      ]}
      onPress={() => markAsRead(item.id)}
    >
    
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>
        {item.created_at
          ? new Date(item.created_at).toLocaleString()
          : 'No Date'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationCard: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },
  unreadNotification: {
    backgroundColor: '#d1e7ff',
  },
  empName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
});

export default ClaimNotificationScreen;
