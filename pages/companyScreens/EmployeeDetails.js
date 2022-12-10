import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {HeaderBar} from '..//../reuseableComponents';
import {SIZES, COLORS, FONTS, icons, images} from '../../constants';

const EmployeeDetails = ({route}) => {
  const {Emp_details} = route.params;

  function renderEmployeeDetails() {
    return (
      <View
        style={{
          margin: 20,
          marginTop: 25,
          padding: 20,
          backgroundColor: COLORS.white,
          elevation: 10,
          borderRadius: 5,
        }}>
        {/* employee details */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_600,
                }}>
                Employee Code
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_600,
                  backgroundColor: COLORS.amber_300,
                  paddingHorizontal: 5,
                  left: 5,
                  textTransform: 'uppercase',
                }}>
                {Emp_details.employee_code}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Image
                source={icons.designation}
                resizeMode="cover"
                style={{height: 18, width: 18, tintColor: COLORS.true_gray_800}}
              />
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_600,
                  left: 10,
                  textTransform: 'capitalize',
                }}>
                {Emp_details.designation}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Image
                source={icons.call}
                resizeMode="cover"
                style={{height: 18, width: 18, tintColor: COLORS.true_gray_800}}
              />
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_600,
                  left: 10,
                }}>
                {Emp_details.employee_mobile}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Image
                source={icons.email}
                resizeMode="cover"
                style={{height: 18, width: 18, tintColor: COLORS.true_gray_800}}
              />
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_600,
                  left: 10,
                }}>
                {Emp_details.employee_email}
              </Text>
            </View>
          </View>
          <ImageBackground
            style={{
              backgroundColor: COLORS.white,
              padding: 5,
              elevation: 10,
              alignSelf: 'flex-start',
            }}>
            <Image
              source={images.Profile_01}
              resizeMode="cover"
              style={{
                height: 60,
                width: 60,
              }}
            />
          </ImageBackground>
        </View>
      </View>
    );
  }

  function renderEmployeeAttendance() {
    return (
      <View
        style={{
          margin: 20,
          marginTop: 25,
          padding: 20,
          backgroundColor: COLORS.white,
          elevation: 10,
          borderRadius: 5,
        }}>
        <Text style={{...FONTS.h6, color: COLORS.true_gray_800}}>
          Emloyee Attendance
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar
        title={Emp_details.employee_name}
        titleColor={COLORS.true_gray_700}
      />
      {renderEmployeeDetails()}
      {renderEmployeeAttendance()}
    </View>
  );
};

export default EmployeeDetails;
