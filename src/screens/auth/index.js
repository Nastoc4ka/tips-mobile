import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import {Logo} from '../../assets/icons';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Background from '../../components/Background'
import { styleAuth } from '../../styles'

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
        <View style={styleAuth.paper}>
            {isRegistration ? <SignUp handleAuthorisation={authorisation}/> : <SignIn handleRegistrationClick={onRegistartionBtnPress} handleAuthorisation={authorisation}/> }
        </View>
      </Background>
    )
};

export default Auth;