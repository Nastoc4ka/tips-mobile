import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Logo } from '../../assets/icons';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Background from '../../components/Background'
import { main } from '../../styles'

const Auth = ({ authorisation }) => {
    const [isRegistration, setRegistration] = useState(false);

    const onRegistartionBtnPress = () => {
        setRegistration(true)
    };

    return (
      <Background>
        <SafeAreaView style={{width: '100%', alignItems: 'center'}}>
          <Logo
            width='37%'
          />
        </SafeAreaView>
        
        <View style={paper}>
          {isRegistration ? <SignUp handleAuthorisation={authorisation}/> : <SignIn handleRegistrationClick={onRegistartionBtnPress} handleAuthorisation={authorisation}/> }
        </View>
      </Background>
    )
};

const paper = StyleSheet.compose({...main.paper, paddingHorizontal: 14})

export default Auth;