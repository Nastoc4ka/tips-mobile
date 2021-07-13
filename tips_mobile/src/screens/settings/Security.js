import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from "react-native";
import {AuthModal, BackgroundSettings, CustomButton, FilterBirthdateAccessModal} from "../../components";
import {Arrow_right_blue} from "../../assets/icons";
import {Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from "react-redux";
import {changeBirthdateAccessSaga, clearMessage, removePinAuthentication} from '../../redux/actions';
import {styleRightButtonLayout, styleSettingsButton, styleSettingsButtonBlue, styleSettingsScreen} from "../../styles";
import {CHANGE_PASSWORD, PASSWORD_CONFIRMATION, PIN_CODE} from "../../constants/routeNames";
import Authentication from "../authentication";
import {useFocusEffect} from '@react-navigation/native';

const filterOptionsBirthdateAccess = [
    {
        access: 'admin',
        name: 'Только администраторам'
    },
    {
        access: 'all',
        name: 'Всем'
    },
    {
        access: 'staff',
        name: 'Персоналу'
    },
];

const chooseFilteredName = (accessChosen) => {
    const option = filterOptionsBirthdateAccess.find(({access}) => accessChosen === access).name;
    if (option.length > 8) {
        return option.slice(0, 6).concat('...');
    } else {
        return option
    }
};

const FilterButton = ({filterBirthdate}) => {
    return (
        <View style={styleFilterButton.wrapper}>
            <Text style={styleFilterButton.text}>{chooseFilteredName(filterBirthdate)}</Text>
            <Arrow_right_blue/>
        </View>
    )
};

const Security = ({navigation}) => {
    const dispatch = useDispatch();
    const {message} = useSelector(state => state.systemReducer);
    const {filterBirthdate} = useSelector(state => state.authLoginReducer.user);
    const [authenticatedSecurity, setAuthenticatedSecurity] = useState(false);
    const [filterBirthdateAccess, setFilterBirthdateAccess] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const {pin} = useSelector(state => state.pinAuthenticateReducer);

    const toggleSwitch = () => {
        setAuthenticatedSecurity(false);
        if (pin) {
            dispatch(removePinAuthentication());
        } else {
            navigation.navigate(PIN_CODE);
        }
    };

    const togglePinSecurity = <Switch
        style={styleSettingsButton.rightButton}
        trackColor={{false: "lightgrey", true: "#4CD964"}}
        thumbColor={pin ? "#fff" : "lightgrey"}
        ios_backgroundColor="lightgrey"
        onValueChange={toggleSwitch}
        value={pin ? true : false}
    />;

    const showBirthDate = () => {
        setFilterBirthdateAccess(true)
    };

    useEffect(() => {
        setAuthenticatedSecurity(false)
    }, []);

    useEffect(() => {
        console.log(authenticatedSecurity);
    }, [pin, authenticatedSecurity]);

    const handleChooseFilter = (access) => {
        dispatch(changeBirthdateAccessSaga(access));
        setFilterBirthdateAccess(false);
    };

    const handleCloseModal = () => {
        dispatch(clearMessage());
        setFilterBirthdateAccess(false);
        setModalIsVisible(false);
    };
    //useFocus to upgrade modals status in current screen
    useFocusEffect(
        useCallback(() => {
            if (message) setModalIsVisible(true);
        }, [message])
    );


    if (pin && !authenticatedSecurity) {
        return <Authentication handleAuthSecurity={setAuthenticatedSecurity}/>
    }

    return (
        <BackgroundSettings>
            <View style={styleSettingsScreen.container}>
                <CustomButton
                    title={CHANGE_PASSWORD}
                    onPress={() => navigation.navigate(PASSWORD_CONFIRMATION)}
                    styles={styleSettingsButtonBlue}
                />
                <View style={styleSettingsScreen.container}>
                    <CustomButton
                        title='Включить ПИН-код'
                        rightButton={togglePinSecurity}
                        styles={{...styleSettingsButton, ...styleRightButtonLayout}}
                    />
                    <CustomButton
                        title='Поменять ПИН-код'
                        onPress={() => navigation.navigate(PIN_CODE)}
                        styles={styleSettingsButtonBlue}
                    />
                </View>
                <View style={styleSettingsScreen.container}>
                    <CustomButton
                        title='Показывать дату рождения'
                        onPress={showBirthDate}
                        styles={{...styleSettingsButton, ...styleRightButtonLayout}}
                        rightButton={<FilterButton filterBirthdate={filterBirthdate}/>}
                    />
                </View>
            </View>
            <Portal>
                <FilterBirthdateAccessModal
                    isVisible={filterBirthdateAccess}
                    filterOptionsBirthdateAccess={filterOptionsBirthdateAccess}
                    filterBirthdate={filterBirthdate}
                    handleCloseModal={handleCloseModal}
                    handleChooseFilter={handleChooseFilter}
                />
                <AuthModal
                    modalIsVisible={modalIsVisible}
                    message={message}
                    handleCloseModal={handleCloseModal}
                />
            </Portal>
        </BackgroundSettings>
    );
};

export default Security

const styleFilterButton = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 0

    },
    text: {
        marginLeft: 15,
        fontSize: 17,
        marginRight: 2,
        color: 'rgba(69, 69, 69, 0.5)'
    }
});