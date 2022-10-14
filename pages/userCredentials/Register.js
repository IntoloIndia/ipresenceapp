import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import {HeaderBar} from '../../reuseableComponents';

const Register = () => {
  return (
    <View>
      <HeaderBar title={'SignUp'} />
      <View style={{marginHorizontal: SIZES.padding, marginTop: SIZES.padding}}>
        <Text style={{...FONTS.h7, color: COLORS.black, fontWeight: 'bold'}}>
          Create Account
        </Text>
        <View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.darkGray,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.darkGray,
                ...FONTS.h5,
              }}
              placeholder="Company name"
              placeholderTextColor={COLORS.darkGray}
              selectionColor={COLORS.darkGray}
            />
          </View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.darkGray,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.darkGray,
                ...FONTS.h5,
              }}
              placeholder="Owner name"
              placeholderTextColor={COLORS.darkGray}
              selectionColor={COLORS.darkGray}
            />
          </View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.darkGray,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.darkGray,
                ...FONTS.h5,
              }}
              placeholder="Email"
              placeholderTextColor={COLORS.darkGray}
              selectionColor={COLORS.darkGray}
            />
          </View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.darkGray,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.darkGray,
                ...FONTS.h5,
              }}
              placeholder="Mobile No."
              placeholderTextColor={COLORS.darkGray}
              selectionColor={COLORS.darkGray}
            />
          </View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.darkGray,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.darkGray,
                ...FONTS.h5,
              }}
              placeholder="Password"
              placeholderTextColor={COLORS.darkGray}
              selectionColor={COLORS.darkGray}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                bottom: 10,
                height: 30,
                width: 30,
              }}
              onPress={() => console.log('eye')}>
              <Image
                source={icons.eye}
                style={{width: 20, height: 20, tintColor: COLORS.darkGray}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.black,
              marginTop: SIZES.padding,
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: COLORS.white}}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
