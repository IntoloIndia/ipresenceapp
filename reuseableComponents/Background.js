import React from 'react';
import {View, ImageBackground} from 'react-native';
import {COLORS, images} from '../constants';

export default function Background({children}) {
  return (
    <View>
      <ImageBackground
        style={{height: '100%', backgroundColor: COLORS.green_800}}
      />
      <View style={{position: 'absolute'}}>{children}</View>
    </View>
  );
}
