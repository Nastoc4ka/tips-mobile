import {LoginError, RegistrationError} from "../errors";
import {catchError, client} from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = (loginData) => {
    return client.post("/auth/signin", loginData)
        .then(async (response) => {
            const jsonValue = JSON.stringify(response.data);
            console.log(response.data);
            await AsyncStorage.setItem('user', jsonValue);
            return response.data;
        })
        .catch(catchError(LoginError));
};

const logout = () => AsyncStorage.removeItem("user");

const register = (registrationData) => {
    return client.post("/auth/signup", registrationData)
        .then(response => response.data)
        .catch(catchError(RegistrationError));
};

export default {
    login,
    logout,
    register,
}