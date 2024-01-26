import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Categories = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Biology</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Programming</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Physics</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Mathematics For Natural Science</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Mathematics For Social Science</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Politics</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Economics</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Psychology</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Literature</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>History</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Geography</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.categoryName}>Accounting</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
    },
    card: {
        backgroundColor: '#f0f0f0',
        height: '8%',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoryName: {
        fontSize: 22,
        color: '#333333',
        //alignSelf: 'center'

    },
});

export default Categories;
