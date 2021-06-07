import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Logo } from '../../assets/icons';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Background from '../../components/Background';
import { loginScreenShow, registrationScreenShow } from '../../redux/actions'
import { main } from '../../styles';

const Auth = () => {
    const dispatch = useDispatch();
    const {loginOrRegistrationShow} = useSelector((state) => state.loginRegistrationShow);

    const onRegistrationBtnPress = () => dispatch(registrationScreenShow());

    return (
      <Background>
        <SafeAreaView style={{width: '100%', alignItems: 'center'}}>
          <Logo
            width='37%'
          />
        </SafeAreaView>
        
        <View style={paper}>
          { loginOrRegistrationShow 
            ? <SignIn handleRegistrationClick={onRegistrationBtnPress}/> 
            : <SignUp />
          }
        </View>
      </Background>
    )
};

const paper = StyleSheet.compose({...main.paper, paddingHorizontal: 14});

export default Auth;