import React, { useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { styleAuth, buttonFill, buttonLight } from '../../styles';
import CustomButton from '../../components/CustomButton';
import InputPhone from '../../components/InputPhone';

const SignIn = ({ handleRegistrationClick, handleAuthorisation }) => {
    const viewRef = useRef();
    return (
        <>
            <Text style={styleAuth.headerSignIn}>Привет</Text>
            <View style={{width: '100%', paddingBottom: 58}}>
                <InputPhone 
                    type='telephoneNumber' 
                    keyboardType='numeric' 
                    label='Телефон' 
                    placeholder='+38 (0••) ••• •• ••'
                    maxLength={19}
                />

                {/* <Input type='password' keyboardType='numeric' label='Пароль' placeholder='••••••••' secure={true}  handleFocus={onFocusPhoneInput}/> */}
            </View>

            <CustomButton title='Войти' styles={buttonFill} onPress={handleAuthorisation}/>
            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>
            <CustomButton title='Регистрация' styles={buttonLight} onPress={handleRegistrationClick}/>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center"
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });

export default SignIn