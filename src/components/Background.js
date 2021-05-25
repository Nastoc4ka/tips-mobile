import React from 'react';
import { View } from 'react-native';
import { main } from '../styles';

const Background = ({ children }) => {
    return (
        <View style={main.container}>
            {children}
            <View style={main.bottom}></View>
        </View>
    )
}

export default Background;