import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {Avatar} from "react-native-elements";
import {useSelector} from "react-redux";
import {BackgroundSettings, CustomButton} from '../../components';
import {SettingsBtnIcon} from '../../assets/icons';
import {NOTIFICATIONS, PERSONAL_DATA, SECURITY} from "../../constants/routeNames";

const Settings = () => {
    const {user} = useSelector(state => state.authLoginReducer);
    const navigation = useNavigation();

    return (
        <BackgroundSettings>
            <View style={styleSettingsScreens.avatar}>
                <Avatar
                    title={user.firstName[0]}
                    rounded
                    containerStyle={{backgroundColor: 'lightgrey'}}
                    size={67}/>
                <Text style={styleSettingsScreens.avatarLabelName}>{user.firstName}</Text>
                <Text style={styleSettingsScreens.avatarLabelId}>{user.id}</Text>
            </View>
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={PERSONAL_DATA}
                onPress={() => navigation.navigate(PERSONAL_DATA)}
                styles={settingsButton}
            />
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={SECURITY}
                onPress={() => navigation.navigate(SECURITY)}
                styles={settingsButton}
            />
            <CustomButton
                leftIcon={<SettingsBtnIcon/>}
                title={NOTIFICATIONS}
                onPress={() => navigation.navigate(NOTIFICATIONS)}
                styles={settingsButton}
            />
        </BackgroundSettings>
    );
};

export default Settings

const settingsButton = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 16,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1,

    },
    text: {
        marginLeft: 15,
        fontSize: 17,
    }
});

const styleSettingsScreens = StyleSheet.create({
    avatar: {
        width: '100%',
        height: 135,
        paddingTop: 34,
        marginBottom: 15,
        alignItems: 'center',
    },
    avatarLabelName: {
        marginTop: 4,
        color: '#454545',
        fontSize: 12,
    },
    avatarLabelId: {
        color: 'grey',
        fontSize: 13,
    }
});