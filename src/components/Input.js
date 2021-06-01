import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { styleInput } from '../styles'

const Input = ({ type='none', keyboardType='default', label, placeholder, secure = false, handleChange, maxLength = 255}) => {

    return (
        <View style={styleInput.wrapper}>
            <Text style={styleInput.text}>{label}</Text>

            <TextInput 
                placeholder={placeholder} 
                placeholderTextColor='rgba(36, 168, 172, 0.4)' 
                textContentType={type} 
                keyboardType={keyboardType} 
                style={styleInput.input} 
                secureTextEntry={secure}
                maxLength={maxLength}
            />
        </View>
    )
};

export default Input;