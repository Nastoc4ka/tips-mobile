import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from "react-redux";
import {logoutSaga} from "../../redux/actions";
import {BackgroundSettings, CustomButton} from '../../components';
import { styleSettingsScreen, styleSettingsButton } from "../../styles";
import {SettingsBtnIcon} from '../../assets/icons';
import {NOTIFICATIONS, PERSONAL_DATA, SECURITY} from "../../constants/routeNames";
import AvatarWrapper from "./AvatarWrapper";

const Settings = () => {
    const {user} = useSelector(state => state.authLoginReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutSaga())
    };

    return (
        <BackgroundSettings>
            <View style={styleSettingsScreen.avatar}>
                <AvatarWrapper
                    source={user.avatar}
                    textAvatar={user.firstName[0]}
                />
            </View>
            <Text style={styleSettingsScreen.avatarLabelName}>{user.firstName}</Text>
            <Text style={styleSettingsScreen.avatarLabelId}>{user.id}</Text>
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={PERSONAL_DATA}
                onPress={() => navigation.navigate(PERSONAL_DATA)}
                styles={styleSettingsButton}
            />
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={SECURITY}
                onPress={() => navigation.navigate(SECURITY)}
                styles={styleSettingsButton}
            />
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={NOTIFICATIONS}
                onPress={() => navigation.navigate(NOTIFICATIONS)}
                styles={styleSettingsButton}
            />
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={'Язык'}
                styles={styleSettingsButton}
            />
            <View style={styleSettingsScreens.wrapperBtn}>
                <CustomButton
                    leftIcon={<SettingsBtnIcon/>}
                    title={'О проекте'}
                    styles={styleSettingsButton}
                />
                <CustomButton
                    leftIcon={<SettingsBtnIcon/>}
                    title={'Помощь'}
                    styles={styleSettingsButton}
                />
                <CustomButton
                    leftIcon={<SettingsBtnIcon/>}
                    onPress={logout}
                    title={'Выход'}
                    styles={styleSettingsButton}
                />
            </View>

        </BackgroundSettings>
    );
};

export default Settings

const styleSettingsScreens = StyleSheet.create({
    wrapperBtn: {
        width: '100%',
        marginTop: 36,
    }
});