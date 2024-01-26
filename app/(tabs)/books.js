import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { collection, getDocs, doc, updateDoc, getDoc, query, where, setDoc } from 'firebase/firestore';
import { db, auth, onAuthStateChanged } from '../../FirebaseConfig';
import { getAuth } from "firebase/auth";
import { useRouter } from 'expo-router';
import SearchBar from "../searchBar";

const Books = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const [books, setBooks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [myBooks, setMyBooks] = useState([]);
    const router = useRouter();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const handleBook = (bookId) => {
        router.push(`/${bookId}`);
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        const fetchBooks = async () => {
            try {
                const booksCollectionRef = collection(db, 'books');
                const querySnapshot = await getDocs(booksCollectionRef);
                const bookData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setBooks(bookData);
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchBooks();

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Filter books based on the search term
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [books, searchTerm]);

    useEffect(() => {
        const fetchUser = async () => {



            // const userBorrowedBooksRef = doc(db, 'user', userId);
            // const userBorrowedBooksDoc = await getDoc(userBorrowedBooksRef);
            const colRef = query(collection(db, 'user'), where('userId', '==', userId))
            const docRef = await getDocs(colRef);
            // const doc = docRef[0];
            // console.log(doc)
            docRef.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setMyBooks(docRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                console.log(doc.id, " => ", doc.data());
            });
            console.log(myBooks);

        }
        fetchUser();
    }, [userId])

    const handleBorrow = async (bookId, idx, bookstatus) => {
        try {
            const bookRef = doc(db, 'books', bookId);

            const updatedBooks = books.map((book) =>
                book.id === bookId ? { ...book, status: bookstatus === "Borrow" ? "Borrowed" : "Borrow" } : book
            );

            setBooks(updatedBooks);

            if (myBooks.length > 0) {
                const userDocId = myBooks[0].id;
                const currentBorrowedBooks = myBooks[0].borrowedBooks;

                const updatedBorrowedBooks = currentBorrowedBooks.includes(bookId)
                    ? currentBorrowedBooks.filter((id) => id !== bookId)
                    : [...currentBorrowedBooks, bookId];

                await Promise.all([
                    updateDoc(doc(db, "user", userDocId), {
                        borrowedBooks: updatedBorrowedBooks,
                    }),
                    updateDoc(doc(db, "books", bookId), {
                        status: bookstatus === "Borrow" ? "Borrowed" : "Borrow",
                    }),
                ]);

                console.log(
                    currentBorrowedBooks.includes(bookId)
                        ? "Book already borrowed! Removed from borrowed books."
                        : "Book added to borrowed books."
                );
            } else {
                console.log("User data not available.");
            }
        } catch (error) {
            console.error('Error updating book status or user borrowedBooks: ', error);
        }
    };



    const renderItem = ({ item }) => (
        <ScrollView style={styles.bookItem}>
            <View style={styles.bookCont}>
                <Image style={styles.profileImage} source={{ uri: item.bookImage }} />
                <View style={styles.descCont}>
                    <TouchableOpacity onPress={() => handleBook(item.id)}>
                        <Text style={styles.bookTitle}>{item.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.bookAuthor}>{item.author}</Text>
                    <TouchableOpacity onPress={() => handleBorrow(item.id, books.indexOf(item), item.status)}>
                        <Text style={styles.text}>{item.status}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <Text style={styles.title}>Available Books</Text>
            <FlatList
                data={filteredBooks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    bookCont: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#f0f0f0',
        height: 'auto',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        backgroundColor: '#e5b91b',
        width: '30%',
        height: 25,
        borderRadius: 5,
        fontSize: 18,
        textAlign: "center"
    },
    text1: {
        backgroundColor: '#D2E3C8',
        width: '30%',
        height: 25,
        borderRadius: 5,
        fontSize: 18,
        textAlign: "center"
    },
    descCont: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: "center",
    },

    bgImage: {
        padding: 0,
        height: 250,
        width: "100%",
        borderRadius: 15,
        borderWidth: 4,
    },
    bookItem: {
        marginBottom: 16,
    },
    bookTitle: {
        fontSize: 18,
        color: '#333333',
        fontWeight: "bold",
        marginBottom: 8,
        flex: 1,
        flexWrap: "wrap"
    },
    bookAuthor: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 4,
    },
    bookDescription: {
        fontSize: 14,
        color: '#333333',
        color: "#888",
    },
    subCont: {
        flex: 1,
        marginBottom: "40%"
    },
    editButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },


    container: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 16,
        marginTop: "5%",

    },

    editCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', // Align items to the left and right edges
        alignItems: 'center', // Center items vertically
    },

    desc: {
        color: "#000",
        marginBottom: 20,
        textAlign: "justify"
    },
    header: {
        marginBottom: 20,
    },
    imgcont: {
        // marginTop:"5%",
        marginLeft: "5%",
        width: "100%",
        position
            : 'absolute', // Position the container
        top: "90%", // Center vertically
        // left: "50%", // Center horizontally
        transform: [
            { translateX: -10 }, // Adjust based on the width of the profile image
            { translateY: -30 }, // Adjust based on the height of the profile image
        ],
        zIndex: 1,
        //  backgroundColor:"#123"
    },


    rating: {
        color: theme.COLORS.WARNING,
        fontSize: 20,
        marginBottom: 8,
    },
    profileImageContainer: {
        flexDirection: "row",

    },
    dptCont: {
        flex: 1,
        padding: 16,
        paddingVertical: 50
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        width: '100%', // Set the width to 100%
        fontSize: 25,
        fontFamily: "serif",
        fontStyle: "italic",
        fontWeight: "bold",


        color: "#000",
        marginBottom: 8,
        marginLeft: 8
    },
    email: {
        fontSize: 15,

        fontFamily: "serif",
        fontStyle: "italic",
        fontWeight: "normal",
        marginTop: 8
    },
    emailCont: {
        flexDirection: "row",

    },

    profileImage: {

        width: 100,
        height: 100,
        //borderRadius: 10,
        resizeMode: "cover",
    },
    detailsContainer: {
        color: "#000",
        marginTop: 20,
        height: "100%",
        marginLeft: "5%",

    },
});

export default Books;