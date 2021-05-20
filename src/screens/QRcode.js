import React from 'react';
import {Text, View} from "react-native";
import {styleAuth} from "../styles";
import Background from "../components/Background";

const QRcode =() => {
    return (
        <Background>
            <View style={styleAuth.paper}>
                <Text>Привет из QRcode</Text>
            </View>
        </Background>
    );
};

export default QRcode