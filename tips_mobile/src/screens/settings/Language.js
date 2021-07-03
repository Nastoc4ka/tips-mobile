import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {BackgroundSettings, CustomButton} from "../../components";


import {useSelector} from "react-redux";
import {styleSettingsButton} from "../../styles";

const Language = () => {
    const {user} = useSelector(state => state.authLoginReducer);

    return (
        <BackgroundSettings>
            <CustomButton
                title='Язык'
                styles={styleSettingsButton}
            />
        </BackgroundSettings>
    );
};

export default Language

const styleSettingsScreens = StyleSheet.create({
    paper: {
        width: '89%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
    },
    bottom: {
        position: 'absolute',
        zIndex: -1,
        bottom: 0,
        flex: 1,
        width: 0,
        height: '36%',
        borderTopColor: 'transparent',
        borderTopWidth: Dimensions.get('window').width / 4,
        borderRightColor: 'transparent',
        borderRightWidth: 0,
        borderLeftColor: '#017C31',
        borderLeftWidth: Dimensions.get('window').width
    },
    buttonsTabsWrapper: {
        position: 'absolute',
        zIndex: -11,
        marginTop: -33,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',

    },
    wrapper: {
        marginTop: 35,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
    }
});