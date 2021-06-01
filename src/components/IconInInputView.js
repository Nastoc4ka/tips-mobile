import React from 'react';
import { View } from 'react-native';

const IconInInputView = ({ children }) => {
    return (
        <View style={{position: "absolute", right: -30, bottom: -3}}>
            {children}
        </View>
    )
};

export default IconInInputView;