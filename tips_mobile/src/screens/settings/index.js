import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from "react-native";
import PersonalDataScreen from "./PersonalDataScreen";
import SecurityScreen from "./SecurityScreen";
import NotificationsScreen from "./NotificationsScreen";
import {useDispatch} from 'react-redux';
import { CHANGE_PASSWORD, PIN_CODE, LANGUAGE, NOTIFICATIONS, PERSONAL_DATA,
    SECURITY, SETTINGS, SMS_CONFIRMATION, PASSWORD_CONFIRMATION } from "../../constants/routeNames";
import {styleSettingsHeaderButtonRight, styleSettingsHeader} from '../../styles';
import {BackButton, CustomButton, SettingsTopPanel} from "../../components";
import {sendDataActive} from "../../redux/actions";
import ChangePasswordScreen from "./ChangePasswordScreen";
import PINcodeScreen from "./PINcodeScreen";
import LanguageScreen from "./LanguageScreen";
import SettingsScreen from "./SettingsScreen";
import passwordConfirmationScreen from "./passwordConfirmationScreen";
import SmsConfirmationScreen from "./SmsConfirmationScreen";

const screens = [
    {name: SETTINGS, component: SettingsScreen},
    {name: PERSONAL_DATA, component: PersonalDataScreen},
    {name: SECURITY, component: SecurityScreen},
    {name: NOTIFICATIONS, component: NotificationsScreen},
    {name: CHANGE_PASSWORD, component: ChangePasswordScreen},
    {name: PIN_CODE, component: PINcodeScreen},
    {name: LANGUAGE, component: LanguageScreen},
    {name: PASSWORD_CONFIRMATION, component: passwordConfirmationScreen},
    {name: SMS_CONFIRMATION, component: SmsConfirmationScreen},
];

const SettingsNavigator = () => {

    const dispatch = useDispatch();
    const Stack = createStackNavigator();

    const onSavePersonalData = () => {
        dispatch(sendDataActive());
    };

    const getTitleFromScene = ({descriptor: {options: {headerTitle, title}}, route: {name}}) => {
        return headerTitle || title || name;
    };

    const createHeader = ({scene, previous, navigation}) => {
        const title = getTitleFromScene(scene);
        const myHeader = useMemo(() => <SettingsTopPanel
            title={title}
            leftButton={<BackButton onPress={title === CHANGE_PASSWORD ? () => navigation.navigate(SECURITY) : navigation.goBack}/>}
            rightButton={title === PERSONAL_DATA ? <CustomButton
                title={'Готово'}
                styles={styleSettingsHeaderButtonRight}
                onPress={onSavePersonalData}
            /> : null}
            style={styleSettingsHeader}
        />, [title]);

        return (
            myHeader
        );
    };

    const stackScreens = screens.map(({name, component}) => <Stack.Screen
        key={`${name}${component}`}
        name={name}
        component={component}
    />);

    return (
        <Stack.Navigator
            headerMode={"screen"}
            screenOptions={{
                header: createHeader,
            }}
        >

            {stackScreens}

        </Stack.Navigator>
    );
};

export default SettingsNavigator