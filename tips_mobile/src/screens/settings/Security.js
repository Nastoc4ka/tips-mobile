import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from "react-native";
import {BackgroundSettings, CustomButton, FilterBirthdateAccessModal} from "../../components";
import {Arrow_right_blue} from "../../assets/icons";
import {Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from "react-redux";
import {changeBirthdateAccess, removePinAuthentication} from '../../redux/actions';
import {styleRightButtonLayout, styleSettingsButton, styleSettingsButtonBlue, styleSettingsScreen} from "../../styles";
import {CHANGE_PASSWORD, PASSWORD_CONFIRMATION, PIN_CODE} from "../../constants/routeNames";
import Authentication from "../authentication";

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
    }
};

const Security = ({navigation}) => {
    const dispatch = useDispatch();
    const {filterBirthdate} = useSelector(state => state.authLoginReducer.user);
    const [authenticatedSecurity, setAuthenticatedSecurity] = useState(false);
    const [filterBirthdateAccess, setFilterBirthdateAccess] = useState(false);
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

    const filterButton = <View style={styleFilterButton.wrapper}>
        <Text style={styleFilterButton.text}>{chooseFilteredName(filterBirthdate)}</Text>
        <Arrow_right_blue/>
    </View>;

    useEffect(() => {}, [pin]);

    useEffect(() => {
        setAuthenticatedSecurity(false)
    }, []);

    if (pin && !authenticatedSecurity) {
        return <Authentication handleAuthSecurity={setAuthenticatedSecurity}/>
    }

    const handleChooseFilter = (access) => {
        dispatch(changeBirthdateAccess(access));
        setFilterBirthdateAccess(false);
    };

    const handleCloseModal = () => {
        setFilterBirthdateAccess(false);
    };

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
                        rightButton={filterButton}
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