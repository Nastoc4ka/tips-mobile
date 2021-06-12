import React from 'react';
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
console.log('here');
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={SETTINGS}
                component={Settings}
                // screenOptions={{ title: SETTINGS,
                //     headerLeft: ({navigation}) => (
                //         <BackButton onPress={() => navigation.goBack(null)}/>
                //     )
                options={{
                    headerMode: 'float',
                    header: ({scene, previous, navigation}) => {
                    const title= scene.route.name;
                    console.log('title', title);
                        return (
                            <SettingsTopPanel
                                title={title}
                                leftButton={
                                    <BackButton onPress={navigation.goBack}/>
                                }
                                style={styleSettingsTopPanel}
                            />
                        );
                    }
                }}
            />
            <Stack.Screen
                name={PERSONAL_DATA}
                component={PersonalData}
                // screenOptions={{ title: PERSONAL_DATA,
                //     headerRight: () => (
                //         <CustomButton
                //             onPress={onSavePersonalData}
                //             title='Готово'
                //             styles={settingsButton}
                //         />),
                //     headerLeft: ({navigation}) => (
                //                       <BackButton onPress={navigation.goBack}/>
                //     )
                options={{
                    headerMode: 'float',
                    header: ({scene, previous, navigation}) => {
                        return (
                            <SettingsTopPanel
                                title={PERSONAL_DATA}
                                leftButton={
                                    <BackButton onPress={navigation.goBack}/>
                                }
                                rightButton={
                                    <CustomButton
                                        title={'Готово'}
                                        styles={settingsButton}
                                        onPress={onSavePersonalData}
                                    />
                                }
                                style={styleSettingsTopPanel}
                            />
                        );
                    }
                }}
            />
            {/*<Stack.Screen*/}
            {/*name={NOTIFICATIONS}*/}
            {/*component={PersonalData}*/}
            {/*options={{ title: 'PERSONAL_DATA1' }}*/}
            {/*/>*/}
            {/*<Stack.Screen*/}
            {/*name={SECURITY}*/}
            {/*component={PersonalData}*/}
            {/*options={{ title: 'PERSONAL_DATA2' }}*/}
            {/*/>*/}
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