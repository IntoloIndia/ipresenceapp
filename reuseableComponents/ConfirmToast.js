import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS, FONTS, icons} from '../constants';

const ConfirmToast = ({isVisible, onClose, bgColor, icon, message}) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: bgColor,
                bottom: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
                elevation: 10,
              }}>
              <Image
                source={icon}
                style={{height: 25, width: 25, tintColor: COLORS.true_gray_100}}
              />
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_100,
                  width: '70%',
                }}>
                {message}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: COLORS.true_gray_300,
                    right: 10,
                  }}></View>
                <TouchableOpacity onPress={onClose}>
                  <Image
                    source={icons.cross}
                    style={{
                      height: 25,
                      width: 25,
                      tintColor: COLORS.true_gray_100,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ConfirmToast;
