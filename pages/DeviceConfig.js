import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import {
  FormInput,
  TextButton,
  ConfirmToast,
  HeaderBar,
} from '../reuseableComponents';
import { FONTS, SIZES, COLORS, icons, images } from '../constants';
import { getDevice, postDevice } from './apiController/DeviceController';
import { useSelector } from 'react-redux';
//===
import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

const DeviceConfig = () => {
  // company data from redux
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;
  // const company_id = '63515388d3e139468406f845';

  const [deviceModal, setDeviceModal] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  const [deviceName, setDeviceName] = React.useState('');
  const [deviceSsid, setDeviceSsid] = React.useState('');
  const [devices, setDevices] = React.useState([]);

  //
  const [wifiSsidList, setWifiSsidList] = useState([]);
  const [ssID, setSsID] = useState([]);


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
    // console.log(response);
    setDevices(response.data);
  };

  //======================

  //========================================================

  const getDifference = (wifiSsidList, devices) => {
    return wifiSsidList.filter(object1 => {
      return devices.some(object2 => {
        if (object1.SSID === object2.device_ssid) {
          console.log('SSID MATCHEd', object1.SSID);
          // alert('SSID MATCHEd', object1.SSID);
        }
      });
    });
  };

  console.log(getDifference(wifiSsidList, devices));
  //========================================================

  const getWiFiList = async () => {
    const re_scan_wifi_list = await WifiManager.reScanAndLoadWifiList();
    setWifiSsidList(re_scan_wifi_list);
    console.log('wifilist', re_scan_wifi_list);

    // for (const list of re_scan_wifi_list) {
    //   console.log('state ssid', newSsid);
    //   if (list.SSID === newSsid) {
    //     // setSsID(list.SSID);
    //     console.log('SSID Matched ', list.SSID);
    //     // console.log(ssID);
    //     return false;
    //   }
    // }

    // re_scan_wifi_list.map((ele, i) => {
    //   setWifiSsid(ele.SSID);
    //   ele.SSID === newSsid
    //     ? console.log('Mached SSID', ele.SSID)
    //     : console.log('Not Matched');
    // });
  };

  async function allowPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log('You can now use react-native-wifi-reborn');
      // let wifiList = await WifiManager.loadWifiList(); //wifiList will be Array<WifiEntry>
      // console.log('wifi list',wifiList);
      // wifiList.forEach(list => {
      //   console.log(list.SSID)
      // });
    } else {
      // Permission denied
      console.log('Permission denied');
    }
  };

  useEffect(() => {
    async function allowPermission() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // You can now use react-native-wifi-reborn
        console.log('You can now use react-native-wifi-reborn');
        // let wifiList = await WifiManager.loadWifiList(); //wifiList will be Array<WifiEntry>
        // console.log('wifi list',wifiList);
        // wifiList.forEach(list => {
        //   console.log(list.SSID)
        // });
      } else {
        // Permission denied
        console.log('Permission denied');
      }
    }
    allowPermission();
    fetchDevice();

    setInterval(() => {
      getWiFiList();
    }, 3000);
  }, []);

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
              <Text style={{ ...FONTS.h6, color: COLORS.true_gray_600 }}>
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
            <View style={{ marginTop: 20 }}>
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
