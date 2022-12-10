import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '../../constants';

const Account = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.green_50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Account</Text>
    </View>
  );
};

export default Account;
