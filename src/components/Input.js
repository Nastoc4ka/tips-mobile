import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { styleInput } from '../styles'

const Input = ({ type, keyboardType, label, placeholder, secure = false, handleChange}) => {
    const [phone, setPhone] = useState('');

    const phoneArr = ['+', '3', '8', ' ', '(', '0', '•', '•', ')', ' ', '•', '•', '•', ' ', '•', '•', ' ', '•', '•']


    const [cursor, setSelection] = useState({
        selection: {
            start: 6,
            end: 6
        }
    })

    const onFocusPhoneInput = () => {
        setPhone('+38 (0');
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
            ints.splice(8, 0, phoneArr[8]);
            ints.splice(9, 0, phoneArr[9]);
        }

        if (ints.length > 13) ints.splice(13, 0, phoneArr[13]);

        if (ints.length > 16) ints.splice(16, 0, phoneArr[16]);

        if (phone.length - ints.length === -2) {
            setSelection({
                selection: {
                    start: cursor.selection.start + 1,
                    end: cursor.selection.end + 1
                }
            })
        }

        if (phone.length - ints.length === -3) {
            setSelection({
                selection: {
                    start: cursor.selection.start + 2,
                    end: cursor.selection.end + 2
                }
            })
        }

        setPhone(ints.join(''))
    }

    return (
        <View style={{width: '100%'}}>
            <Text style={styleInput.text}>{label}</Text>

            <TextInput 
                placeholder={placeholder} 
                placeholderTextColor='rgba(36, 168, 172, 0.4)' 
                textContentType={type} 
                keyboardType={keyboardType} 
                style={styleInput.input} 
                secureTextEntry={secure} 
                value={phone} 
                onFocus={onFocusPhoneInput} 
                onChangeText={onChangePhoneInput}
                selection={cursor.selection}
                onSelectionChange={({ nativeEvent: { selection } }) => {
                    if (selection.start >= 6) {
                        setSelection({selection})
                    }
                }}
                maxLength={19}
            />
        </View>
    )
}

export default Input;