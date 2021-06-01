import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import {NavigationContainer} from '@react-navigation/native';
import Auth from '../screens/auth';
import HomeNavigator from "./HomeNavigator";
import { AuthContext } from '../context/AuthContext';

const AppNavContainer = ({navigation}) => {
    const isLoggedIn = useSelector((state) => state.authLoginReducer.isLoggedIn);
    const loading = useSelector((state) => state.authLoginReducer.loading);

    // useEffect(() => {
    //     setTimeout(() => setIsLoading(false), 1000)
    // });

    // const initialLoginState = {
    //     isLoading: true,
    //     userName: null,
    //     userToken: null,
    // };

    const authContext = React.useMemo(() => ({
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

    if(loading) return <View><Text>loading...</Text></View>;

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {isLoggedIn ? <HomeNavigator/> : <Auth />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default AppNavContainer