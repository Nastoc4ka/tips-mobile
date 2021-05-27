import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '../screens/auth';
import HomeNavigator from "./HomeNavigator";

const AppNavContainer = () => {
    const [isLoggedIn, setIsLogin] = useState(false);

    const authorisation = () => {
        setIsLogin(true);
    };

    return (
        <NavigationContainer>
                {isLoggedIn ? <HomeNavigator /> : <Auth authorisation={authorisation}/>}
        </NavigationContainer>
    );
};

export default AppNavContainer