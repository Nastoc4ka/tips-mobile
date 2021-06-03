import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { styleInput } from '../styles'
import ErrorMessage from "./ErrorMessage";

const InputPhone = ({ label, onBlur, message, handleChange }) => {
    const [selection, setSelection] = useState({
            start: 0,
            end: 0
    });

    const [phone, setPhone] = useState('');
    const phoneArr = ['+', '3', '8', ' ', '(', '0'];

    const onFocusPhoneInput = () => {
        if (phone.length < 6) {
            setPhone('+38 (0');
            setSelection({
                start: 6,
                end: 6
            })
        }
    }

    const onChangePhoneInput = (value) => {
        handleChange(value);
        const valueArr = value.split('');

        for (let i = 0; i < 6; i++) {
            if (valueArr[i] !== phoneArr[i]) return
        }
        
        const ints = valueArr.filter(el => Number.isInteger(+el) && el !== ' ');

        ints.splice(0, 0, phoneArr[0]);
        ints.splice(3, 0, phoneArr[3]);
        ints.splice(4, 0, phoneArr[4]);
        
        if (ints.length > 8) {
            ints.splice(8, 0, ')');
            ints.splice(9, 0, ' ');
        }

        if (ints.length > 13) ints.splice(13, 0, ' ');

        if (ints.length > 16) ints.splice(16, 0, ' ');

        setPhone(ints.join(''));

        setSelection({
            start: ints.length,
            end: ints.length
        })
    };

    return (
        <View style={styleInput.wrapper}>
            <Text style={styleInput.text}>{label}</Text>
            
            <TextInput
                onBlur={onBlur}
                maxLength={19}
                placeholder='+38 (0••) ••• •• ••'
                placeholderTextColor='rgba(36, 168, 172, 0.4)'
                textContentType='telephoneNumber'
                keyboardType='numeric'
                style={styleInput.input} 
                value={phone}
                selection={selection}
                onFocus={onFocusPhoneInput}
                onChangeText={onChangePhoneInput}
            />
            <ErrorMessage message={message}/>
        </View>
    )
};

export default InputPhone;