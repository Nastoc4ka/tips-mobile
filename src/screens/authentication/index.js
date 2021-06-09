import React from 'react';
import { View, StatusBar } from 'react-native';
import BiometricPopup from './Biometric';
import Password from './Password';

const Authentication = () => {
    return (
        <View>
            <StatusBar
                animated={true}
                backgroundColor='#00A03E'
                barStyle='light-content'
                showHideTransition='fade'
            />
            <Password />
            <BiometricPopup />
        </View>
    )
}

export default Authentication;