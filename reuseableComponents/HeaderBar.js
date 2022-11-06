import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, FONTS, icons} from '../constants';

const HeaderBar = ({title, titleColor, arrowColor}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: SIZES.radius,
        paddingTop: SIZES.padding,
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{alignItems: 'center', alignItems: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{width: 20, height: 20, tintColor: arrowColor}}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: SIZES.radius,
            ...FONTS.h5,
            color: titleColor,
            textTransform: 'capitalize',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBar;
