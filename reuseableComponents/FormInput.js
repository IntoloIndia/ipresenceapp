import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const FormInput = ({
  placeholder,
  inputStyle,
  icon,
  appendComponent,
  onChange,
  value,
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
        marginTop: 5,
        marginBottom: 10,
        elevation: 3,
        ...containerStyle,
      }}>
      <Image
        source={icon}
        style={{
          height: 15,
          width: 15,
          tintColor: COLORS.true_gray_700,
          marginHorizontal: 8,
        }}
      />
      <TextInput
        style={{flex: 1, ...inputStyle, color:COLORS.true_gray_800}}
        placeholder={placeholder}
        placeholderTextColor={COLORS.true_gray_500}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCompleteType={autoCompleteType}
        autoCapitalize={autoCapitalize}
        onChangeText={text => onChange(text)}
        value={value}
      />
      {appendComponent}
    </View>
  );
};

export default FormInput;
