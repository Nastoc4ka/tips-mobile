import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView, StatusBar, Text, View} from "react-native";

const FocusAwareStatusBar = (props) => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
};

const SettingsTopPanel = ({title, rightButton = null, leftButton, onPress = null, style}) => {
    return (<>
        <FocusAwareStatusBar
            barStyle="dark-content"
            backgroundColor='rgba(249, 249, 249, 0.9)'
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