import React from 'react';
import { Text, View } from 'react-native';
import { buttonFill, main } from '../../styles';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import { StyleSheet } from 'react-native';
import InputPhone from '../../components/InputPhone';

const SignUp = ({ handleAuthorisation }) => {
    return (
        <>
            <Text style={main.headerTextRegistration}>Добро пожаловать!</Text>
            <View style={{width: '100%'}}>
                <Input
                    type='name'
                    label='Имя'
                    maxLength={40}
                />
                <InputPhone
                    type='telephoneNumber'
                    keyboardType='numeric'
                    label='Телефон'
                    placeholder='+38 (0••) ••• •• ••'
                />
                <Input
                    type='addressCity'
                    label='Город'
                    maxLength={40}
                />
                <Input
                    label='Заведение'
                    maxLength={60}
                />
                <Input
                    type='password'
                    label='Пароль'
                    placeholder='•••••••••'
                    maxLength={60}
                />
                <Input
                    type='password'
                    label='Повторить пороль'
                    placeholder='•••••••••'
                    maxLength={60}
                />
            </View>
            <CustomButton title='Готово' styles={btn} onPress={handleAuthorisation}/>
        </>
    )
};

const btn = StyleSheet.create({
    button: {
        ...buttonFill.button,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    text: buttonFill.text
})

export default SignUp