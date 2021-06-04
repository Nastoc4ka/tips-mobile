import React from 'react';
import { View, Text } from 'react-native';
import { errors } from '../styles';

const ErrorMessage = ({message, styles = []}) => {
    return (
        <View style={[errors.wrapper, {...styles.wrapper}]}>
            <Text numberOfLines={5} style={[errors.text, {...styles.text}]}>{message}</Text>
        </View>
    )
};

export default ErrorMessage;