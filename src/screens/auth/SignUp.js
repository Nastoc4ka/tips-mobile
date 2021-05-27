import React from 'react';
import { Text, View, TextInput } from 'react-native';
import {buttonFill, buttonLight, main, styleInput} from '../../styles';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';

const SignUp = ({handleAuthorisation}) => {
    return (
        <>
            <Text style={main.headerTextRegistration}>Добро пожаловать!</Text>
            <View style={{width: '100%', paddingBottom: 58}}>
                <Input
                    type='name'
                    label='Имя'
                    maxLength={40}
                />
                <Input
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
            <CustomButton title='Готово' styles={buttonFill} onPress={handleAuthorisation}/>
        </>
    )
};

export default SignUp