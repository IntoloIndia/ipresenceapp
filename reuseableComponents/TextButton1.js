import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function TextButton({btnTitle, bgColor, textColor}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        borderRadius: 5,
        alignItems: 'center',
        width: 320,
        paddingVertical: 5,
        marginVertical: 15,
      }}>
      <Text style={{color: textColor, fontSize: 22, fontWeight: 'bold'}}>
        {btnTitle}
      </Text>
    </TouchableOpacity>
  );
}
