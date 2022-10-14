import React, {useRef, useState} from 'react';
import {Text, View, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {Background, TextFeild, TextButton1} from '../../reuseableComponents';

const NewLogin = ({navigation}) => {
  const [active, setActive] = useState(1);
  console.log(active);

  function renderButton() {
    return (
      <View style={styles.container}>
        <Button buttons={['Team', 'Company']} onClick={setActive} />
      </View>
    );
  }

  function Button({buttons, onClick}) {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateXOpposit = translateX.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const onPress = i => {
      onClick(i + 1);
      Animated.spring(translateX, {
        toValue: i * btnWidth,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    };

    return (
      <View
        style={styles.btnContainer}
        onLayout={e => setWidth(e.nativeEvent.layout.width)}>
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={btn}
            style={styles.btn}
            onPress={() => onPress(i)}>
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
    <Background>
      <View style={{alignItems: 'center', width: 392}}>
        <Text style={{fontSize: 60, color: COLORS.white, marginVertical: 20}}>
          Login
        </Text>
      </View>
      <View
        style={{
          height: 595,
          width: 392,
          backgroundColor: COLORS.white,
          borderTopRightRadius: 90,
          paddingTop: 60,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30, color: COLORS.green_700}}>
          Welcome Back
        </Text>
        <Text style={{fontSize: 15, color: COLORS.darkGray, marginBottom: 20}}>
          Hello, login to continue
        </Text>
        {/* {renderButton()} */}
        <TextFeild placeholder="Username or email" />
        <TextFeild placeholder="Password" secureTextEntry={true} />
        <View style={{alignItems: 'flex-end', width: '80%', marginBottom: 10}}>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: 'bold'}}>
            Forgot Password ?
          </Text>
        </View>
        <TextButton1
          btnTitle={'Login'}
          textColor={COLORS.white}
          bgColor={COLORS.green_700}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: 'bold'}}>
            Don't have an account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('NewSignUp')}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.green_800,
                fontWeight: 'bold',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
  },

  btnContainer: {
    height: 25,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#00000011',
    width: '100%',
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  animatedBtnContainer: {
    height: 25,
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: COLORS.darkGray,
  },

  animatedBtn: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default NewLogin;
