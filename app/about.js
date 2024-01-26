import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const about = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Us</Text>

            <Text style={styles.txt}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi a diam urna. Quisque ut magna et massa efficitur efficitur euismod non urna.
                Nunc bibendum facilisis fringilla. Etiam faucibus dictum ante non consectetur.
                Curabitur ornare tortor sit amet dolor iaculis, et imperdiet mauris commodo.
                Nunc porttitor diam sit amet erat luctus, in eleifend velit mollis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi a diam urna. Quisque ut magna et massa efficitur efficitur euismod non urna.
                Nunc bibendum facilisis fringilla. Etiam faucibus dictum ante non consectetur.
                Curabitur ornare tortor sit amet dolor iaculis, et imperdiet mauris commodo.
                Nunc porttitor diam sit amet erat luctus, in eleifend velit mollis.
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 25
    },
    title: {
        fontSize: 25,
        margin: 15
    },
    txt: {
        fontSize: 18,
        margin: 5,
        padding: 5
    },
});
export default about