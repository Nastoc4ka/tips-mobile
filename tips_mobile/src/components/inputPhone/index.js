import React, {useState, useEffect, useCallback} from 'react';
import {Text, View} from 'react-native';
import {styleInput} from '../../styles';
import ErrorMessage from '../ErrorMessage';
import InputPhone from './InputPhone';

const InputPhoneWrapper = ({
  label,
  handleChange,
  handleBlur,
  message,
  style = null,
  value,
}) => {
  const [input, setInput] = useState(null);
  const [styleCurrentInput, setStyleCurrentInput] = useState(styleInput);

  const inputRef = useCallback(node => {
    if (node && !input) {
      setInput(node);
    }
  });

  const onBlur = event => {
    // console.log(event._dispatchInstances.memoizedProps.text, 'in');
    handleChange(event._dispatchInstances.memoizedProps.text);
  };

  useEffect(() => {
    style ? setStyleCurrentInput(style) : styleInput;
  }, []);

  return (
    <View style={styleCurrentInput.wrapper}>
      <Text style={styleCurrentInput.text}>{label}</Text>

      <InputPhone
        inputRef={inputRef}
        onBlur={onBlur}
        style={styleCurrentInput.input}
        value={value}
      />
      <ErrorMessage message={message} />
    </View>
  );
};

export default InputPhoneWrapper;
