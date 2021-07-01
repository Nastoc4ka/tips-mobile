import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from "react-native";
import {BackgroundSettings, CustomButton} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import { removePinAuthentication } from '../../redux/actions';
import {styleSettingsButton, styleSettingsScreen, styleSettingsButtonBlue} from "../../styles";
import {CHANGE_PASSWORD, PASSWORD_CONFIRMATION, PIN_CODE} from "../../constants/routeNames";
import Authentication from "../authentication";

const Security = ({navigation}) => {
    const dispatch = useDispatch();
    const [authenticatedSecurity , setAuthenticatedSecurity] = useState(false);
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
        console.log('show birth date');
    };

    const filterButton = <></>;

    useEffect(() => {}, [pin]);

    useEffect(() => {
        setAuthenticatedSecurity(false)
    }, []);

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
                        styles={{...styleSettingsButton, ...styles}}
                    />
                    <CustomButton
                        title='Поменять ПИН-код'
                        onPress={() => navigation.navigate(PIN_CODE)}
                        styles={styleSettingsButtonBlue}
                    />
                </View>
                <View style={styleSettingsScreen.container}>
                    <CustomButton
                        title='Показывать мою дату рождения'
                        onPress={showBirthDate}
                        styles={styleSettingsButton}
                        rightButton={filterButton}
                    />
                </View>
            </View>
        </BackgroundSettings>
    );
};

export default Security

const styles = StyleSheet.create({
    rightButtonLayout: {
        justifyContent: 'space-between'
    }
});


const styleSecurityScreens = StyleSheet.create({
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