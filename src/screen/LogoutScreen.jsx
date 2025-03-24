// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Modal from "react-native-modal";

// const LogoutScreen = ({navigation}) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const handleLogout = () => {
//     setModalVisible(false);
//     console.log("User logged out");
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       {/* <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
//         <Text style={styles.logoutText}>Log Out</Text>
//       </TouchableOpacity> */}

//       <Modal isVisible={isModalVisible} backdropOpacity={0.5} style={styles.modal}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Log out</Text>
//           <Text style={styles.modalMessage}>
//             Are you sure you want to log out? You'll need to log in again to use the app.
//           </Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.logoutConfirmButton} onPress={handleLogout}>
//               <Text style={styles.logoutConfirmText}>Log out</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5F5F5",
//   },
// //   logoutButton: {
// //     backgroundColor: "#4CAF50",
// //     padding: 12,
// //     borderRadius: 8,
// //   },
// //   logoutText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
//   modal: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalMessage: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 8,
//     alignItems: "center",
//     marginRight: 10,
//   },
//   cancelText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   logoutConfirmButton: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: "#4CAF50",
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   logoutConfirmText: {
//     fontSize: 16,
//     color: "white",
//   },
// });

// export default LogoutScreen;



import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const LogoutModal = ({ isVisible, onClose, }) => {
    const handleloggedout =() =>{
        NavigationContainer.navigate('Login');
    }
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Log out</Text>
        <Text style={styles.modalMessage}>
          Are you sure you want to log out? You'll need to log in again to use the app.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutConfirmButton} onPress={handleloggedout}>
            <Text style={styles.logoutConfirmText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
  },
  logoutConfirmButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutConfirmText: {
    fontSize: 16,
    color: "white",
  },
});

export default LogoutModal;
