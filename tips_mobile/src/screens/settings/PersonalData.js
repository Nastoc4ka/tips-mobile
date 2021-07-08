import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styleSettingsInput, styleSettingsScreen} from '../../styles';
import {
  AuthModal,
  BackgroundSettings,
  Input,
  InputPhone,
  UploadImageModal,
} from '../../components';
import {Portal} from 'react-native-portalize';
import {
  clearMessage,
  hideBlur,
  sendDataDisable,
  showBlur,
  updateUserSaga,
} from '../../redux/actions';
import AvatarWrapper from './AvatarWrapper';
import PositionAndOrganization from './PositionAndOrganization';

const PHONE_NUMBER_LENGTH = 19;
const DATE_REG_EXP =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const isNumberLengthCorrect = phoneNumber =>
  phoneNumber.length === PHONE_NUMBER_LENGTH;

const initialErrorsState = {
  firstName: '',
  phoneNumber: '',
  birthdate: '',
};

const PersonalData = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.authLoginReducer);
  console.log(user);
  const {sendData, message} = useSelector(state => state.systemReducer);
  const [data, setData] = useState(user);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [choosePhoto, setChoosePhoto] = useState(false);
  const [errors, setErrors] = useState(initialErrorsState);

  const displayInputError = validatorFunc => data => {
    setErrors({...errors, ...validatorFunc(data)});
  };

  const validateBirthDate = value => {
    const dateCheck = value?.trim();
    if (dateCheck && !DATE_REG_EXP.test(dateCheck)) {
      return {birthdate: 'формат: 20.05.2000'};
    }
    return {birthdate: ''};
  };

  const validatePhoneNumber = inputNumber => {
    const phoneNumber = isNumberLengthCorrect(inputNumber)
      ? ''
      : 'некорректный номер';
    return {phoneNumber};
  };

  const validateName = name => {
    const isInvalid = !name.trim();
    const firstName = isInvalid ? 'Имя должны быть заполнены' : '';
    return {firstName};
  };

  const handleCloseModal = () => {
    dispatch(clearMessage());
    dispatch(hideBlur());
    setChoosePhoto(false);
    setModalIsVisible(false);
  };

  const pickAvatar = () => {
    setChoosePhoto(true);
    dispatch(showBlur());
  };

  const validatePhoneNumberCorrect = phoneNumber => {
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

  const onChange = (val, key) => {
    setData({
      ...data,
      [key]: val,
    });
    setErrors({
      ...errors,
      [key]: '',
    });
    displayInputError(validateName)(data.firstName);
  };

  const validateForm = dataToValidate => {
    return {
      ...validateName(dataToValidate.firstName),
      ...validateBirthDate(dataToValidate.birthdate),
      ...validatePhoneNumber(dataToValidate.phoneNumber),
    };
  };

  useEffect(() => {
    if (message) {
      setModalIsVisible(true);
    }
  }, [message]);

  useEffect(() => {
    if (sendData) {
      dispatch(sendDataDisable());
      const formErrors = validateForm(data);
      const errorArray = Object.entries(formErrors).filter(
        ([key, value]) => value.length > 0,
      );
      if (errorArray.length) {
        setErrors(formErrors);
      } else {
        dispatch(updateUserSaga(data));
        setErrors(initialErrorsState);
        setData(user);
      }
    }
  }, [sendData]);

  return (
    <BackgroundSettings>
      <View style={styleSettingsScreen.container}>
        <TouchableOpacity
          style={styleSettingsScreen.avatar}
          onPress={pickAvatar}>
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
        handleBlur={displayInputError(validateName)}
        handleChange={text => onChange(text, 'firstName')}
      />
      <InputPhone
        value={data.phoneNumber}
        label="Телефон"
        message={errors.phoneNumber}
        style={styleSettingsInput}
        handleChange={validatePhoneNumberCorrect}
        handleBlur={displayInputError(validatePhoneNumber)}
      />
      <Input
        placeholder="формат: 23.01.1900"
        autoCapitalize="words"
        style={styleSettingsInput}
        name="birthdate"
        label="Дата рождения"
        handleBlur={displayInputError(validateBirthDate)}
        maxLength={10}
        message={errors.birthdate}
        value={data.birthdate}
        handleChange={text => onChange(text, 'birthdate')}
      />
      <PositionAndOrganization
        position={data.position}
        organization={data.organization.name}
      />
      <Portal>
        <UploadImageModal
          modalIsVisible={choosePhoto}
          setData={setData}
          handleCloseModal={handleCloseModal}
        />
      </Portal>
      <Portal>
        <AuthModal
          modalIsVisible={modalIsVisible}
          message={message}
          handleCloseModal={handleCloseModal}
        />
      </Portal>
    </BackgroundSettings>
  );
};

export default PersonalData;
