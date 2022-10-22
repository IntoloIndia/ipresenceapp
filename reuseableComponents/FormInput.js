import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const FormInput = ({
  placeholder,
  inputStyle,
  icon,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  containerStyle,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: SIZES.radius,
        marginTop: 12,
        elevation: 3,
        ...containerStyle,
      }}>
      <Image
        source={icon}
        style={{
          height: 18,
          width: 18,
          tintColor: COLORS.true_gray_700,
          marginHorizontal: 8,
        }}
      />
      <TextInput
        style={{flex: 1, ...inputStyle}}
        placeholder={placeholder}
        placeholderTextColor={COLORS.true_gray_500}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCompleteType={autoCompleteType}
        autoCapitalize={autoCapitalize}
        onChangeText={text => onChange(text)}
      />
      {appendComponent}
    </View>
  );
};

export default FormInput;
