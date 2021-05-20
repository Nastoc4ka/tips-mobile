import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from "../screens/main";
import Tips from "../screens/Tips";
import QRcode from "../screens/QRcode";
import Settings from "../screens/Settings";
import Comments from "../screens/Comments";
import {Icn_home, Icn_tips, Icn_settings, Icn_revievs, Icn_qrcode} from '../assets/icons';
import {COMMENTS, MAIN, QR_CODE, SETTINGS, TIPS} from "../constants/routeNames";

const Tab = createBottomTabNavigator();

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

                    <Tab.Screen name={TIPS} component={Tips} />
                    <Tab.Screen name={COMMENTS} component={Comments} />
                    <Tab.Screen name={QR_CODE} component={QRcode} />
                    <Tab.Screen name={MAIN} component={Main} />
                    <Tab.Screen name={SETTINGS} component={Settings} />
            </Tab.Navigator>
    );
};

export default HomeNavigator