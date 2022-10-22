import React, {useState} from 'react';
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
import {FormInput, TextButton} from '../../reuseableComponents';
import {COLORS, FONTS, icons, images} from '../../constants';

const SignIn = ({navigation}) => {
  //team
  const [teamMobileNo, setTeamMobileNo] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  //company
  const [companyMobileNo, setCompanyMobileNo] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  //
  const [showPass, setShowPass] = useState(false);
  const [loginPreference, setLoginPreference] = useState(false);

  // on change handler
  const loginHandler = () => {
    if (loginPreference == true) {
      setTeamMobileNo('');
      setTeamPassword('');
    } else {
      setCompanyMobileNo('');
      setCompanyPassword('');
    }
  };

  function renderTeamSignIn() {
    return (
      <View>
        <FormInput
          placeholder="Mobile"
          keyboardType="number-pad"
          icon={icons.call}
          onChange={text => setTeamMobileNo(text)}
        />
        <FormInput
          placeholder="Password"
          icon={icons.password}
          secureTextEntry={!showPass}
          onChange={text => setTeamPassword(text)}
          appendComponent={
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.darkGray,
                }}
              />
            </TouchableOpacity>
          }
        />
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginTop: 5}}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <TextButton
          label="Sign In"
          buttonContainerStyle={{
            marginTop: 20,
            height: 40,
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => alert('Team Sign in')}
        />
      </View>
    );
  }

  function renderCompanySignIn() {
    return (
      <View>
        <FormInput
          placeholder="Mobile"
          keyboardType="number-pad"
          icon={icons.call}
          onChange={text => setCompanyMobileNo(text)}
        />
        <FormInput
          placeholder="Password"
          icon={icons.password}
          secureTextEntry={!showPass}
          onChange={text => setCompanyPassword(text)}
          appendComponent={
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.darkGray,
                }}
              />
            </TouchableOpacity>
          }
        />
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginTop: 5}}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <TextButton
          label="Sign In"
          buttonContainerStyle={{
            marginTop: 20,
            height: 40,
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => alert('Company Sign in')}
        />
      </View>
    );
  }

  function renderSignIn() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding: 20, flex: 1, justifyContent: 'space-around'}}>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 50,
              }}>
              <Image source={images.logo} style={{height: 90, width: 280}} />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: COLORS.darkGray,
                  textAlign: 'center',
                }}>
                Welcome Back
              </Text>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                Sign in to continue
              </Text>
            </View>

            <View
              style={{
                marginBottom: 50,
                backgroundColor: COLORS.white,
                elevation: 5,
                borderRadius: 10,
                padding: 20,
                paddingVertical: 30,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  loginPreference == true
                    ? (setLoginPreference(false), loginHandler())
                    : (setLoginPreference(true), loginHandler());
                }}>
                {loginPreference && (
                  <Image
                    source={icons.right}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.black,
                      right: 8,
                    }}
                  />
                )}
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                    backgroundColor: COLORS.green_700,
                    paddingHorizontal: 8,
                    paddingVertical: 1,
                    borderRadius: 2,
                  }}>
                  {loginPreference == true ? 'Team Login' : 'Company Login'}
                </Text>
                {!loginPreference && (
                  <Image
                    source={icons.left}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.black,
                      left: 8,
                    }}
                  />
                )}
              </TouchableOpacity>
              <View style={{marginTop: 40}}>
                {loginPreference == true
                  ? renderCompanySignIn()
                  : renderTeamSignIn()}
              </View>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                  Don't have an account ?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      left: 5,
                      color: COLORS.green_700,
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginHorizontal: 115,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    elevation: 10,
                  }}>
                  <Image
                    source={icons.email_circle}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    elevation: 10,
                  }}>
                  <Image
                    source={icons.linkedin}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    elevation: 10,
                  }}>
                  <Image
                    source={icons.website}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      {renderSignIn()}
    </View>
  );
};

export default SignIn;
