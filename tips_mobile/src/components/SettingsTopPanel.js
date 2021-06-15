import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View} from "react-native";

const FocusAwareStatusBar = (props) => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
};

const SettingsTopPanel = ({title, rightButton = null, leftButton, onPress = null, style}) => {
    return (<>
        <FocusAwareStatusBar
            animated={true}
            backgroundColor='#F9F9F9'
            barStyle='dark-content'
            showHideTransition='fade'
        />
        <SafeAreaView style={style.wrapperSafe}>
            <View style={style.header}>
                {leftButton}
                <Text style={style.headerText}>{title}</Text>
                <View>
                    {rightButton}
                </View>
            </View>
        </SafeAreaView>
    </>)
};

export default SettingsTopPanel;