import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, View} from "react-native";
import Main from "../screens/Main";
import {Icn_home, Icn_tips, Icn_settings, Icn_revievs, Icn_qrcode} from '../assets/icons';
import {COMMENTS, MAIN, QR_CODE, SETTINGS, TIPS} from "../constants/routeNames";
import Background from '../components/Background';
import { styleAuth } from '../styles';

const Tab = createBottomTabNavigator();

const TipsScreen =() => {
    return (
        <Background>
            <View style={styleAuth.paper}>
                <Text>Привет из чаевых</Text>
            </View>
        </Background>
    );
};

const CommentsScreen =() => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Привет из отзывов</Text>
        </View>
    );
};

const QRcodeScreen =() => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Привет из qr code</Text>
        </View>
    );
};

const Settings =() => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Привет из настроек</Text>
        </View>
    );
};

const HomeNavigator = () => {

    return (
            <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === MAIN) {
                                return (
                                    <Icn_home
                                        size={size}
                                        fill={color}
                                    />
                                );
                            } else if (route.name === COMMENTS) {
                                return (
                                    <Icn_revievs
                                        size={size}
                                        stroke={color}
                                    />
                                );
                            } else if (route.name === QR_CODE) {
                                return (
                                    <Icn_qrcode
                                        size={size}
                                        stroke={color}
                                        fill={color}
                                    />
                                );
                            } else if (route.name === TIPS) {
                                return (
                                    <Icn_tips
                                        size={size}
                                        fill={color}
                                    />
                                );
                            } else if (route.name === SETTINGS) {
                                return (
                                    <Icn_settings
                                        size={size}
                                        fill={color}
                                    />
                                );
                            }
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#FFA200',
                        inactiveTintColor: '#24A8AC',
                        tabStyle: {
                            paddingTop: 8,
                        }
                    }}
                >

                    <Tab.Screen name={TIPS} component={TipsScreen} />
                    <Tab.Screen name={COMMENTS} component={CommentsScreen} />
                    <Tab.Screen name={QR_CODE} component={QRcodeScreen} />
                    <Tab.Screen name={MAIN} component={Main} />
                    <Tab.Screen name={SETTINGS} component={Settings} />
            </Tab.Navigator>
    );
};

export default HomeNavigator