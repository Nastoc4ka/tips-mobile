import React from 'react';
import { Text } from 'react-native';
import { styleAuth, buttonFill, buttonLight } from '../../styles';
import CustomButton from '../../components/Button';

const SignUp = ({handleAuthorisation}) => {
    return (
        <>
            <Text style={styleAuth.header}>Добро пожаловать</Text>
            <CustomButton title='Войти' styles={buttonFill} onPress={handleAuthorisation}/>
            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>
            <CustomButton title='Регистрация' styles={buttonLight} />
        </>
    )
}

export default SignUp