import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS} from '../../constants';
import {Background, TextFeild, TextButton1} from '../../reuseableComponents';

const NewSignUp = ({navigation}) => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 392}}>
        <Text style={{fontSize: 60, color: COLORS.white, marginTop: 20}}>
          Register
        </Text>
        <Text style={{fontSize: 15, color: COLORS.white, marginBottom: 20}}>
          Create your new account
        </Text>
      </View>
      <View
        style={{
          height: 590,
          width: 392,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 90,
          paddingTop: 60,
          alignItems: 'center',
        }}>
        <TextFeild placeholder="Company name" />
        <TextFeild placeholder="Owner name" />
        <TextFeild placeholder="Email" />
        <TextFeild placeholder="Mobile No." />
        <TextFeild placeholder="Location" />

        {/* <View style={{width: '80%', marginBottom: 10, flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
              Privacy policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View> */}
        <TextButton1
          btnTitle={'Sign Up'}
          textColor={COLORS.white}
          bgColor={COLORS.green_700}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: 'bold'}}>
            Already have an account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('NewLogin')}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.green_800,
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};
export default NewSignUp;
