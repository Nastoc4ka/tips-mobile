import React from 'react';
import { View, StatusBar } from 'react-native';
import BiometricPopup from './Biometric';
import Password from './Password';

const Authentication = ({handleAuthSecurity}) => {
    return (
        <View>
            <StatusBar
                animated={true}
                backgroundColor='#00A03E'
                barStyle='light-content'
                showHideTransition='fade'
            />
            <Password handleAuthSecurity={handleAuthSecurity}/>
            <BiometricPopup handleAuthSecurity={handleAuthSecurity}/>
        </View>
    )
};

export default Authentication;