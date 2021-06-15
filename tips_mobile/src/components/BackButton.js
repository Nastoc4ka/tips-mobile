import React from 'react';
import { TouchableOpacity } from 'react-native';
import {BackArrowBlack} from '../assets/icons';

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <BackArrowBlack />
        </TouchableOpacity>
    )
};

export default BackButton;