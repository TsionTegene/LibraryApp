import { Block, Text } from 'galio-framework';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// import materialTheme from '../constants/Theme';

// import { doc, setDoc } from "firebase/firestore";
import { db } from '../FirebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';



// var C = require("crypto-js");

// var Decrypted = C.AES.decrypt(E, "your password");
// var result =Decrypted.toString(C.enc.Utf8);

// console.log(result)

// Add a new document in collection "cities"


const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    // const [idno, setIdNo] = useState('');


    const handleRegistration = async () => {
        // const hashedPassword = await bcrypt.hash(password, 10);
        // var mytexttoEncryption = "Hello"
        // const hashedPassword = CryptoES.AES.encrypt(mytexttoEncryption, password).toString();

        const auth = getAuth();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const uid = response.user?.uid; // Access the uid from the user property
            const data = {
                userId: uid,
                firstName,
                lastName,
                email,
                borrowedBooks: []

            };

            try {

                const collectionRef = collection(db, 'user');
                const docRef = await addDoc(collectionRef, data);

                // The following line will now correctly log the ID of the newly added document
                // console.log("Document written with ID: ", docRef.id);

                // navigation.navigate("login");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } catch (error) {
            console.error("Error creating user: ", error);
        }
        router.push("/login");
    };

    const handleLogin = () => {
        router.push("/login");
    };


    return (
        <SafeAreaView style={styles.container}>
            <Block style={styles.icon}>
                <TouchableOpacity onPress={handleLogin}>
                    <Ionicons name='arrow-back' size={30} color='#333333' style={styles.arrowIcon} />
                </TouchableOpacity>
            </Block>
            <Block style={styles.form}>
                <Text style={styles.title}>Registration Form</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name:"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name:"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />
                {/* <TextInput
                    style={styles.input}
                    placeholder="Id Number:"
                    value={idno}
                    onChangeText={text => setIdNo(text)}
                /> */}
                <TextInput
                    style={styles.input}
                    placeholder="Department:"
                    value={department}
                    onChangeText={text => setDepartment(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email:"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password:"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Block center>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleRegistration}>
                        <Text color="#3c3c3c" size={18}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </Block>

            </Block>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1F0DA',
    },

    btn: {
        backgroundColor: "#e5b91b",
        width: 'auto',
        height: 50,
        padding: 15,
        paddingHorizontal: "40%",
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 10
    },
    icon: {
        marginBottom: 5,
        padding: 10
    },
    arrowIcon: {
        //paddingHorizontal: 5,
        paddingTop: 10

    },
    form: {
        marginTop: 50,
        paddingTop: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',

    },
    container: {
        flex: 1,
        //marginTop: 10,
        //justifyContent: 'center',
        backgroundColor: '#F0EDCF',

        padding: 16,
    },

    title: {
        fontSize: 30,
        fontFamily: "serif",
        fontStyle: "italic",
        fontWeight: "normal",
        marginTop: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
        textAlign: 'center'
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        //borderRadius: 20,
        borderColor: '#e5b91b',
        marginBottom: 16,
        padding: 8,
    },
});

export default Register;