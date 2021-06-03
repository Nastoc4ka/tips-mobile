import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../screens/auth';
import HomeNavigator from "./HomeNavigator";
import { AuthContext } from '../context/AuthContext';
import AuthModal from '../components/modals/AuthModal';
import ModalWrapper from '../components/modals/ModalWrapper';
import { Host } from 'react-native-portalize';

const AppNavContainer = ({navigation}) => {
    const { isLoggedIn }  = useSelector((state) => state.authLoginReducer);

    // useEffect(() => {
    //     setTimeout(() => setIsLoading(false), 1000)
    // });

    // const initialLoginState = {
    //     isLoading: true,
    //     userName: null,
    //     userToken: null,
    // };

    const authContext = useMemo(() => ({
        signIn: async (foundUser) => {
            // setUserToken('fgkj');
            // setIsLoading(false);
            const userToken = isLoggedIn;
            const userName = foundUser[0].username;

            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            // console.log('user token: ', userToken);
            dispatch({type: 'LOGIN', id: userName, token: userToken});
        },
        signOut: async () => {
            // setUserToken(null);
            // setIsLoading(false);
            try {
                await AsyncStorage.removeItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
        },
        signUp: () => {
            // setUserToken('fgkj');
            // setIsLoading(false);
        },
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        }
    }), []);

    return (
        <AuthContext.Provider value={authContext}>
            <Host>
                <NavigationContainer>
                    {isLoggedIn ? <HomeNavigator/> : <Auth />}
                </NavigationContainer>
            </Host>
        </AuthContext.Provider>
    );
};

export default AppNavContainer