import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import { getAuth, signOut } from 'firebase/auth';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';


import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ navigation }) => {
  const [theme, setTheme] = useState('light'); // 
  const [notificationSwitch, setNotificationSwitch] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [about, setabout] = useState(false);
  const [logoutmodalvisible, setLogoutModal] = useState(false);
  const router = useRouter();
  // const handleThemeToggle = () => {
  //   setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  // };
  const [image, setImage] = useState(null);
  const loadSavedData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;
      const savedImage = await AsyncStorage.getItem(`profileImage_${userId}`);

      if (savedImage) {
        setImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading saved data:', error.message);
    }
  };
  useEffect(() => {
    loadSavedData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const imageUrl = selectedAsset.uri;

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error('User is not authenticated');
        return;
      }

      const userId = auth.currentUser.uid;
      await updateProfilePictureInFirestore(userId, imageUrl);

      setImage(imageUrl);
      await AsyncStorage.setItem(`profileImage_${userId}`, imageUrl);
    }
  };

  const updateProfilePictureInFirestore = async (userId, imageUrl) => {
    const firestore = getFirestore();

    try {

      const userRef = doc(firestore, 'user', userId);

      const userDoc = await getDoc(userRef);

      await setDoc(userRef, { profilePicture: imageUrl });
      console.log('Profile picture updated successfully.');

    } catch (error) {
      console.error('Error updating profile picture in Firestore:', error);
    }
  };




  const handleNotificationToggle = () => {
    setNotificationSwitch(!notificationSwitch);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const modal = () => {
    setabout(!about);
  }
  const handleabout = () => {
    modal();
    router.push("/about")
  }
  const handleNotification = () => {
    toggleModal();
  };
  const handleLogout = async () => {

    try {
      const auth = getAuth();
      await signOut(auth);

      router.push("/login")
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
    setLogoutModal(false)
  };

  const handleChangePassword = () => {

    router.push('/changepwd')


  };
  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>

      <View style={styles.containerr}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image source={require("../../assets/default.png")} style={styles.profileImage} />)}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="pencil-outline" size={15} color="#E0AED0" />
            <Text style={{ marginLeft: 8, fontFamily: "serif", fontStyle: "italic", fontWeight: "normal", }}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
        {/* <Ionicons name="lock-closed-outline" size={24} color="#fff" style={{
          borderRadius: 20,
          backgroundColor: "#2D3250",
          padding: 3,
        }} /> */}
        <Text style={{ padding: 10 }}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleabout}>

        <Text style={{ padding: 10 }} >About us</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModal(true)} >

        <Text style={styles.logoutButtonText} >Logout</Text>
      </TouchableOpacity>



      <Modal isVisible={about} onBackdropPress={modal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={styles.txt1}>About us</Text>
            <TouchableOpacity onPress={modal}>
              <Text style={{ color: '#092635', marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutmodalvisible}
        onRequestClose={() => setLogoutModal(false)}

      >

        <View style={styles.modalContent}  >
          <Text style={styles.txt1}>Do you want to proceed?</Text>

          <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#fff', borderRadius: 5, width: "30%", height: 30, }}>

            <Text style={styles.txt2}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLogoutModal(false)} style={{ backgroundColor: '#fff', borderRadius: 5, width: "30%", height: 30 }}
          >
            <Text style={styles.txt3}>NO</Text>
          </TouchableOpacity>

        </View>

      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 200


  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'black',
    marginBottom: 20,
  },
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 100,
    padding: 14

  },
  settingItem: {

    fontWeight: 'bold',
    shadowColor: '#e5b91b ',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F0EDCF',
    paddingBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,

  },
  txt2: {
    fontSize: 18,
    color: "#0B60B0"
  },
  txt3: {
    fontSize: 18,
    color: "#BF3131"
  },
  txt1: {
    fontSize: 20,
    paddingBottom: 10
  },
  logoutButton: {
    fontWeight: 'bold',
    shadowColor: '#d3d3d3 ',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingBottom: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#F0EDCF',
  },
  logoutButtonText: {
    color: '#BF3131',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,

  },

});

export default SettingScreen;
