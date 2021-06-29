import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, styles, onPress, leftIcon = null, rightButton = null }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.rightButtonLayout]} onPress={onPress}>
            {leftIcon}
            <Text style={styles.text}>{title}</Text>
            {rightButton}
        </TouchableOpacity>
    )
};

export default CustomButton;