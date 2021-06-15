import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {InputPhone, Input} from "../../components";

const PersonalData = () => {
    const {user} = useSelector(state => state.authLoginReducer);
    const [data, setUserData] = useState(user);
    const [errors, setErrors] = useState({
        firstName: '',
        phoneNumber: '',
        birthdate: '',
    });

    const validatePhoneNumberCorrect = (phoneNumber) => {
        setUserData({
            ...data,
            phoneNumber,
        });
        if (phoneNumber.length === 19) {
            setErrors({
                ...errors,
                phoneNumber: '',
            });
        }
    };

    const validatePhoneNumber = (text) => {
        if (text.length < 19) {
            setErrors({
                ...errors,
                phoneNumber: 'некорректный номер',
            });
        } else {
            setErrors({
                ...errors,
                phoneNumber: '',
            });
        }
    };

    const nameInputChange = (val, key) => {
        setUserData({
            ...data,
            [key]: val,
        });
        setErrors({
            ...errors,
            [key]: '',
        });
        !val.trim() && setErrors({...errors, [key]: 'Имя должны быть заполнены'});
    };

    return (
        <View style={styleSettingsScreens.topPanel}>
            <View style={styleSettingsScreens.container}>
                <TouchableOpacity style={styleSettingsScreens.avatar}>
                    {data.avatar ?
                        <Image style={styleSettingsScreens.image} source={data.avatar}/> :
                        <View>
                            <Text style={styleSettingsScreens.textAvatar}>{data.firstName[0]}</Text>
                        </View>}
                    <Text style={styleSettingsScreens.textPhoto}>Фото</Text>
                </TouchableOpacity>
                <Input
                    autoCapitalize='words'
                    type='name'
                    style={styleSettingsInput}
                    name='firstName'
                    label='Имя'
                    maxLength={40}
                    message={errors.firstName}
                    value={data.firstName}
                    handleChange={(text) => nameInputChange(text, 'firstName')}
                />
                <InputPhone
                    value={data.phoneNumber}
                    label='Телефон'
                    message={errors.phoneNumber}
                    style={styleSettingsInput}
                    handleChange={validatePhoneNumberCorrect}
                    handleBlur={validatePhoneNumber}
                />

            </View>
        </View>
    );
};

export default PersonalData

const styleSettingsInput = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 35,
    },
    text: {
        marginBottom: 12,
        fontSize: 13,
        marginLeft: 14,
        color: '#454545',
    },
    input: {
        width: '100%',
        paddingLeft: 14,
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(36, 168, 172, 0.5)',
        borderTopWidth: 1,
        ...Platform.select({
            ios: {
                paddingVertical: 11,
                paddingRight: 46,
            },
            android: {
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 23,
            }
        }),
    }
});

const styleSettingsScreens = StyleSheet.create({
    topPanel: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(249, 249, 249, 0.9)'
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    },
    avatar: {
        marginTop: 34,
        borderRadius: 67 / 2,
        width: 67,
        height: 67,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
    },
    photo: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 0,
        width: 60,
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
    },
    textAvatar: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    textPhoto: {
        color: 'grey',
        backgroundColor: 'white',
        position: 'absolute',
        lineHeight: 15,
        bottom: 0,
        width: 60,
        textAlign: 'center',
        fontSize: 8,
    }
});