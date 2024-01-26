// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={24} color='#e5b91b' />
            <TextInput
                style={styles.input}
                placeholder="Search books..."
                value={searchTerm}
                onChangeText={onSearchChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,

    },
    input: {
        width: 'auto',
        flex: 1,
        marginLeft: 8,
    },
});

export default SearchBar;
