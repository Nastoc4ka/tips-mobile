import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {logoutSaga, pinAuthenticatiedFalse } from "../../redux/actions";
import {BackgroundSettings, CustomButton} from '../../components';
import {styleSettingsButton, styleSettingsScreen} from "../../styles";
import {SettingsBtnIcon} from '../../assets/icons';
import {LANGUAGE, NOTIFICATIONS, PERSONAL_DATA, SECURITY} from "../../constants/routeNames";
import AvatarWrapper from "./AvatarWrapper";

const buttons = [PERSONAL_DATA, SECURITY, NOTIFICATIONS, LANGUAGE];

const Settings = () => {
    const {user} = useSelector(state => state.authLoginReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutSaga());
    };

    const renderButtons = buttons.map((screen) => {
        return <CustomButton
            key={`${screen}screen`}
            leftIcon={<SettingsBtnIcon/>}
            title={screen}
            onPress={() => navigation.navigate(screen)}
            styles={styleSettingsButton}
        />
    });

    return (
        <BackgroundSettings>
            <View style={styleSettingsScreen.container}>
                <View style={styleSettingsScreen.avatar}>
                    <AvatarWrapper
                        source={user.avatar}
                        textAvatar={user.firstName[0]}
                    />
                </View>
            </View>
            <Text style={styleSettingsScreen.avatarLabelName}>{user.firstName}</Text>
            <Text style={styleSettingsScreen.avatarLabelId}>{user.id}</Text>

            {renderButtons}

            <View style={styleSettingsScreen.wrapperBtn}>
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