
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // 👈 react-native-vector-icons
import { BASEPATH } from '../config';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const renderItem = ({ item }) => {
    const initials = item.approver_name
      ? item.approver_name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'NA';

    const hasProfileImage = item.approver_image_url;

    return (
      <TouchableOpacity
        style={styles.notificationCard}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.row}>
          <View style={styles.avatarContainer}>
            {hasProfileImage ? (
              <Image
                source={{ uri: item.approver_image_url }}
                style={styles.avatar}
              />
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Notifications</Text>  
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search Notifications"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
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
 
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationCard: {
    paddingVertical: 12,
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
