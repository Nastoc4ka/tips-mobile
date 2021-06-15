import React from 'react';
import {Text, View} from "react-native";
import {styleAuth} from "../styles";
import Background from "../components/Background";

const Settings =() => {
    return (
        <Background>
            <View style={styleAuth.paper}>
                <Text>Привет из Settings</Text>
            </View>
        </Background>
    );
};

export default Settings