import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BackArrowBlack} from '../assets/icons';

const BackButton = ({onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View style={{width: 25}}>
                <BackArrowBlack/>
            </View>
        </TouchableOpacity>
    )
};

export default BackButton;