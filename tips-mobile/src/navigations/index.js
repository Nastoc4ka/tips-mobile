import React from 'react';
import {useSelector} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../screens/auth';
import HomeNavigator from "./HomeNavigator";
import {Host} from 'react-native-portalize';
import Authentication from '../screens/authentication';

const AppNavContainer = () => {
    const authenticated = useSelector((state) => state.systemReducer.authenticated);
    const {user} = useSelector((state) => state.authLoginReducer);

    return (
        <Host>
            { authenticated
                ?
                <NavigationContainer>
                    {user?.success ? <HomeNavigator/> : <Auth/>}
                </NavigationContainer>
                :
                <Authentication />
            }
        </Host>
    );
};

export default AppNavContainer