// AddReview.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddReview = ({ onAddReview }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleAddReview = () => {
        // Validate input
        if (!rating || !comment) {
            // Handle validation error
            return;
        }

        // Call the parent component's callback
        onAddReview({
            rating: parseInt(rating),
            comment,
        });

        // Clear input fields
        setRating('');
        setComment('');
    };

    return (
        <View>
            <TextInput
                placeholder="Rating (1-5)"
                value={rating}
                onChangeText={(text) => setRating(text)}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Your review"
                value={comment}
                onChangeText={(text) => setComment(text)}
                multiline
            />
            <Button title="Add Review" onPress={handleAddReview} />
        </View>
    );
};

export default AddReview;
