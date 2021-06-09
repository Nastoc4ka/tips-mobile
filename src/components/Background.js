import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StatusBar } from 'react-native';
import { main } from '../styles';
import { Blur, Loading } from '../components';

const Background = ({ children }) => {

    return (
        <View style={main.container}>
            {children}
            <StatusBar
                    animated={true}
                    backgroundColor='#00A03E'
                    barStyle='light-content'
                    showHideTransition='fade'
            />
            <View style={main.bottom}></View>
            <Blur />
            <Loading />
        </View>
    )
}



export default Background;