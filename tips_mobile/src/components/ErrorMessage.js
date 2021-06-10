import React from 'react';
import { View, Text } from 'react-native';
import { errors } from '../styles';

const ErrorMessage = ({message}) => {
    return (
        <View style={errors.wrapper}>
            <Text style={errors.text}>{message}</Text>
        </View>
    )
};

export default ErrorMessage;