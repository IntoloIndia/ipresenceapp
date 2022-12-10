import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import {
  FormInput,
  TextButton,
  ConfirmToast,
  HeaderBar,
} from '../../reuseableComponents';
import {FONTS, SIZES, COLORS, icons, images} from '../../constants';
import {getDevice, postDevice} from '../apiController/DeviceController';
import {useSelector} from 'react-redux';
import WifiManager from 'react-native-wifi-reborn';
import {PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {getEmployeeAttendance} from '../apiController/EmployeeController';

const DeviceConfig = () => {
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;

  const [deviceModal, setDeviceModal] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  const [deviceName, setDeviceName] = React.useState('');
  const [deviceSsid, setDeviceSsid] = React.useState('');
  const [devices, setDevices] = React.useState([]);

  const [wifiSsidList, setWifiSsidList] = useState([]);
  const [ssID, setSsID] = useState([]);

  const [employeeAttendance, setEmployeeAttendance] = React.useState([]);

  // post device data
  const PostDevice = async () => {
    const formData = {
      company_id: company_id,
      device_name: deviceName,
      device_ssid: deviceSsid,
    };
    const response = await postDepartment(formData);
    if (response.status === 200) {
      setSuccess(true);
      setDeviceModal(false);
      fetchDevice();
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // get department
  const fetchDevice = async () => {
    const response = await getDevice(company_id);
    setDevices(response.data);
  };

  const dateFormat = date => {
    let current_year = date.getFullYear();
    let current_month = date.getMonth() + 1;
    let current_date = ('0' + date.getDate()).slice(-2);

    const strDate = `${current_year}-${current_month}-${current_date}`;
    console.log(strDate);
    return strDate;
  };

  //----------------------------------------------

  const timeFormat = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${('0' + hours).slice(-2)}:${minutes} ${ampm}`;
    console.log(strTime)
    return strTime;
  };

  //----------------------------------------------
  const fetchEmployeeAttendance = async () => {
    const response = await getEmployeeAttendance(
      company_id,
      current_year,
      current_month,
      '638433aac4c9d31144e21c68',
    );
    if (response.status === 200) {
      setEmployeeAttendance(response.data);
      console.log('data', response.data);
    }
  };

  //=================================
  //New library Concept

  const [ssid, setSSID] = React.useState('');

  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;

  function deviceScan() {
    if (isConnected == true) {
      setSSID(netInfo.details.ssid);
      timeFormat(new Date());
    }
  }

  setTimeout(() => {
    deviceScan();
  }, 1000);

  //------------------------------------------

  function renderDeviceModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={deviceModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: COLORS.green_50,
              padding: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{...FONTS.h6, color: COLORS.true_gray_600}}>
                Config New Device
              </Text>
              <TouchableOpacity
                onPress={() => setDeviceModal(false)}
                style={{
                  backgroundColor: COLORS.white,
                  elevation: 5,
                }}>
                <Image
                  source={icons.cross}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.true_gray_600,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <FormInput
                placeholder={'Device name'}
                icon={icons.device_config}
                value={deviceName}
                onChange={text => setDeviceName(text)}
              />
              <FormInput
                placeholder={'Device ssid'}
                icon={icons.otp_verify}
                value={deviceSsid}
                onChange={text => setDeviceSsid(text)}
              />
              <TextButton
                label={'Submit'}
                buttonContainerStyle={{
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => PostDevice()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View>
      <HeaderBar title={'Device Config'} titleColor={COLORS.true_gray_700} />
      {renderDeviceModal()}
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Device Added Successfully'}
      />
      <ConfirmToast
        isVisible={update}
        onClose={() => setUpdate(false)}
        bgColor={COLORS.amber_600}
        icon={icons.update}
        message={'Device Updated Successfully'}
      />
      <ConfirmToast
        isVisible={remove}
        onClose={() => setRemove(false)}
        bgColor={COLORS.error}
        icon={icons.delete_}
        message={'Device Successfully'}
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

export default DeviceConfig;
