import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { router } from 'expo-router/src/imperative-api';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchUser = async () => {
                try {
                    const colRef = collection(db, 'user');
                    const q = query(colRef, where('userId', '==', currentUser.uid));
                    const querySnapshot = await getDocs(q);


                    setMyBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUser();
        }
    }, [currentUser]);

    const handleEditProfile = () => {
        router.push('/EditProfile');
    };

    const renderItem = ({ item }) => (
        <View style={styles.bookCont}>
            <Image style={styles.profileImage} source={{ uri: item.bookImage }} />
            <View style={styles.descCont}>
                <Text style={styles.firstName}>{item.firstName}</Text>
                <Text style={styles.lastName}>{item.lastName}</Text>
                <Text style={styles.text}>{item.email}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={myBooks} renderItem={renderItem} keyExtractor={(item) => item.id} />
            <Button style={styles.btn} title="Edit Profile" onPress={handleEditProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        margin: 10,
        backgroundColor: '#fff',
    },

    bookCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    descCont: {
        flex: 1,
    },
    firstName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    lastName: {
        fontSize: 16,
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
    },
});

export default Profile;
