import React, {useState, useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styleInput} from '../styles'
import ErrorMessage from "./ErrorMessage";

const Input = ({type = 'none', style, value, refs = null, keyboardType = 'default', maxWidth = '100%',
                   onFocus, label, handleBlur = null, placeholder, autoCapitalize = 'none', secureTextEntry,
                   handleChange, maxLength = 255, message, children}) => {

    const [styleCurrentInput, setStyleCurrentInput] = useState(styleInput);

    const onBlur = () => {
        handleBlur && handleBlur(value)
    };

    useEffect(() => {
        style ? setStyleCurrentInput(style) : styleInput;
    }, []);
    return (
        <View style={styleCurrentInput.wrapper}>
            <Text style={styleCurrentInput.text}>{label}</Text>
            <View style={styleCurrentInput.input}>
                <TextInput
                    ref={refs}
                    onBlur={onBlur}
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
                />
                {children}
            </View>
            <ErrorMessage message={message}/>
        </View>
    )
};

export default Input;