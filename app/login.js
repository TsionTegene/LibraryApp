import { useRouter } from 'expo-router';
import { Block, Text } from 'galio-framework';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { db } from '../FirebaseConfig';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const auth = FIREBASE_AUTH;
    const userCollectionRef = collection(db, 'user');

    const handleLogIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);

            // Fetch user profile data
            const querySnapshot = await getDocs(query(userCollectionRef, where("email", "==", email)));
            const userData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(auth.currentUser.uid);
            // Navigate to "NavBar"
            router.push("/books");

        } catch (error) {
            alert("Sign in failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistration = () => {
        router.push("/Register");
    };

    return (
        <SafeAreaView style={styles.container} >
            <Block style={styles.form}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email:"
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
                        onPress={handleLogIn}>
                        <Text color='#fff' size={16}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </Block>

                <Block center>
                    <Text style={styles.sign} size={12}>
                        If you don't have an account
                    </Text>
                    <TouchableOpacity
                        onPress={handleRegistration}>
                        <Text style={styles.signUp}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </Block>

            </Block>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#F0EDCF'
    },
    form: {
        width: '80%',
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
        //borderWidth: 1,
        borderColor: '#ccc',
        //borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
    },
    btn: {
        backgroundColor: '#e5b91b',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    sign: {
        marginTop: 10,
    },
    signUp: {
        color: '#e5b91b',
        textDecorationLine: 'underline',
    },
});

export default Login;
