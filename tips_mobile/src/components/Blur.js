import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BlurView } from '@react-native-community/blur';

const Blur = () => {
    const blur = useSelector(state => state.systemReducer.blur);

    return blur
        ? <BlurView 
            style={styles.absolute}
            blurAmount={30}
            blurType='light'
        />
        : null
};

const styles = StyleSheet.create({
    absolute: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
    },
});

export default Blur;