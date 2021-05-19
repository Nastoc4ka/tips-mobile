import React from 'react';
import { TextInput, Text } from 'react-native';
import { styleInput } from '../styles'

const Input = ({ type, keyboardType, label }) => {
    return (
        <>
            <Text style={styleInput.text}>{label}</Text>
            <TextInput placeholder='+38 (0' placeholderTextColor='rgba(36, 168, 172, 0.4)' returnKeyType={type} keyboardType={keyboardType} style={styleInput.input}/>
        </>
    )
}

export default Input;