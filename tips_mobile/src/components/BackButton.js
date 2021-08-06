import React from 'react';
import { TouchableOpacity } from 'react-native';
import BackArrowBlackIconWrapped from './BackArrowBlackIconWrapped';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity accessibilityRole="button" activeOpacity={0.6} onPress={onPress}>
      <BackArrowBlackIconWrapped />
    </TouchableOpacity>
  );
};

export default BackButton;
