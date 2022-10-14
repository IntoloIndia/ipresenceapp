import React from 'react';
import {TextInput} from 'react-native';
import {COLORS} from '../constants';

export default function TextFeild(props) {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 5,
        color: COLORS.black,
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: COLORS.green_50,
        elevation: 5,
        marginVertical: 10,
      }}
      placeholderTextColor={COLORS.black}></TextInput>
  );
}
