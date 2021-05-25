import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styleAuth, buttonFill, buttonLight } from '../../styles';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';

const SignIn = ({ handleRegistrationClick, handleAuthorisation }) => {
    const [phone, setPhone] = useState('');

    const onFocusPhoneInput = () => {
        setPhone('+38 (0');
    }

    return (
        <>
            <Text style={styleAuth.headerSignIn}>Привет</Text>

            <View style={{width: '100%', paddingBottom: 58}}>
                <Input 
                    type='telephoneNumber' 
                    keyboardType='numeric' 
                    label='Телефон' 
                    placeholder='+38 (0••) ••• •• ••'
                />

                {/* <Input type='password' keyboardType='numeric' label='Пароль' placeholder='••••••••' secure={true}  handleFocus={onFocusPhoneInput}/> */}
            </View>

            <CustomButton title='Войти' styles={buttonFill} onPress={handleAuthorisation}/>
            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>
            <CustomButton title='Регистрация' styles={buttonLight} onPress={handleRegistrationClick}/>
        </>
    )
};

export default SignIn