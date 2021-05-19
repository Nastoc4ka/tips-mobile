import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { buttonFill, buttonLight } from '../../styles';
import CustomButton from '../../components/Button';

const SignUp = ({handleAuthorisation}) => {
    return (
        <>
            <Text style={header}>Добро пожаловать</Text>
            <CustomButton title='Войти' styles={buttonFill} onPress={handleAuthorisation}/>
            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>
            <CustomButton title='Регистрация' styles={buttonLight} />
        </>
    )
}

const header = StyleSheet.create({
    fontSize: 30,
    paddingTop: 34,
})

export default SignUp