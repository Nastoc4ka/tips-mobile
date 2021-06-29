import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { pinAuthenticationSuccess } from '../../redux/actions';

const PasswordDots = ({password, correctPassword, handleAuthSecurity, setPassword}) => {
    const dispatch = useDispatch();
    const [animation] = useState(new Animated.Value(0));

    const animate = () => {
        Animated.timing(
            animation,
            {
                toValue: 1,
                duration: 30,
                useNativeDriver: true
            }
        ).start(() => Animated.timing(
                animation,
                {
                    toValue: -1,
                    duration: 60,
                    useNativeDriver: true
                }
            ).start(() => Animated.timing(
                    animation,
                    {
                        toValue: 1,
                        duration: 60,
                        useNativeDriver: true
                    }
                ).start(() => Animated.timing(
                        animation,
                        {
                            toValue: 0,
                            duration: 30,
                            useNativeDriver: true
                        }
                    ).start()
                )
            )
        )
    };

    useEffect(() => {
        if (password.length === 4) {
            if (password === correctPassword) {
                dispatch(pinAuthenticationSuccess());
                handleAuthSecurity ? handleAuthSecurity(previousState => !previousState) : null;
            } else {
                animate();
                setPassword('')
            }
        }
    }, [password]);

    const shake = animation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-20, 0, 20], 
    })

    return (
        <Animated.View style={{transform: [{translateX: shake}]}}>
            <View style={styles.dotsWrapper}>
                <View style={password.length >= 1 ? dots.filledDot : dots.emptyDot}></View>
                <View style={password.length >= 2 ? dots.filledDot : dots.emptyDot}></View>
                <View style={password.length >= 3 ? dots.filledDot : dots.emptyDot}></View>
                <View style={password.length >= 4 ? dots.filledDot : dots.emptyDot}></View>
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    dotsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
    },
    emptyDotStyle: {
        borderWidth: 1,
        borderColor: 'rgba(69, 69, 69, 0.5)'
    },
    filledDotStyle: {
        backgroundColor: '#FFA200'
    }
})

const dots = StyleSheet.create({
    filledDot: {
        ...styles.dot,
        ...styles.filledDotStyle
    },
    emptyDot: {
        ...styles.dot,
        ...styles.emptyDotStyle
    }
});

export default PasswordDots;
