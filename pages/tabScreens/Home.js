import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {LOCAL_API_URL} from '@env';
import {ConfirmToast} from '../../reuseableComponents';
import {COLORS, icons} from '../../constants';

const Home = () => {
  const [ms, sms] = React.useState(false);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ConfirmToast
        isVisible={ms}
        onClose={() => sms(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Successfully!'}
      />
      <TouchableOpacity onPress={() => sms(true)}>
        <Text>on</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sms(true)}>
        <Text>off</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
