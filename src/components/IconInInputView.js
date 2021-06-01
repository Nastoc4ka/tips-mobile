import React from 'react';
import { StyleSheet, View } from 'react-native';

const IconInInputView = ({ children }) => {
    return (
        <View style={styles.wrapper}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        ...Platform.select({
            ios: {
                position: "absolute", 
                bottom: -3,
                right: -30, 
            },
            android: {
                alignSelf: 'flex-end',
            }
        }),
    }
})

export default IconInInputView;