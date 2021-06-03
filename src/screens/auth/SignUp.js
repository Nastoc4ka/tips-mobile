import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {buttonFill, main} from '../../styles';
import {CustomButton, ErrorMessage, IconInInputView, Input, InputPhone, SearchDropDown} from '../../components';
import {VisibilityHide, VisibilityShow} from '../../assets/icons';
import {getOrganisationsSaga, hideBlur, loginScreenShow, clearMessage, registerInit, registerSaga} from '../../redux/actions'
import {Portal} from 'react-native-portalize';
import AuthModal from '../../components/modals/AuthModal';

const SignUp = () => {
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisibility] = useState(false);
    const {organisations, registeredSuccessful} = useSelector(state => state.authRegisterReducer);
    const {message} = useSelector(state => state.messageReducer);
    const organisationInputRef = useRef(null);
    const [onRegister, setOnRegister] = useState(false);
    const [filtered, setFiltered] = useState(organisations);
    const [searching, setSearching] = useState(false);
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        organisation: '',
        organisationId: '',
        phoneNumber: '',
        confirm_password: '',
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        password: '',
        organisation: '',
        phoneNumber: '',
        confirm_password: '',
    });

    const handleCloseModal = () => {
        dispatch(hideBlur());
        setModalVisibility(false);
        dispatch(registerInit());
        dispatch(clearMessage());
        dispatch(loginScreenShow());
    };

    const nameInputChange = (val, key) => {
        setData({
            ...data,
            [key]: val,
        });
        setErrors({
            ...errors,
            [key]: '',
        });
        !val.trim() && setErrors({...errors, [key]: 'Имя и Фамилия должны быть заполнены'});
    };

    const onSearch = (text) => {
        setData({
            ...data,
            organisation: text,
            organisationId: '',
        });
        setErrors({
            ...errors,
            organisation: '',
        });
        if (text.trim().length > 2) {
            setSearching(true);
            const tempList = organisations.filter(item => {
                const itemToCheck = String(`${item.name} ${item.address}`).toLowerCase();
                const newString = String(text.toLowerCase());
                if (itemToCheck.startsWith(newString)) {
                    return item
                }
            });
            setFiltered(tempList)
        } else {
            setSearching(false);
            setFiltered(organisations)
        }
    };

    const passwordHandleChange = (password) => {
        setData({
            ...data,
            password,
        });
        setErrors({
            ...errors,
            password: '',
        });
    };

    const confirmPasswordHandleChange = (confirm_password) => {
        setData({
            ...data,
            confirm_password,
        });
        setErrors({
            ...errors,
            confirm_password: '',
        });
    };

    const updateSecureTextEntry = (key) => {
        setData({
            ...data,
            [key]: !data.[key],
        });
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

    const validatePhoneNumberCorrect = (phoneNumber) => {
        setData({
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
    console.log(message);
    const chooseOrganisation = (id, name) => {
        setData({
            ...data,
            organisation: name,
            organisationId: id,
        });
        setSearching(false);
        setFocus(false);
        organisationInputRef.current.blur();

    };

    useEffect(() => {
        const currentErrors = Object.entries(errors).filter(([key, value]) => value.length > 0);

        if (!currentErrors.length && onRegister) {
            const {firstName, lastName, organisationId, password, phoneNumber} = data;
            dispatch(registerSaga({firstName, lastName, organisationId, password, phoneNumber}));
        } else {
            setOnRegister(false)
        }

    }, [errors, onRegister]);

    const handleAuthorization = () => {
        validatePhoneNumber(data.phoneNumber);
        const checkFields = Object.entries(data).filter(([key, value]) => {
            return key === 'organisationId' ? false : value.length === 0
        });
        if (checkFields.length) {
            checkFields.map(([key, value]) => {
                setErrors((errors) => ({...errors, [key]: 'поле должно быть заполнено'}))
            })
        }
        if (data.password !== data.confirm_password) {
            setErrors((errors) => ({...errors, confirm_password: 'Пароль-подтверждение не совпадают'}))
        }
        setOnRegister(true);
    };

    const cleanSearchOrganisation = () => {
        onSearch('');
        setFocus(false);
        organisationInputRef.current.blur();

    };
    useEffect(() => {
        dispatch(getOrganisationsSaga());
    }, []);

    useEffect(() => {
        if (registeredSuccessful) setModalVisibility(true)
    }, [registeredSuccessful]);

    if (message) {
        return <View style={organisationInput.container}>
            <ErrorMessage styles={errorMessageLarge} message={message}/>
            <CustomButton title='Войти в аккаунт' styles={button} onPress={handleCloseModal}/>
        </View>
    }
    return (
        <>
            <Text style={main.headerTextRegistration}>Добро пожаловать!</Text>
            <ScrollView style={{width: '100%'}}>
                <Input
                    autoCapitalize='words'
                    type='name'
                    name='firstName'
                    label='Имя'
                    maxLength={40}
                    message={errors.firstName}
                    value={data.firstName}
                    handleChange={(text) => nameInputChange(text, 'firstName')}
                />
                <Input
                    autoCapitalize='words'
                    type='name'
                    name='lastName'
                    label='Фамилия'
                    message={errors.lastName}
                    value={data.lastName}
                    maxLength={40}
                    handleChange={(text) => nameInputChange(text, 'lastName')}
                />
                <InputPhone
                    label='Телефон'
                    handleChange={validatePhoneNumberCorrect}
                    onBlur={({nativeEvent: {text}}) => validatePhoneNumber(text)}
                    message={errors.phoneNumber}
                />
                <View style={focus ? organisationInput.container : null}>
                    {focus ? <TouchableOpacity style={closeBtn.btn} onPress={cleanSearchOrganisation}>
                        <Text style={closeBtn.text}>x</Text>
                    </TouchableOpacity> : null}
                    <Input
                        label='Заведение'
                        onFocus={() => setFocus(true)}
                        refs={organisationInputRef}
                        value={data.organisation}
                        maxLength={60}
                        message={errors.organisation}
                        handleChange={onSearch}
                    >
                        <TouchableOpacity onPress={() => onSearch('')}>
                            <IconInInputView>
                                {focus && data.organisation ? <Text style={closeBtn.text}>x</Text> : null}
                            </IconInInputView>
                        </TouchableOpacity>
                    </Input>
                    {searching ?
                        <SearchDropDown
                            onPress={(id, name) => chooseOrganisation(id, name)}
                            dataSource={filtered}/> :
                        null}
                </View>

                <Input
                    type='password'
                    maxWidth='90%'
                    handleChange={passwordHandleChange}
                    secureTextEntry={data.secureTextEntry}
                    autoCapitalize="none"
                    label='Пароль'
                    value={data.password}
                    message={errors.password}
                    placeholder='•••••••••'
                >
                    <TouchableOpacity onPress={() => updateSecureTextEntry('secureTextEntry')}>
                        <IconInInputView>
                            {data.secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>

                <Input
                    maxWidth='90%'
                    type='password'
                    secureTextEntry={data.confirm_secureTextEntry}
                    autoCapitalize='none'
                    label='Повторить пороль'
                    placeholder='•••••••••'
                    message={errors.confirm_password}
                    value={data.confirm_password}
                    handleChange={confirmPasswordHandleChange}
                >
                    <TouchableOpacity onPress={() => updateSecureTextEntry('confirm_secureTextEntry')}>
                        <IconInInputView>
                            {data.confirm_secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
            </ScrollView>

            <CustomButton title='Готово' styles={button} onPress={handleAuthorization}/>

            <Portal>
                <AuthModal
                    handleCloseModal={handleCloseModal}
                    isVisible={isModalVisible}
                    message='Дякуємо за реєстрацію!'/>
            </Portal>
        </>
    )
};

const button = StyleSheet.create({
    button: {
        ...buttonFill.button,
        marginTop: 10,
        marginBottom: 30,
        ...Platform.select({
            ios: {
                marginBottom: 45,
            },
            android: {
                marginBottom: 20,
            }
        }),
    },
    text: {
        ...buttonFill.text
    }
});

const organisationInput = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: 500,
        backgroundColor: '#fff',
        zIndex: 1,
        top: 0
    },
});

const closeBtn = StyleSheet.create({
    btn: {
        marginLeft: 5,
        marginBottom: 5,
    },
    text: {
        color: 'grey',
        fontWeight: '800',
        fontSize: 20,
        justifyContent: 'center'
    }
});

const errorMessageLarge = StyleSheet.create({
    wrapper: {
        justifyContent:'flex-end',
        alignItems:'center',

    },
    text: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default SignUp