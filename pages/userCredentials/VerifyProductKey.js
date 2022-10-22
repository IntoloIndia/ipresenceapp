import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
import {
  FormInput,
  HeaderBar,
  TextButton,
  ConfirmToast,
} from '../../reuseableComponents';
import {useRoute} from '@react-navigation/native';
import {verifyCompanyProductKey} from '../apiController/CompanySignup';

const VerifyProductKey = ({navigation}) => {
  const route = useRoute();
  const company_id = route.params.company_id;
  const [productKey, setProductKey] = React.useState('');

  // confirm toast
  const [success, setSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  const VerifyProductKey = async () => {
    const FormData = {
      company_id: company_id,
      product_key: productKey,
    };
    const response = await verifyCompanyProductKey(FormData);
    if (response.status === 200) {
      setProductKey('');
      setSuccess(true);
      setTimeout(() => {
        navigation.navigate('Payment', {company_id: company_id});
      }, 2500);
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  function renderVerifyOtp() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              padding: 30,
              flex: 1,
              justifyContent: 'space-around',
            }}>
            <View style={{marginBottom: 30, alignItems: 'center'}}>
              <Image
                source={icons.product_key}
                style={{height: 80, width: 80, tintColor: COLORS.green_700}}
              />
              <Text
                style={{...FONTS.h6, color: COLORS.darkGray, marginTop: 20}}>
                Product Key Verification
              </Text>
              <Text style={{...FONTS.h4, textAlign: 'center', marginTop: 10}}>
                Enter your product key sent to your registered email
              </Text>
            </View>
            <View
              style={{
                marginBottom: 80,
              }}>
              <FormInput
                placeholder="Enter product key"
                icon={icons.otp_verify}
                onChange={text => setProductKey(text)}
                keyboardType="number-pad"
              />
              <TextButton
                label="OTP Verify"
                buttonContainerStyle={{
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => VerifyProductKey()}
              />
            </View>
            <View style={{marginTop: 12}}></View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar title="Verify Product Key" titleColor={COLORS.true_gray_800} />
      {renderVerifyOtp()}

      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Product Key Verification Successfully'}
      />

      <ConfirmToast
        isVisible={warn}
        onClose={() => setWarn(false)}
        bgColor={COLORS.error}
        icon={icons.warning}
        message={warnMessage}
      />
    </View>
  );
};

export default VerifyProductKey;
