import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {Avatar} from "react-native-elements";
import {useSelector} from "react-redux";
import { CustomButton } from '../../components';
import {PERSONAL_DATA} from "../../constants/routeNames";

const Settings = () => {
    const {user} = useSelector(state => state.authLoginReducer);
    const navigation = useNavigation();

    return (
        <View style={styleSettingsScreens.topPanel}>
            <View style={styleSettingsScreens.container}>
                <View style={styleSettingsScreens.avatar}>
                    <Avatar
                        title={user.name[0]}
                        rounded
                        containerStyle={{backgroundColor: 'lightgrey'}}
                        size={67}
                        source={user.avatar}/>
                    <Text style={styleSettingsScreens.avatarLabelName}>{user.name}</Text>
                    <Text style={styleSettingsScreens.avatarLabelId}>{user.id}</Text>
                </View>
                <CustomButton
                    title='Персональные данные'
                    onPress={() => navigation.navigate(PERSONAL_DATA)}
                    styles={settingsButton}
                />
            </View>
        </View>
    );
};

export default Settings

const settingsButton = StyleSheet.create({
    button: {},
    text: {}
});

const styleSettingsScreens = StyleSheet.create({
    topPanel: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'rgba(249, 249, 249, 0.9)'
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#E5E5E5'
    },
    avatar: {
        flex: 1,
        width: '100%',
        height: 135,
        paddingTop: 34,
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
    },
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