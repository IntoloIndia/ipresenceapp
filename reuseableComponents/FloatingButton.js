import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {COLORS, icons} from '../constants';

const FloatingButton = ({onClickBtn}) => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <TouchableOpacity
        onPress={onClickBtn}
        style={{
          position: 'absolute',
          right: 25,
          bottom: 25,
          backgroundColor: COLORS.green_700,
          padding: 15,
          borderRadius: 50,
        }}>
        <Image
          source={icons.plus}
          style={{height: 22, width: 22, tintColor: COLORS.white}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;
