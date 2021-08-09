import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styleSettingsInput, styleSettingsScreen } from '../../styles';
import {
  MessageModal,
  AvatarWrapper,
  BackgroundSettings,
  Input,
  InputPhone,
  UploadImageModal,
} from '../../components';
import { Portal } from 'react-native-portalize';
import {
  clearMessage,
  hideBlur,
  sendDataDisable,
  showBlur,
  updateUserSaga,
} from '../../redux/actions';
import PositionAndOrganization from './PositionAndOrganization';
import { SETTINGS } from '../../constants/routeNames';
import { useFocusEffect } from '@react-navigation/native';

const PHONE_NUMBER_LENGTH = 19;
const DATE_REG_EXP = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const isNumberLengthCorrect = (phoneNumber) => phoneNumber.length === PHONE_NUMBER_LENGTH;

const initialErrorsState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  birthdate: '',
};

const PersonalDataScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authLoginReducer);
  const { sendData, message } = useSelector((state) => state.systemReducer);
  const [data, setData] = useState(user);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [choosePhoto, setChoosePhoto] = useState(false);
  const [errors, setErrors] = useState(initialErrorsState);

  const displayInputError = (validatorFunc) => (data) => {
    setErrors({ ...errors, ...validatorFunc(data) });
  };

  const validateBirthDate = (value) => {
    const dateCheck = value.trim();
    if (dateCheck && !DATE_REG_EXP.test(dateCheck)) {
      return { birthdate: 'формат: 20.05.2000' };
    }
    return { birthdate: '' };
  };

  const validatePhoneNumber = (inputNumber) => {
    const phoneNumber = isNumberLengthCorrect(inputNumber) ? '' : 'некорректный номер';
    return { phoneNumber };
  };

  const validateName = (name) => {
    const isInvalid = !name.trim();
    const firstName = isInvalid ? 'Имя и фамилия должны быть заполнены' : '';
    return { firstName };
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
    dispatch(clearMessage());
    navigation.navigate(SETTINGS);
  };

  const handleCloseImageModal = () => {
    setChoosePhoto(false);
    setModalIsVisible(false);
    dispatch(hideBlur());
  };

  const pickAvatar = () => {
    setChoosePhoto(true);
    dispatch(showBlur());
  };

  const validatePhoneNumberCorrect = (phoneNumber) => {
    setData({
      ...data,
      phoneNumber,
    });
    if (isNumberLengthCorrect(phoneNumber)) {
      setErrors({
        ...errors,
        phoneNumber: '',
      });
    }
  };

  const onChangeName = (val, key) => {
    setData({
      ...data,
      [key]: val,
    });
    displayInputError(validateName)(val);
  };

  const onChangeBirthdate = (val, key) => {
    setData({
      ...data,
      [key]: val,
    });
    setErrors({
      ...errors,
      [key]: '',
    });
  };

  const validateForm = (dataToValidate) => {
    return {
      ...validateName(dataToValidate.firstName),
      ...validateName(dataToValidate.lastName),
      ...validateBirthDate(dataToValidate.birthdate),
      ...validatePhoneNumber(dataToValidate.phoneNumber),
    };
  };

  useFocusEffect(
    useCallback(() => {
      if (message) setModalIsVisible(true);
    }, [message]),
  );

  useEffect(() => {
    if (sendData) {
      dispatch(sendDataDisable());
      const formErrors = validateForm(data);
      const errorArray = Object.entries(formErrors).filter(([key, value]) => value.length > 0);
      if (errorArray.length) {
        setErrors(formErrors);
      } else {
        dispatch(updateUserSaga(data));
        setErrors(initialErrorsState);
      }
    }
  }, [sendData]);

  return (
    <ScrollView>
      <BackgroundSettings>
        <KeyboardAvoidingView style={{ width: '100%', flex: 1 }} behavior={'position'} enabled>
          <View style={styleSettingsScreen.container}>
            <TouchableOpacity style={styleSettingsScreen.avatar} onPress={pickAvatar}>
              <AvatarWrapper source={data.avatar} textAvatar={data.firstName[0]} />
              <Text style={styleSettingsScreen.textPhoto}>Фото</Text>
            </TouchableOpacity>
          </View>
          <Input
            autoCapitalize="words"
            type="name"
            style={styleSettingsInput}
            name="firstName"
            label="Имя"
            maxLength={40}
            message={errors.firstName}
            value={data.firstName}
            handleBlur={() => displayInputError(validateName)}
            onChangeText={(text) => onChangeName(text, 'firstName')}
          />
          <Input
            autoCapitalize="words"
            type="name"
            style={styleSettingsInput}
            name="lastName"
            label="Фамилия"
            maxLength={40}
            message={errors.lastName}
            value={data.lastName}
            handleBlur={() => displayInputError(validateName)}
            onChangeText={(text) => onChangeName(text, 'lastName')}
          />
          <InputPhone
            value={data.phoneNumber}
            label="Телефон"
            message={errors.phoneNumber}
            style={styleSettingsInput}
            handleChange={validatePhoneNumberCorrect}
            handleBlur={() => displayInputError(validatePhoneNumber)}
          />
          <Input
            placeholder="формат: 23.01.1900"
            autoCapitalize="words"
            style={styleSettingsInput}
            name="birthdate"
            label="Дата рождения"
            handleBlur={() => displayInputError(validateBirthDate)}
            maxLength={10}
            message={errors.birthdate}
            value={data.birthdate}
            onChangeText={(text) => onChangeBirthdate(text, 'birthdate')}
          />
          <PositionAndOrganization position={data.position} organization={data.organization.name} />
        </KeyboardAvoidingView>

        <Portal>
          <UploadImageModal
            modalIsVisible={choosePhoto}
            setData={setData}
            handleCloseModal={handleCloseImageModal}
          />
          <MessageModal
            modalIsVisible={modalIsVisible}
            message={message}
            handleCloseModal={handleCloseModal}
          />
        </Portal>
      </BackgroundSettings>
    </ScrollView>
  );
};

export default PersonalDataScreen;
