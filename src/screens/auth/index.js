import React, { useState } from 'react';
import { View } from 'react-native';
import {Logo} from '../../assets/icons';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Background from '../../components/Background'
import { styleAuth } from '../../styles'

const Auth = ({ authorisation }) => {
    const [isRegistration, setRegistration] = useState(false);

    const onRegistartionBtnPress = () => {
        setRegistration(true)
    }

    return (
      <Background>
        <Logo
            width='37%'
        />
        <View style={styleAuth.paper}>
            {isRegistration ? <SignUp handleAuthorisation={authorisation}/> : <SignIn handleRegistrationClick={onRegistartionBtnPress} handleAuthorisation={authorisation}/> }
        </View>
      </Background>
    )
}

export default Auth;