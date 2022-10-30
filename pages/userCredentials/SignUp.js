import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
import {
  HeaderBar,
  FormInput,
  TextButton,
  ConfirmToast,
} from '../../reuseableComponents';
import {companyRegistration} from '../apiController/CompanySignupController';

const SignUp = ({navigation}) => {
  const [companyName, setCompanyName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [email, setEmail] = React.useState('');

  // confirm toast
  const [success, setSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  const companySignUp = async () => {
    const FormData = {
      company_name: companyName,
      owner_name: userName,
      mobile: mobileNo,
      email: email,
    };
    const response = await companyRegistration(FormData);

    if (response.status == 200) {
      setSuccess(true);
      setCompanyName('');
      setUserName('');
      setMobileNo('');
      setEmail('');
      setTimeout(() => {
        navigation.navigate('VerifyProductKey', {company_id: response._id});
      }, 2500);
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  function renderSignUpForm() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              paddingHorizontal: 30,
              paddingBottom: 20,
              flex: 1,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 70,
              }}>
              <Image
                source={icons.user}
                style={{height: 80, width: 80, tintColor: COLORS.darkGray}}
              />
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.darkGray,
                  textAlign: 'center',
                  marginTop: 15,
                }}>
                Sign up to keep your daily presence {'\n'}in your organization
              </Text>
            </View>
            <View style={{marginBottom: 65}}>
              <FormInput
                placeholder="Company name"
                icon={icons.company}
                onChange={text => setCompanyName(text)}
              />
              <FormInput
                placeholder="Username"
                icon={icons.user}
                onChange={text => setUserName(text)}
              />
              <FormInput
                placeholder="Mobile no"
                icon={icons.call}
                onChange={text => setMobileNo(text)}
                keyboardType="number-pad"
              />
              <FormInput
                placeholder="Email address"
                icon={icons.email}
                onChange={text => setEmail(text)}
                keyboardType="email-address"
              />

              <TextButton
                label="Sign Up"
                buttonContainerStyle={{
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => companySignUp()}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                Already have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text
                  style={{
                    ...FONTS.h4,
                    left: 5,
                    color: COLORS.green_700,
                  }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar title="SignUp" titleColor={COLORS.true_gray_800} />
      {renderSignUpForm()}
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Company Registered Successfully'}
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

export default SignUp;
