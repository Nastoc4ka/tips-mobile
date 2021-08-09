import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { buttonFill, main } from '../../styles';
import {
  MessageModal,
  CustomButton,
  UpdateSecureTextEntry,
  Input,
  InputPhone,
  OrganizationSearch,
} from '../../components';
import {
  clearMessage,
  getOrganizationsSaga,
  loginScreenShow,
  registerInit,
  registerSaga,
} from '../../redux/actions';
import { Portal } from 'react-native-portalize';

const regexpPasswordFactory = () =>
  new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g);

const SignUp = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.systemReducer);
  const [onRegister, setOnRegister] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    organization: '',
    organizationId: '',
    phoneNumber: '',
    confirm_password: '',
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    password: '',
    organization: '',
    phoneNumber: '',
    confirm_password: '',
  });

  const handleCloseModal = () => {
    setModalIsVisible(false);
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
    !val.trim() && setErrors({ ...errors, [key]: 'Имя и Фамилия должны быть заполнены' });
  };

  const passwordHandleChange = (password) => {
    setData({
      ...data,
      password,
    });
    validatePassword(password);
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
      [key]: !data[key],
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

  const validatePassword = (password) => {
    if (!regexpPasswordFactory().test(password)) {
      setErrors({
        ...errors,
        password:
          'Пароль должен содержать хотя бы 8 символов, заглавную, строчную латинскую букву и цифру.',
      });
    } else {
      setErrors({
        ...errors,
        password: '',
      });
    }
  };

  const setOrganizationInData = (id, name) => {
    setData({
      ...data,
      organization: name,
      organizationId: id,
    });
  };

  // const sendSMS = (phone) => {
  //     fetch(`https://api.turbosms.ua/message/send.json?recipients[0]=${phone}&sms[sender]=BRAND&sms[text]=Ваш+аккаунт+верифицирован!&token=94a8b281bc3740a5316d66824c830126ff2c585a`)
  //     .then(res => res.json())
  //     .then(res => console.log("res", res))
  // }

  useEffect(() => {
    const currentErrors = Object.entries(errors).filter(([key, value]) => value.length > 0);
    //let phone = data.phoneNumber.split("").filter(el => !isNaN(el) && el != " ").join("")

    if (!currentErrors.length && onRegister) {
      const { firstName, lastName, organizationId, password, phoneNumber } = data;
      dispatch(registerSaga({ firstName, lastName, organizationId, password, phoneNumber }));
      // sendSMS(phone)
    } else {
      setOnRegister(false);
    }
  }, [errors, onRegister]);

  const handleAuthorization = () => {
    validatePhoneNumber(data.phoneNumber);
    const checkFields = Object.entries(data).filter(([key, value]) => {
      return key === 'organizationId' ? false : value.length === 0;
    });
    if (checkFields.length) {
      checkFields.map(([key, value]) => {
        setErrors((errors) => ({ ...errors, [key]: 'поле должно быть заполнено' }));
      });
    }
    if (data.password !== data.confirm_password) {
      setErrors((errors) => ({ ...errors, confirm_password: 'Пароль-подтверждение не совпадают' }));
    }
    setOnRegister(true);
  };

  useEffect(() => {
    dispatch(getOrganizationsSaga());
  }, []);

  useEffect(() => {
    if (message) setModalIsVisible(true);
  }, [message]);

  return (
    <>
      <Text style={main.headerTextRegistration}>Добро пожаловать!</Text>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={{ width: '100%', flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ flex: 1 }}>
            <Input
              autoCapitalize="words"
              type="name"
              name="firstName"
              label="Имя"
              maxLength={40}
              message={errors.firstName}
              value={data.firstName}
              onChangeText={(text) => nameInputChange(text, 'firstName')}
            />
            <Input
              autoCapitalize="words"
              type="name"
              name="lastName"
              label="Фамилия"
              message={errors.lastName}
              value={data.lastName}
              maxLength={40}
              onChangeText={(text) => nameInputChange(text, 'lastName')}
            />
            <InputPhone
              label="Телефон"
              handleChange={validatePhoneNumberCorrect}
              handleBlur={validatePhoneNumber}
              message={errors.phoneNumber}
            />

            <OrganizationSearch
              error={errors.organization}
              setOrganizationInData={setOrganizationInData}
            />

            <Input
              type="password"
              maxWidth="90%"
              onChangeText={passwordHandleChange}
              secureTextEntry={data.secureTextEntry}
              autoCapitalize="none"
              label="Пароль"
              value={data.password}
              message={errors.password}
              placeholder="•••••••••"
              handleBlur={validatePassword}
            >
              <UpdateSecureTextEntry
                updateSecureTextEntry={() => updateSecureTextEntry('secureTextEntry')}
                secureTextEntry={data.secureTextEntry}
              />
            </Input>

            <Input
              maxWidth="90%"
              type="password"
              secureTextEntry={data.confirm_secureTextEntry}
              autoCapitalize="none"
              label="Повторить пороль"
              placeholder="•••••••••"
              message={errors.confirm_password}
              value={data.confirm_password}
              handleChange={confirmPasswordHandleChange}
            >
              <UpdateSecureTextEntry
                updateSecureTextEntry={() => updateSecureTextEntry('confirm_secureTextEntry')}
                secureTextEntry={data.confirm_secureTextEntry}
              />
            </Input>
          </ScrollView>
        </TouchableWithoutFeedback>
        <CustomButton title="Готово" styles={button} onPress={handleAuthorization} />
        <Portal>
          <MessageModal
            modalIsVisible={modalIsVisible}
            handleCloseModal={handleCloseModal}
            message={message}
          />
        </Portal>
      </KeyboardAvoidingView>
    </>
  );
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
      },
    }),
  },
  text: {
    ...buttonFill.text,
  },
});

export default SignUp;
