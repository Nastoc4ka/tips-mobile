import React from 'react';
import {Text, View} from "react-native";
import {styleAuth} from "../styles";
import Background from "../components/Background";

const Tips =() => {
    return (
        <Background>
            <View style={styleAuth.paper}>
                <Text>Привет из чаевых</Text>
            </View>
        </Background>
    );
};

export default Tips