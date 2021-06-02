import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {buttonFill, main} from '../../styles';
import {CustomButton, IconInInputView, Input, InputPhone, SearchDropDown} from '../../components';
import {VisibilityHide, VisibilityShow} from '../../assets/icons';
import {getOrganisationsSaga, registerSaga} from '../../redux/actions';

const SignUp = () => {

    const dispatch = useDispatch();
    const {organisations} = useSelector(state => state.authRegisterReducer);
    const organisationInputRef = useRef(null);

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

    const onSearch = (text) => {
        setData({
            ...data,
            organisation: text,
            organisationId: '',
        });
        if (text.trim().length > 2) {
            setSearching(true);
            const tempList = organisations.filter(item => {
                const itemToCheck = String(`${item.name} (${item.address})`).toLowerCase();
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

    const passwordInputChange = (password) => {
        if (password.trim()) {
            setData({
                ...data,
                password,
            });
        } else {
            setData({
                ...data,
                password,
            });
        }
    };

    const confirmPasswordInputChange = (confirm_password) => {
        if (confirm_password.trim()) {
            setData({
                ...data,
                confirm_password,
            });
        } else {
            setData({
                ...data,
                confirm_password,
                check_textInputChange: false
            });
        }
    };

    const updateSecureTextEntry = (key) => {
        setData({
            ...data,
            [key]: !data.[key],
        });
    };

    const validatePhoneNumber = ({nativeEvent: {text}}) => {
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

    const validatePhoneNumberCorrect = (value) => {
        if (value.length === 19) {
            setErrors({
                ...errors,
                phoneNumber: '',
            });
        }
    };

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

    const handleAuthorization = () => {
        const {firstName, lastName, organisationId, password, phoneNumber} = data;
        dispatch(registerSaga({firstName, lastName, organisationId, password, phoneNumber}));
    };

    const cleanSearchOrganisation = () => {
        onSearch('');
        setFocus(false);
        organisationInputRef.current.blur();

    };
    useEffect(() => {
        dispatch(getOrganisationsSaga());
    }, []);

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
                    onBlur={validatePhoneNumber}
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
                                {focus ? <Text style={closeBtn.text}>x</Text> : null}
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
                    handleChange={confirmPasswordInputChange}
                >
                    <TouchableOpacity onPress={() => updateSecureTextEntry('confirm_secureTextEntry')}>
                        <IconInInputView>
                            {data.confirm_secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
            </ScrollView>
            <CustomButton title='Готово' styles={btn} onPress={handleAuthorization}/>
        </>
    )
};

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

const btn = StyleSheet.create({
    button: {
        ...buttonFill.button,
        marginBottom: 40,
    },
    text: buttonFill.text
});

export default SignUp