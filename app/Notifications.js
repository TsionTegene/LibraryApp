import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import React from 'react'
import { Block } from 'galio-framework'
import { TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Notifications = () => {
    const handleHome = () => {
        router.back("index");
    };

    return (
        <Block style={styles.container}>
            <Block style={styles.icon}>
                <TouchableOpacity onPress={handleHome}>
                    <Ionicons name='arrow-back' size={28} color='#333333' style={styles.arrowIcon} />
                </TouchableOpacity>
            </Block>
            {/* <Text style={styles.text}>Notifications</Text> */}
            <TextInput style={styles.card}></TextInput>
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
        padding: 10,
        //marginTop: 16,
    },
    icon: {
        marginTop: 10,
        // padding: 5
    },
    arrowIcon: {
        //paddingHorizontal: 5
    },
    card: {
        backgroundColor: '#f0f0f0',
        height: 'auto',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        marginTop: 20,
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
export default Notifications