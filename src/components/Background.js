import React from 'react';
import { View } from 'react-native';
import { styleBackground } from '../styles';

const Background = ({ children }) => {
    return (
        <View style={styleBackground.container}>
            {children}
            <View style={styleBackground.bottom}></View>
        </View>
    )
}

export default Background;