import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Linking,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS, COLORS, SIZES, icons, images, constants} from '../../constants';

const Login = ({navigation}) => {
  const [switchValue, setSwitchValue] = React.useState(false);
  const toggleSwitch = value => {
    setSwitchValue(value);
    if (value) {
    } else {
    }
  };

  function renderUserForm() {
    return (
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
        }}>
        <View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.h5,
              }}
              placeholder="Mobile No."
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.h5,
              }}
              placeholder="Password"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
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
              onPress={() => console.log('object')}>
              <Image
                source={icons.eye}
                style={{width: 20, height: 20, tintColor: COLORS.white}}
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
            <Text style={{color: COLORS.white}}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCompanyForm() {
    return (
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
        }}>
        <View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.h5,
              }}
              placeholder="Mobile No."
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
          <View style={{marginTop: SIZES.base}}>
            <TextInput
              style={{
                marginVertical: SIZES.base,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.h5,
              }}
              placeholder="Password"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
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
              onPress={() => console.log('object')}>
              <Image
                source={icons.eye}
                style={{width: 20, height: 20, tintColor: COLORS.white}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              marginTop: SIZES.padding,
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: COLORS.black}}>SignIn</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{...FONTS.h4, color: COLORS.white}}>
            Don't have an account?{' '}
          </Text>
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: 'bold',
              backgroundColor: COLORS.true_gray_200,
              padding: 2,
            }}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderToggleButton() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            marginRight: SIZES.base,
            color: switchValue ? COLORS.white : COLORS.white,
          }}>
          Team
        </Text>
        <Switch
          onValueChange={toggleSwitch}
          value={switchValue}
          trackColor={{false: COLORS.gray, true: COLORS.gray}}
          thumbColor={switchValue ? COLORS.white : COLORS.white}
          ios_backgroundColor={COLORS.blue}
        />
        <Text
          style={{
            ...FONTS.h4,
            marginLeft: SIZES.base,
            color: switchValue ? COLORS.white : COLORS.white,
          }}>
          Company
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.green_800, COLORS.green_600]}
      style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                marginBottom: 48,
                alignItems: 'center',
              }}>
              <Image
                source={images.logo_1}
                resizeMode="contain"
                style={{
                  height: 100,
                }}
              />
            </View>
            <View>
              {renderToggleButton()}
              {switchValue ? renderCompanyForm() : renderUserForm()}
            </View>
            <View style={{marginBottom: 80}}></View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: SIZES.radius,
    paddingBottom: SIZES.padding,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default Login;
