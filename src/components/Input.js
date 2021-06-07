import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styleInput} from '../styles'
import ErrorMessage from "./ErrorMessage";

const Input = ({type = 'none', value, refs = null, keyboardType = 'default', maxWidth = '100%',
                   onFocus, label, placeholder, autoCapitalize = 'none', secureTextEntry,
                   handleChange, maxLength = 255, message, children, handleBlur = null}) => {
    
    const onBlur = (e) => {
        console.log(e)
    }
    return (
        <View style={styleInput.wrapper}>
            <Text style={styleInput.text}>{label}</Text>
            <View style={styleInput.input}>
                <TextInput
                    ref={refs}
                    value={value}
                    onFocus={onFocus}
                    onChangeText={handleChange}
                    autoCapitalize={autoCapitalize}
                    placeholder={placeholder}
                    placeholderTextColor='rgba(36, 168, 172, 0.4)'
                    textContentType={type}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    style={{maxWidth, paddingVertical: 0}}
                    onBlur={onBlur}
                />
                {children}
            </View>
            <ErrorMessage message={message}/>
        </View>
    )
};

export default Input;