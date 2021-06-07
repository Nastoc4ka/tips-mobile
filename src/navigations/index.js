import React from 'react';
import {useSelector} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../screens/auth';
import HomeNavigator from "./HomeNavigator";
import {Host} from 'react-native-portalize';

const AppNavContainer = () => {
    const {user} = useSelector((state) => state.authLoginReducer);

    return (
        <Host>
            <NavigationContainer>
                {user?.isLoggedIn ? <HomeNavigator/> : <Auth/>}
            </NavigationContainer>
        </Host>
    );
};

export default AppNavContainer