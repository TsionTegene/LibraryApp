import { doc, updateDoc, setDoc, serverTimestamp, collection, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const borrowBook = async (bookId, userId) => {
    const bookRef = doc(db, 'books', bookId);

    try {
        // Check if the book is available (you might have additional checks)
        const bookSnapshot = await getDoc(bookRef);
        const bookData = bookSnapshot.data();

        if (!bookData || bookData.status !== 'available') {
            throw new Error('The book is not available for borrowing.');
        }

        // Update book status to 'borrowed' and associate it with the user
        const borrowedBookData = {
            status: 'borrowed',
            borrowerId: userId,
            borrowedAt: serverTimestamp(),
        };

        // Update the book document using updateDoc
        await updateDoc(bookRef, borrowedBookData);

        // You might want to create a 'borrowedBooks' collection for the user to keep track
        // of books they've borrowed. This is just an example; adjust it to your database structure.
        const borrowedBooksRef = collection(db, 'users', userId, 'borrowedBooks');
        await setDoc(doc(borrowedBooksRef, bookId), borrowedBookData);

        // Return success or additional information
        return { success: true, message: 'Book successfully borrowed.' };
    } catch (error) {
        // Handle errors, log them, or return an error message
        console.error('Error borrowing book:', error.message);
        return { success: false, message: error.message };
    }
};

export default borrowBook;
