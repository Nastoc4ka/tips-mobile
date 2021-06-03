import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { styleInput } from '../styles'

const Input = ({ type='none', keyboardType='default', label, placeholder, autoCapitalize = 'none', secureTextEntry, handleChange, maxLength = 255, children}) => {

    return (
        <View style={styleInput.wrapper}>
            <Text style={styleInput.text}>{label}</Text>
            <View style={styleInput.input}>
            <TextInput
                onChangeText={handleChange}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder} 
                placeholderTextColor='rgba(36, 168, 172, 0.4)' 
                textContentType={type} 
                keyboardType={keyboardType} 
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                style={{width: '90%'}}
            />
                {children}
            </View>
        </View>
    )
};

export default Input;