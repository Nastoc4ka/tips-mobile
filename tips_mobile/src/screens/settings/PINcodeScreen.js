import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BackgroundSettings, CustomButton, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { pinChangeDisable, setPinAuthenticationSaga } from '../../redux/actions';
import { SECURITY } from '../../constants/routeNames';
import { styleSettingsButton, styleSettingsInput, styleSettingsScreen } from '../../styles';

const PIN_LENGTH = 4;
const isPinLengthCorrect = (pin) => pin.length === PIN_LENGTH;

const PINcodeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isPINChange = useSelector((state) => state.systemReducer.pinChanged);

  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  const validatePin = (value) => (isPinLengthCorrect(value) ? '' : 'введите 4 цифры');

  const onChange = (value) => {
    setPin(value);
    setPinError('');
  };

  const displayInputError = (validatorFunc) => (data) => {
    setPinError(validatorFunc(data));
  };

  const onSetOrUpdatePin = () => {
    const pinErr = validatePin(pin);
    if (pinErr) {
      setPinError(pinErr);
    } else {
      dispatch(setPinAuthenticationSaga(pin));
    }
  };

  useEffect(() => {
    if (isPINChange) {
      navigation.navigate(SECURITY);
      dispatch(pinChangeDisable());
    }
  }, [isPINChange]);

  return (
    <BackgroundSettings>
      <View style={styleSettingsScreen.container}>
        <Input
          style={styleSettingsInput}
          name="pin"
          placeholder="****"
          label="ПИН-код(4 цифры)"
          maxLength={4}
          message={pinError}
          value={pin}
          keyboardType="numeric"
          handleBlur={displayInputError(validatePin)}
          handleChange={onChange}
        />
        <CustomButton title="Сохранить" onPress={onSetOrUpdatePin} styles={styleSettingsButton} />
      </View>
    </BackgroundSettings>
  );
};

export default PINcodeScreen;
