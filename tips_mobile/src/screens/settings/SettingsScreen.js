import React from 'react';
import {View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {logoutSaga} from "../../redux/actions";
import {BackgroundSettings, CustomButton, AvatarView} from '../../components';
import {styleSettingsButton, styleSettingsScreen} from "../../styles";
import {SettingsBtnIcon} from '../../assets/icons';
import {LANGUAGE, NOTIFICATIONS, PERSONAL_DATA, SECURITY} from "../../constants/routeNames";

const buttons = [PERSONAL_DATA, SECURITY, NOTIFICATIONS, LANGUAGE];

const SettingsScreen = () => {
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
            <AvatarView source={user.avatar} firstName={user.firstName} id={user.id}/>

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

export default SettingsScreen