import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./DrawerNavigator";
import Auth from '../screens/auth';

const AppNavContainer = () => {
    const [isLoggedIn, setIsLogin] = useState(false);

    const authorisation = () => {
        setIsLogin(true);
    };

    return (
        <NavigationContainer>
                {isLoggedIn ? <DrawerNavigator /> : <Auth authorisation={authorisation}/>}
        </NavigationContainer>
    );
};

export default AppNavContainer