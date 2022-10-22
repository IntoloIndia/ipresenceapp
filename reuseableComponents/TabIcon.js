import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TabIcon = ({focused, icon, name}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
      }}>
      <Image
        source={icon}
        style={{
          width: focused ? 22 : 20,
          height: focused ? 22 : 20,
          tintColor: focused ? COLORS.green_800 : COLORS.darkGray,
        }}
      />
      <Text
        style={{
          marginBottom: 15,
          ...FONTS.h2,
          color: focused ? COLORS.black : COLORS.darkGray,
        }}>
        {name}
      </Text>

      {focused && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 5,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: COLORS.green_800,
          }}></View>
      )}
    </View>
  );
};

export default TabIcon;
