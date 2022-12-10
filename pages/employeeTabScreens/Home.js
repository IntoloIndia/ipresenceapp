import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {icons, COLORS, SIZES, images, FONTS} from '../../constants';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {
  postEmployeeInTimeAttendance,
  postEmployeeOutTimeAttendance,
} from '../apiController/EmployeeController';
import {useSelector} from 'react-redux';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const timeFormat = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${('0' + hours).slice(-2)}:${minutes} ${ampm}`;
  console.log(strTime);
  return strTime;
};

const Home = () => {
  const dateFormat = date => {
    let current_year = date.getFullYear();
    let current_month = date.getMonth() + 1;
    let current_date = ('0' + date.getDate()).slice(-2);

    const strDate = `${current_year}-${current_month}-${current_date}`;
    return strDate;
  };

  const userDetail = useSelector(state => state.employee);
  const user_id = userDetail._id;
  const company_id = userDetail.company_id;

  const postEmployeeInTime = async () => {
    const formData = {
      user_id: user_id,
      company_id: company_id,
    };
    const response = await postEmployeeInTimeAttendance(formData);
    if (response.status === 200 || 409) {
      console.log('response', response);
    }
  };

  const postEmployeeOutTime = async () => {
    const formData = {
      user_id: user_id,
      company_id: company_id,
    };
    console.log(formData);
    const response = await postEmployeeOutTimeAttendance(formData);
    if (response.status === 200 || 409) {
      console.log('response', response);
      stopBackgroundServices();
    }
  };

  const [wifiStatus, setWifiStatus] = React.useState('');

  const unsubscribe = () => {
    NetInfo.fetch('wifi').then(state => {
      setWifiStatus(state.isConnected);
    });
  };

  //----------------------------------------------------------

  const foregroundService = VIForegroundService.getInstance();

  const createChannel = async () => {
    const channelConfig = {
      id: 'ForegroundServiceChannel',
      name: 'Notification Channel',
      description: 'Notification Channel for Foreground Service',
      enableVibration: false,
      importance: 2,
    };
    await foregroundService.createNotificationChannel(channelConfig);
  };

  const startForegroundService = async () => {
    const notificationConfig = {
      channelId: 'ForegroundServiceChannel',
      id: 3456,
      title: 'Foreground Service',
      text: 'Foreground service is running',
      icon: 'ic_notification',
      priority: 0,
      button: 'Stop service',
    };
    try {
      await foregroundService.startService(notificationConfig);
    } catch (e) {
      console.error(e);
    }
  };

  const stopForegroundServices = async () => {
    await foregroundService.stopService();
  };

  //---
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        // console.log(i);
        postEmployeeOutTime();
        await BackgroundService.updateNotification({
          taskDesc: `Your Logout time is - ${timeFormat(new Date())}` + i,
        });
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Attendance',
    taskTitle: 'Your Today Attendance',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: COLORS.green,
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 5000,
    },
  };

  const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: `Your Logout time is - ${timeFormat(new Date())}`,
    });
  };

  const stopBackgroundServices = async () => {
    await BackgroundService.stop();
    BackgroundService.off();
  };

  //----------------------------------------------------------

  React.useEffect(() => {
    unsubscribe();
    if (wifiStatus === true) {
      postEmployeeInTime();
    }

    if (wifiStatus === false) {
      startBackgroundService();
    }
    createChannel();
  }, [wifiStatus]);

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 150,
          justifyContent: 'center',
          borderRadius: 25,
          elevation: 10,
          // alignItems: 'center',
        }}>
        <ImageBackground
          source={images.backg_2}
          resizeMode="cover"
          style={{
            height: 150,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: COLORS.transparentBlack5,
              height: 150,
              borderRadius: 25,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: '500',
                color: COLORS.yellow_400,
                textTransform: 'capitalize',
              }}>
              {userDetail.name}
            </Text>
            <Text
              style={{fontSize: 15, fontWeight: '500', color: COLORS.white}}>
              Your In-time : 08:10 AM
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={{padding: 15}}>
      {renderHeader()}
      {/* <Text>User Home</Text>
      <TouchableOpacity onPress={() => console.log('object')}>
        <Text style={{fontSize: 20, color: 'red'}}>click</Text>
      </TouchableOpacity> */}
      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => startForegroundService()}>
          <Text style={{fontSize: 25, color: 'red'}}>start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopForegroundServices()}>
          <Text style={{fontSize: 25, color: 'red'}}>stop</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => startBackgroundService()}>
          <Text style={{fontSize: 25, color: 'red'}}>b start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopBackgroundServices()}>
          <Text style={{fontSize: 25, color: 'red'}}>b stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
