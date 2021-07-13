import {LoginError, RegistrationError, PasswordConfirmationError} from "../errors";
import {catchError, client} from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHeader from "./authHeader";

const login = (loginData) => {
    return client.post("/auth/signin", loginData)
        .then(async (response) => {
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem('user', jsonValue);
            return response.data;
        })
        .catch(catchError(LoginError));
};

const confirmCurrentPassword = async (password) => {
    return client.post("/auth/confirmPassword", {password}, {headers: await authHeader()})
        .then(async (response) => {
            return response.data;
        })
        .catch(catchError(PasswordConfirmationError));
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
    confirmCurrentPassword,

}