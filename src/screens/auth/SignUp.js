import React from 'react';
import { Text } from 'react-native';
import { buttonFill, buttonLight, main } from '../../styles';
import CustomButton from '../../components/CustomButton';

const SignUp = ({handleAuthorisation}) => {
    return (
        <>
            <Text style={main.headerText}>Добро пожаловать</Text>
            <CustomButton title='Войти' styles={buttonFill} onPress={handleAuthorisation}/>
            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>
            <CustomButton title='Регистрация' styles={buttonLight} />
        </>
    )
};

export default SignUp