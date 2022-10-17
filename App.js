/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import DeviceInfoOne from './screens/DeviceInfoOne';
import DeviceInfoTwo from './screens/DeviceInfoTwo';

import DeviceInfo from 'react-native-device-info';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

import WifiManager from "react-native-wifi-reborn";
import { PermissionsAndroid } from 'react-native';


const App = () => {
    const [activeTab, setActiveTab] = useState('infoOne');
    const [uniqueID, setUniqueID] = useState({});
    const [ssID, setSsID] = useState({});
    const [connectionStatus, setConnectionStatus] = useState(false);

    const netData = useNetInfo();

    const getDeviceData = async () => {
      const deviceJSON = {};
      deviceJSON.deviceUniqueId = DeviceInfo.getUniqueId(); //get device unique id
      setTimeout(() => {
          // console.log(JSON.stringify(deviceJSON.deviceUniqueId._j)) // only unique id
          console.log(JSON.stringify(deviceJSON))
          console.log(netData);
          // alert(JSON.stringify(deviceJSON))
      }, 100);  

      let wifiList = await WifiManager.loadWifiList(); //wifiList will be Array<WifiEntry>
      console.log('wifi list',wifiList);
      wifiList.forEach(list => {
        list.SSID === 'SDD3' ? console.log(list.SSID) : console.log("null");
        // if (list.SSID === 'maa’s iPhone' ) {
        //   alert(list.SSID);
        // }else{
        //   alert("not found");

        // }
        console.log(list.SSID)
      });

    }

    // const getNetInfo = () => {
    //   NetInfo.fetch().then(state => {
    //     console.log(state);
    //   });
    // }
    
    // useEffect( async () => {
    //     //getDeviceData();
    //     // getNetInfo();
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Location permission is required for WiFi connections',
    //           message:
    //             'This app needs location permission as this is required  ' +
    //             'to scan for wifi networks.',
    //           buttonNegative: 'DENY',
    //           buttonPositive: 'ALLOW',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //           // You can now use react-native-wifi-reborn
    //           console.log('You can now use react-native-wifi-reborn');
    //           // let wifiList = await WifiManager.loadWifiList(); //wifiList will be Array<WifiEntry>
    //           // console.log('wifi list',wifiList);
    //           // wifiList.forEach(list => {
    //           //   console.log(list.SSID)
    //           // });
    //         } else {
    //           // Permission denied
    //           console.log('Permission denied');
    //       }

    // },[]);


  return (
    <SafeAreaView style={styles.container}>
        { activeTab === 'infoOne' ? <DeviceInfoOne title="Device Info One" /> : 
            activeTab === 'infoTwo' ? <DeviceInfoTwo title="Device Info Two" /> :
            null} 
        <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('infoOne')}>
                <Text style={styles.tabText}>Info One </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Two')}>
                <Text style={styles.tabText}>Info Two </Text>
            </TouchableOpacity>
        </View>

            {/* <TouchableOpacity style={styles.tab} onPress={() => getDeviceData()}>
                <Text style={styles.tabText}>Into Two </Text>
            </TouchableOpacity> */}
        <Button
            title="Reload"
            onPress={() => getDeviceData() }
        />

        {/* <View style={styles.body}>
            <Text style={styles.buttonText}>
            Connection Status : {connectionStatus === true ? 'Connected' : 'Disconnected'}
            </Text>
        </View> */}

        {/* <Button
            title="Reload"
            onPress={() => getWifiData() }
        /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5fcff',
    // marginTop: 32,
    // paddingHorizontal: 24,
  },
  tabBar:{
    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  body: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2193b0',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default App;
