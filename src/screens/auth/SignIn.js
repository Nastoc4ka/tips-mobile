import React from 'react';
import { Text, View } from 'react-native';
import { styleAuth, buttonFill, buttonLight } from '../../styles';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';

const SignIn = ({ handleRegistrationClick, handleAuthorisation }) => {
    return (
        <>
            <Text style={styleAuth.header}>Привет</Text>
            <View style={{width: '91%', paddingBottom: 58}}>

            <View style={{width: '100%'}}>
                <Input type='telephoneNumber' keyboardType='numeric' label='Телефон'/>
            </View>

            <View style={{width: '100%'}}>
                <Input type='password' keyboardType='numeric' label='Пароль'/>
            </View>
            </View>

            <CustomButton title='Войти' styles={buttonFill} onPress={handleAuthorisation}/>
            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>
            <CustomButton title='Регистрация' styles={buttonLight} onPress={handleRegistrationClick}/>
        </>
    )
}

export default SignIn