import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { AuthModal, BackgroundSettings, CustomButton, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Portal } from 'react-native-portalize';
import {
  clearMessage,
  currentPasswordSetFalse,
  setConfirmCurrentPasswordSaga,
} from '../../redux/actions';
import { styleSettingsButtonString, styleSettingsInput, styleSettingsScreen } from '../../styles';
import { CHANGE_PASSWORD } from '../../constants/routeNames';

const EMPTY_INPUT_ERROR = 'поле должно быть заполнено';

const passwordConfirmation = ({ navigation }) => {
  const dispatch = useDispatch();
  const { message, confirmPassword } = useSelector((state) => state.systemReducer);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const validate = (value) => (value.trim() ? '' : EMPTY_INPUT_ERROR);

  const onChange = (value) => {
    setCurrentPassword(value);
    setCurrentPasswordError('');
  };

  const handleCloseModal = () => {
    dispatch(clearMessage());
    setModalIsVisible(false);
  };

  const displayInputError = (validatorFunc) => (data) => {
    setCurrentPasswordError(validatorFunc(data));
  };

  const onCheckCurrentPassword = () => {
    const passwordError = validate(currentPassword);
    if (passwordError) {
      setCurrentPasswordError(passwordError);
    } else {
      dispatch(setConfirmCurrentPasswordSaga(currentPassword));
    }
  };

  if (confirmPassword) {
    dispatch(currentPasswordSetFalse());
    navigation.navigate(CHANGE_PASSWORD);
  }

  useEffect(() => {
    if (message) setModalIsVisible(true);
  }, [message]);

  return (
    <BackgroundSettings>
      <View style={styleSettingsScreen.container}>
        <Input
          style={styleSettingsInput}
          name="oldPassword"
          placeholder=""
          label="Введите sms"
          message={currentPasswordError}
          value={currentPassword}
          keyboardType="numeric"
          handleBlur={displayInputError(validate)}
          onChangeText={onChange}
        />
        <CustomButton
          title="Подтвердить"
          onPress={onCheckCurrentPassword}
          styles={styleSettingsButtonString}
        />
      </View>
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

export default passwordConfirmation;

const styleSettingsScreens = StyleSheet.create({
  paper: {
    width: '89%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
});
