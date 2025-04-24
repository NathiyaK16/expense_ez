import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useTheme } from '../../theme/useTheme';

const ClaimDocumentScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const claimId = navigation.getParam('claimId'); // Accessing the claimId passed from ClaimsScreen
  const [documentDetails, setDocumentDetails] = useState(null);

  useEffect(() => {
    fetchDocumentDetails(claimId);
  }, [claimId]);

  const fetchDocumentDetails = async (claimId) => {
    try {
      const response = await axios.get(`${BASEPATH}v1/client/claims/get_document_details/${claimId}`);
      setDocumentDetails(response.data); // Assuming response.data contains the document details
    } catch (error) {
      console.error('Error fetching document details:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Claim #{claimId}</Text>
      {documentDetails ? (
        <>
          <Text style={{ color: theme.text }}>Document ID: {documentDetails.id}</Text>
          <Text style={{ color: theme.text }}>Amount: ₹{documentDetails.entered_amount}</Text>
          {documentDetails.bill_image && (
            <Image
              source={{ uri: documentDetails.bill_image }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </>
      ) : (
        <Text style={{ color: theme.text }}>Loading document details...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default ClaimDocumentScreen;
