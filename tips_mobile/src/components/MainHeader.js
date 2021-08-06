import React from 'react';
import {View, SafeAreaView, TouchableHighlight, Text} from "react-native";
import {main, styleMainScreens} from "../styles";
import {Back, Icn_filters} from "../assets/icons";

const MainHeader = ({activePanel, style}) => {
    return <SafeAreaView style={main.wrapperHeader}>
        <View style={style}>
            <TouchableHighlight>
                <Back/>
            </TouchableHighlight>

            <Text style={styleMainScreens.text}>{activePanel}</Text>

            <TouchableHighlight>
                <Icn_filters/>
            </TouchableHighlight>
        </View>
    </SafeAreaView>
};

export default MainHeader;