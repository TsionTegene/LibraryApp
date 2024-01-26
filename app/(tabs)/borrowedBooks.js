// BorrowedBooks.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig'; // Update the path based on your project structure

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const booksCollectionRef = collection(db, 'books');
                const borrowedBooksQuery = query(booksCollectionRef, where('status', '==', 'Borrowed'));
                const querySnapshot = await getDocs(borrowedBooksQuery);

                const borrowedBooksData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setBorrowedBooks(borrowedBooksData);
            } catch (error) {
                console.error('Error fetching borrowed books: ', error);
            }
        };

        fetchBorrowedBooks();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Text>{item.title}</Text>
            {/* Add other book details here */}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={borrowedBooks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    bookItem: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#F0EDCF',
        borderRadius: 8,
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

export default BorrowedBooks;
