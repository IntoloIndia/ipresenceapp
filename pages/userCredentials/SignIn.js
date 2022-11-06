import React, {useRef, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {FormInput, TextButton, ConfirmToast} from '../../reuseableComponents';
import {COLORS, FONTS, icons, images} from '../../constants';
import {companyLogin} from '../../services/companyAuthApi';
import {userLogin} from '../../services/employeeAuthApi';
import {useDispatch} from 'react-redux';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';

const {width} = Dimensions.get('window');

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  //team
  const [employeeId, setEmployeeId] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  //company
  const [companyMobileNo, setCompanyMobileNo] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  //
  const [showPass, setShowPass] = useState(false);
  const [loginPreference, setLoginPreference] = useState(false);

  // confirm toast
  const [success, setSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  // company login
  const CompanyLoginHandler = async () => {
    const companyData = {
      mobile: companyMobileNo,
      password: companyPassword,
    };
    const response = await dispatch(companyLogin(companyData));
    if (response.payload.status) {
      setSuccess(true);
      setCompanyMobileNo('');
      setCompanyPassword('');
      setTimeout(() => {
        navigation.navigate('Tabs');
      }, 2500);
    } else {
      setWarnMessage(response.payload.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // company login
  const EmployeeLoginHandler = async () => {
    const employeeData = {
      emp_id: employeeId,
      password: employeePassword,
    };
    const response = await dispatch(userLogin(employeeData));
    if (response.payload.status) {
      setSuccess(true);
      setEmployeeId('');
      setEmployeePassword('');
      setTimeout(() => {
        navigation.navigate('Tabs');
      }, 2500);
    } else {
      setWarnMessage(response.payload.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  function renderTeamSignIn() {
    return (
      <View>
        <FormInput
          placeholder="Emp Unique Id"
          icon={icons.profile}
          onChange={text => setEmployeeId(text)}
        />
        <FormInput
          placeholder="Password"
          icon={icons.password}
          secureTextEntry={!showPass}
          onChange={text => setEmployeePassword(text)}
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
          onPress={() => EmployeeLoginHandler()}
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
          onPress={() => CompanyLoginHandler()}
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
              {/* <Text
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
              </Text> */}
            </View>

            <View
              style={{
                marginBottom: 50,
                backgroundColor: COLORS.white,
                elevation: 5,
                borderRadius: 10,
                padding: 20,
                paddingVertical: 30,
                // alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  loginPreference == true
                    ? setLoginPreference(false)
                    : setLoginPreference(true);
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
                    ...FONTS.h5,
                    color: COLORS.white,
                    backgroundColor: COLORS.green_700,
                    paddingHorizontal: 12,
                    paddingVertical: 3,
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

              {/* <DuoToggleSwitch
                style={{
                  maxHeight: 30,
                  maxWidth: 200,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                primaryText="User"
                secondaryText="Company"
                onPrimaryPress={() => setLoginPreference(false)}
                onSecondaryPress={() => setLoginPreference(true)}
                activeColor={COLORS.green_700}
                inactiveColor={COLORS.true_gray_200}
                primaryButtonStyle={{
                  maxHeight: 30,
                  maxWidth: 100,
                }}
                secondaryButtonStyle={{
                  maxHeight: 30,
                  maxWidth: 100,
                }}
                primaryTextStyle={{borderRadius: null}}
              /> */}

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

  // tab buttons
  function SwiperPagerButton() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons = ['User', 'Company'];
    const onCLick = i => this.scrollView.scrollTo({x: i * width});
    return (
      <View style={styles.container}>
        <View style={{padding: 5, paddingTop: 0}}>
          <ButtonContainer
            buttons={buttons}
            onClick={onCLick}
            scrollX={scrollX}
          />
        </View>
        <ScrollView
          ref={e => (this.scrollView = e)}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {buttons.map((x, i) => (
            <View style={[styles.card]} key={x}>
              {i === 0 ? renderTeamSignIn() : renderCompanySignIn()}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  function ButtonContainer({buttons, onClick, scrollX}) {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [0, btnWidth],
    });
    const translateXOpposit = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [0, -btnWidth],
    });
    return (
      <View
        style={styles.btnContainer}
        onLayout={e => setWidth(e.nativeEvent.layout.width)}>
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={btn}
            style={styles.btn}
            onPress={() => onClick(i)}>
            <Text>{btn}</Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.animatedBtnContainer,
            {width: btnWidth, transform: [{translateX}]},
          ]}>
          {buttons.map(btn => (
            <Animated.View
              key={btn}
              style={[
                styles.animatedBtn,
                {width: btnWidth, transform: [{translateX: translateXOpposit}]},
              ]}>
              <Text style={styles.btnTextActive}>{btn}</Text>
            </Animated.View>
          ))}
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      {renderSignIn()}
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={"You're Logged In Successfully"}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  btnContainer: {
    height: 40,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#00000011',
    // width: '100%',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBtnContainer: {
    height: 40,
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#444',
  },
  animatedBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    width: width - 10,
    // height: '100%',
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: COLORS.true_gray_400,
    padding: 20,
  },
});

export default SignIn;
