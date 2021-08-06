import React, { useState, useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styleInput } from '../styles';
import ErrorMessage from './ErrorMessage';

const Input = ({
  value,
  maxWidth = '100%',
  handleBlur = null,
  autoCapitalize = 'none',
  maxLength = 255,
  label,
  message,
  children,
  style,
  ...props
}) => {
  const [styleCurrentInput, setStyleCurrentInput] = useState(styleInput);
  const onBlur = () => {
    handleBlur && handleBlur(value);
  };

  useEffect(() => {
    style ? setStyleCurrentInput(style) : styleInput;
  }, []);
  return (
    <View style={styleCurrentInput.wrapper}>
      <Text style={styleCurrentInput.text}>{label}</Text>
      <View style={styleCurrentInput.input}>
        <TextInput
          {...props}
          value={value}
          onBlur={onBlur}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="rgba(36, 168, 172, 0.4)"
          style={{ maxWidth, paddingVertical: 0 }}
        />
        {children}
      </View>
      <ErrorMessage message={message} />
    </View>
  );
};

export default Input;
