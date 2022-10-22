import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TextButton = ({
  buttonContainerStyle,
  label,
  disabled,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.green_700,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{color: COLORS.white, ...FONTS.h5, ...labelStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
