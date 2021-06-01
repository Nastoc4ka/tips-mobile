import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { styleInput } from '../styles'

const InputPhone = ({ type='none', keyboardType='default', label, placeholder, secure = false, maxLength = 255}) => {
    const [myselection, setSelection] = useState({
            start: 6,
            end: 6
    })

    const [phone, setPhone] = useState('');
    const phoneArr = ['+', '3', '8', ' ', '(', '0']

    const onFocusPhoneInput = () => {
        if (phone.length < 6) setPhone('+38 (0');
    }

    const onChangePhoneInput = (value) => {
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
    }

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
                value={phone}
                selection={myselection}
                onFocus={onFocusPhoneInput}
                onChangeText={onChangePhoneInput}
            />
        </View>
    )
};

export default InputPhone;