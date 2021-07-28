import React from 'react';
import {Text, View} from "react-native";
import AvatarWrapper from './AvatarWrapper';
import {styleSettingsScreen} from "../styles";

const AvatarView = ({source, firstName, id}) => {
    return (<>
        <View style={styleSettingsScreen.container}>
            <View style={styleSettingsScreen.avatar}>
                <AvatarWrapper
                    source={source}
                    textAvatar={firstName[0]}
                />
            </View>
        </View>
        <Text style={styleSettingsScreen.avatarLabelName}>{firstName}</Text>
        <Text style={styleSettingsScreen.avatarLabelId}>{id}</Text>
    </>)
};

export default AvatarView;