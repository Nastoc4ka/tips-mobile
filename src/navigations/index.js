import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Text} from "react-native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import HomeNavigator from "./HomeNavigator";

const AppNavContainer = () => {

    const isLoggedIn = true;

    return (
        <NavigationContainer>
            {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavContainer