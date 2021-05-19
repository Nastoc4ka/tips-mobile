import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const CustomButton = ({ title, styles, onPress }) => {
    return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    )
}

export default CustomButton;