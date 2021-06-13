import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from "react-native";
import PersonalData from "./PersonalData";

import Settings from "./Settings";
import {PERSONAL_DATA, SETTINGS} from "../../constants/routeNames";
import {BackButton, CustomButton, SettingsTopPanel} from "../../components";

const SettingsNavigator = () => {

    const Stack = createStackNavigator();

    const onSavePersonalData = () => {
        console.log('saved');
    };

    const getTitleFromScene = ({descriptor: {options: {headerTitle, title}}, route: {name}}) => {
        return headerTitle || title || name;
    };

    const createHeader = ({scene, previous, navigation}) => {
        const title = getTitleFromScene(scene);
        const myHeader = useMemo(() => <SettingsTopPanel
            title={title}
            leftButton={
                <BackButton onPress={navigation.goBack}/>
            }
            rightButton={title === PERSONAL_DATA ? <CustomButton
                title={'Готово'}
                styles={settingsButton}
                onPress={onSavePersonalData}
            /> : null}
            style={styleSettingsTopPanel}
        />, [title]);

        return (
            myHeader
        );
    };


    return (
        <Stack.Navigator
            headerMode={"screen"}
            screenOptions={{
                header: createHeader
            }}
        >
            <Stack.Screen
                name={SETTINGS}
                component={Settings}
            />
            <Stack.Screen
                name={PERSONAL_DATA}
                component={PersonalData}
            />
        </Stack.Navigator>
    );
};

export default SettingsNavigator

const settingsButton = StyleSheet.create({
    button: {
        //justifyContent: 'center',
    },
    text: {
        color: '#0087CB'
    }
});

const styleSettingsTopPanel = StyleSheet.create({
    wrapperSafe: {
        width: '100%',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    header: {
        width: '80%',
        marginTop: 10,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    headerText: {
        fontSize: 17,
        fontWeight: '600',
    }
});