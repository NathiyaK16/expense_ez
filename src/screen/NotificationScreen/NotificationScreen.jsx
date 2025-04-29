import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NotificationScreen = (navigation) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [updating, setUpdating] = useState(false); // For handling loading state when marking as read

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`);
      setNotifications(response.data.data);
    } catch (error) {
      console.log('Error fetching notifications:', error);
    } 
  };

  const markAsRead = async (id) => {
     
    try {
      await axios.put(`${BASEPATH}v1/client/policy/mark_as_read`, { id });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, status_of_notifications: 'Read' }
            : notification
        )
      );
    } catch (error) {
      console.error('Error updating notification:', error);
    } 
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, item.status_of_notifications === 'Unread' && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <Text style={styles.empName}>{item.emp_name}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>No notifications found.</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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
    color: '#555',
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default NotificationScreen;
