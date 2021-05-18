import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Text, View} from "react-native";

const HomeStack = createStackNavigator();

const LoginScreen =() => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Привет из login</Text>
        </View>
    );
};

const SignUpScreen =() => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Привет из signUp</Text>
        </View>
    );
};

const AuthNavigator = () => {

    return (
            <HomeStack.Navigator>
                <HomeStack.Screen name="Login" component={LoginScreen} />
                <HomeStack.Screen name="Sign up" component={SignUpScreen} />
            </HomeStack.Navigator>
    );
};

export default AuthNavigator