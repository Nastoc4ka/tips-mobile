import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from "./HomeNavigator";
import {Host} from 'react-native-portalize';
import Authentication from '../screens/authentication';
import Auth from '../screens/auth';
import {getLocalDataSaga} from "../redux/actions";

const AppNavContainer = () => {
    const dispatch = useDispatch();
    const {success, pin} = useSelector((state) => state.pinAuthenticateReducer);
    const {user} = useSelector((state) => state.authLoginReducer);


    useEffect(() => {
        dispatch(getLocalDataSaga());
    }, []);

    useEffect(() => {
    }, [success, pin, user]);
    return (
        <Host>
            {
                <NavigationContainer>
                    {user?.success ?
                        (pin ?
                            (success ?
                                <HomeNavigator/> :
                                <Authentication/>) :
                            <HomeNavigator/>) :
                        <Auth/>}
                </NavigationContainer>
            }
        </Host>
    );
};

export default AppNavContainer