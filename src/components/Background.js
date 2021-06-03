import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, Keyboard } from 'react-native';
import { View, KeyboardAvoidingView } from 'react-native';
import { main } from '../styles';
import { Blur } from '../components';

const Background = ({ children }) => {

    return (
        <View style={main.container}>
            {children}
            <View style={main.bottom}></View>
            <Blur />
        </View>
    )
}



export default Background;