import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '../../constants';
import {HeaderBar} from '../../reuseableComponents';

const ForgotPassword = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar title="Forgot Password" />
      <View></View>
    </View>
  );
};

export default ForgotPassword;
