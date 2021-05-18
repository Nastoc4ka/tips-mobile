import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text, View} from "react-native";
import HomeNavigator from "./HomeNavigator";
import {MAIN} from "../constants/routeNames";

const DrawerStack = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
            <DrawerStack.Navigator>
                <DrawerStack.Screen name={MAIN} component={HomeNavigator} />
            </DrawerStack.Navigator>
    );
};

export default DrawerNavigator