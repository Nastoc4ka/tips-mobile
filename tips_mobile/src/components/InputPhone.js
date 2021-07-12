import React, {useState, useEffect, useCallback} from 'react';
import {TextInput, Text, View} from 'react-native';
// import {IMaskNativeMixin} from 'react-native-imask';
import {styleInput} from '../styles';
import ErrorMessage from './ErrorMessage';

const InputPhone = ({
  label,
  handleBlur,
  message,
  handleChange,
  value = null,
  style = null,
}) => {
  // const PhoneComponent = IMaskNativeMixin(({inputRef, ...props}) => (
  //   <TextInput ref={inputRef} {...props} />
  // ));

  const [input, setInput] = useState('');

  const inputRef = useCallback(node => {
    if (node && !input) {
      setInput(node);
    }
  });

  const onBlur = () => {
    // handleBlur(input.);
    console.log(input);
  };

  useEffect(() => {
    value ? setPhone(value) : null;
    style ? setStyleCurrentInput(style) : styleInput;
  }, []);

  return (
    <View style={styleCurrentInput.wrapper}>
      <Text style={styleCurrentInput.text}>{label}</Text>

      <TextInput
        onBlur={onBlur}
        placeholder="+38 (0••) ••• •• ••"
        placeholderTextColor="rgba(36, 168, 172, 0.4)"
        textContentType="telephoneNumber"
        keyboardType="numeric"
        style={styleCurrentInput.input}
        value={phone}
        inputRef={inputRef}
      />
      <ErrorMessage message={message} />
    </View>
  );
};

export default InputPhone;
