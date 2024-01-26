import { View, Text, Dimensions, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, TextInput, Button } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from "expo-router/src/hooks"
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, query, where, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { useEffect } from 'react';
import { useState } from "react";
import { theme } from "galio-framework";
import { router } from 'expo-router';
const bookDetails = ({ route }) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const [userEmail, setUserEmail] = useState('');
    const params = useGlobalSearchParams();
    const bookId = params.id;
    const [book, setBook] = useState(null);
    const [review, setReview] = useState({ rating: 0, comment: '' });

    const docRef = doc(db, 'books', bookId);


    useEffect(() => {
        const getBook = async () => {
            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data());
                    setBook(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error getting document:', error);
            }
        };

        getBook();
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    const handleWriteReview = async () => {
        try {
            const updatedBook = {
                reviews: arrayUnion({ email: userEmail, review: review }),
            };

            await updateDoc(docRef, updatedBook);
            setReview(''); // Clear the review input after submitting

            // Fetch the updated book data to reflect changes in the UI
            const updatedDocSnap = await getDoc(docRef);
            if (updatedDocSnap.exists()) {
                setBook(updatedDocSnap.data());
            }

            console.log('Review written successfully!');
        } catch (error) {
            console.error('Error writing review:', error);
        }
    };


    // const renderItem = () => (
    //     <ScrollView style={styles.bookItem}>
    //         <TouchableOpacity onPress={handleBack}>
    //             <Ionicons name='arrow-back' size={30} color='#333333' style={styles.arrowIcon} />
    //         </TouchableOpacity>
    //         <View style={styles.bookCont}>
    //             <Image style={styles.profileImage} source={{ uri: book?.bookImage }} />
    //             <View style={styles.descCont}>
    //                 <Text style={styles.bookTitle}>{book?.title}</Text>
    //                 <Text style={styles.bookAuthor}>{book?.author}</Text>
    //                 <Text style={styles.bookDescription}>{book?.description}</Text>
    //                 <Text style={styles.bookPublish}>{book?.Publication_Date}</Text>
    //             </View>
    //         </View>
    //         <View style={styles.reviewContainer}>
    //             <Text style={styles.sectionTitle}>Reviews:</Text>
    //             {book?.reviews?.map((review, index) => (
    //                 <View key={index} style={styles.reviewItem}>
    //                     <Text style={styles.reviewAuthor}>{item.email}</Text>
    //                     <Text>{`Rating: ${review.rating}`}</Text>
    //                     <Text>{`Comment: ${review.comment}`}</Text>
    //                 </View>
    //             ))}
    //         </View>
    //         <View style={styles.writeReviewContainer}>
    //             <Text style={styles.sectionTitle}>Write a Review:</Text>
    //             <TextInput
    //                 placeholder="Rating (1-5)"
    //                 keyboardType="numeric"
    //                 value={newReview.rating.toString()}
    //                 onChangeText={(text) => setReview({ ...newReview, rating: parseInt(text) || 0 })}
    //                 style={styles.input1}
    //             />
    //             <TextInput
    //                 placeholder="Comment"
    //                 multiline
    //                 value={newReview.comment}
    //                 onChangeText={(text) => setReview({ ...newReview, comment: text })}
    //                 style={styles.input}
    //             />
    //             <Text style={styles.btn} onPress={handleWriteReview}>Submit Review</Text>
    //         </View>
    //     </ScrollView>
    // );

    const handleBack = () => {
        router.push("/books");
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {book && (
                    <>
                        <TouchableOpacity onPress={handleBack}>
                            <Ionicons name='arrow-back' size={30} color='#333333' style={styles.arrowIcon} />
                        </TouchableOpacity>
                        <View style={styles.bookCont}>
                            <Image style={styles.profileImage} source={{ uri: book.bookImage }} />
                            <View style={styles.descCont}>
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                                <Text style={styles.bookDescription}>{book.description}</Text>
                                <Text style={styles.bookPublish}>{book.Publication_Date}</Text>
                            </View>
                        </View>

                        {/* Review Section */}
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTit}>Reviews</Text>
                        </View>
                        {book.reviews && (
                            <FlatList
                                data={book.reviews}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.reviewContainer}>
                                        <Text style={styles.reviewAuthor}>{item.email}</Text>
                                        <Text style={styles.reviewItem}>{item.review}</Text>
                                    </View>
                                )}
                            />
                        )}

                        {/* Write Review Section */}
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>Write a Review</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Write your review..."
                            value={review}
                            onChangeText={(text) => setReview(text)}
                            multiline
                        />
                        <Text style={styles.btn} onPress={handleWriteReview}>Submit Review</Text>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    bookCont: {
        justifyContent: 'center',
        flexDirection: "column",
        backgroundColor: '#f0f0f0',
        height: 'auto',
        borderRadius: 18,
        padding: 16,
        //marginBottom: 16,
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
    descCont: {
        marginLeft: 10,
        alignItems: "center",
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },
    bookAuthor: {
        fontSize: 20,
        marginBottom: 4,
    },
    bookDescription: {
        fontSize: 18,
        color: "#888",
    },
    subCont: {
        flex: 1,
        marginBottom: "40%"
        //  backgroundColor:"#543"
    },
    editButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },


    container: {
        // backgroundColor: "#EBE3D5",
        backgroundColor: "#fff",
        flex: 1,
        padding: 16,
        marginTop: "5%",

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
    title: {
        width: '100%', // Set the width to 100%
        fontSize: 15,
        fontFamily: "serif",
        fontStyle: "italic",
        fontWeight: "normal",


        color: "#000",
        marginBottom: 8,
        marginLeft: 8
    },

    profileImage: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginBottom: 10,
    },
    detailsContainer: {
        color: "#000",
        marginTop: 20,
        height: "100%",
        marginLeft: "5%",

    },
    sectionTitleContainer: {
        marginTop: 30,
        marginBottom: 10,
    },
    sectionTitle: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold",
        // marginBottom: 8,
        //marginTop: 13,
    },
    sectionTit: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold",
    },
    socialLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,

    },
    reviewContainer: {
        marginTop: 20,
    },

    reviewItem: {
        marginBottom: 10,
    },

    writeReviewContainer: {
        marginTop: 20,
    },
    input: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 8
    },
    btn: {
        backgroundColor: '#e5b91b',
        width: "30%",
        height: 25,
        textAlign: 'center',
        color: '#333333',
        borderRadius: 8,
        fontSize: 16
    },

});
export default bookDetails