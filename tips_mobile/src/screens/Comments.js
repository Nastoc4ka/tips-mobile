import React from 'react';
import {Text, View} from "react-native";
import {styleAuth} from "../styles";
import Background from "../components/Background";

const Comments =() => {
    return (
        <Background>
            <View style={styleAuth.paper}>
                <Text>Привет из Comments</Text>
            </View>
        </Background>
    );
};

export default Comments