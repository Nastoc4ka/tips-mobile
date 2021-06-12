import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BackButton = ({ title, styles, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
};

export default BackButton;