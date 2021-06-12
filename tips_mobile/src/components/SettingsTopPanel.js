import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View} from "react-native";

const FocusAwareStatusBar = (props) => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
};

const SettingsTopPanel = ({title, rightButton = null, leftButton, onPress = null, style}) => {
    console.log(title);
    console.log(leftButton);
    console.log(true);
    return (<>
        <FocusAwareStatusBar
            barStyle="dark-content"
            showHideTransition='fade'
            animated={true}
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