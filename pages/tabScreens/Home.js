import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  RefreshControl,
  LogBox,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import {
  getEmployee,
  getEmployeeCount,
} from '../apiController/EmployeeController';
import {useSelector} from 'react-redux';
import {getDevice, postDevice} from '../apiController/DeviceController';
import WifiManager from 'react-native-wifi-reborn';
import {PermissionsAndroid} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [employee, setEmployee] = React.useState([]);
  const [employeeCount, setEmployeeCount] = React.useState([]);
  const [totalEmployee, setTotalEmployee] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // company data from redux
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;

  React.useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);
  }, []);

  const data = [
    {
      id: 1,
      name: 'present',
      qty: 430,
    },
    {
      id: 2,
      name: 'absent',
      qty: 30,
    },
    {
      id: 3,
      name: 'in leave',
      qty: 50,
    },
  ];

  const [todayStatus, setTodayStatus] = React.useState(data);

  // get department
  const fetchEmployee = async () => {
    const response = await getEmployee(company_id);
    if (response.status === 200) {
      setEmployee(response.data);
    }
  };

  // get Employee Counts
  const fetchEmployeeCount = async () => {
    const response = await getEmployeeCount(company_id);
    if (response.status === 200) {
      setTotalEmployee(response.data.total_employee);
      setEmployeeCount(response.data);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchEmployee();
    fetchEmployeeCount();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetchEmployee();
    fetchEmployeeCount();
  }, []);

  //==========================================================
  const [devices, setDevices] = React.useState([]);
  const [wifiSsidList, setWifiSsidList] = React.useState([]);

  const fetchDevice = async () => {
    const response = await getDevice(company_id);
    // console.log(response);
    setDevices(response.data);
  };

  const getDifference = (wifiSsidList, devices) => {
    // return wifiSsidList.filter(object1 => {
    //   return devices.some(object2 => {
    //     if (object1.SSID === object2.device_ssid) {
    //       console.log('SSID MATCHEd', object1.SSID);
    //       // alert('SSID MATCHEd', object1.SSID);
    //     }
    //   });
    // });
  };

  console.log(getDifference(wifiSsidList, devices));

  const getWiFiList = async () => {
    const re_scan_wifi_list = await WifiManager.reScanAndLoadWifiList();
    setWifiSsidList(re_scan_wifi_list);
    // console.log('wifilist', re_scan_wifi_list);

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
  }

  React.useEffect(() => {
    allowPermission();
    fetchDevice();

    setInterval(() => {
      getWiFiList();
    }, 8000);
  }, []);
  //==========================================================

  function renderHeader() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{
          paddingVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          marginLeft: index == 0 ? SIZES.radius : 0,
          marginRight: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <View>
            <ImageBackground
              style={{
                backgroundColor: COLORS.warning_600,
                padding: 6,
                borderRadius: 50,
                elevation: 5,
                marginTop: 5,
              }}>
              <Image
                source={item.img}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.white,
                }}
              />
            </ImageBackground>
          </View> */}
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                textTransform: 'capitalize',
                color: COLORS.true_gray_600,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.true_gray_700,
                fontWeight: 'bold',
              }}>
              {item.qty}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View
        style={{
          width: '100%',
          height: 200,
        }}>
        <ImageBackground
          source={images.banner_04}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          {/* <View
            style={{
              // marginTop: SIZES.radius,
              width: '100%',
              alignItems: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text></Text>
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{fontSize: 40, color: COLORS.white, fontWeight: '500'}}>
              {companyDetail.company_name}
            </Text>
            <Text style={{...FONTS.h4, color: COLORS.white}}>
              Total Company Emloyee
            </Text>
            <View
              style={{
                marginTop: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={icons.teamwork}
                resizeMode="cover"
                style={{height: 25, width: 25, tintColor: COLORS.white}}
              />
              <Text style={{fontSize: 25, color: COLORS.white, left: 5}}>
                {totalEmployee}
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', bottom: '-18%'}}>
            <Text
              style={{
                marginLeft: SIZES.radius,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              Today's Status
            </Text>
            <FlatList
              contentContainerStyle={{marginTop: 5}}
              data={todayStatus}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderEmployee() {
    const renderItem = ({item, index}) => (
      <View style={{paddingHorizontal: 5}}>
        {/* department  */}
        <View style={{}}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.true_gray_900,
              textTransform: 'capitalize',
            }}>
            {item.department} ({item.employee_count})
          </Text>
        </View>
        {/* employee list */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 5,
          }}>
          {item.employeeList.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: COLORS.amber_400,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginLeft: i === 0 ? 0 : 10,
                  marginBottom: 5,
                  borderRadius: 3,
                }}
                onPress={() =>
                  navigation.navigate('EmployeeDetails', {
                    Emp_details: {
                      _id: ele._id,
                      designation_id: ele.designation_id,
                      designation: ele.designation,
                      employee_code: ele.employee_code,
                      employee_name: ele.employee_name,
                      employee_mobile: ele.employee_mobile,
                      employee_email: ele.employee_email,
                    },
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.true_gray_700,
                    textTransform: 'uppercase',
                  }}>
                  {ele.employee_code}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );

    const HeaderComponent = () => (
      <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <Text style={{...FONTS.h6, color: COLORS.true_gray_800}}>
          Employee List
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.true_gray_600, left: 5}}>
          (by department)
        </Text>
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{
          margin: 20,
          marginTop: 60,
        }}
        data={employee}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComponent}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 0.8,
                backgroundColor: COLORS.true_gray_600,
                marginHorizontal: 5,
                marginVertical: 10,
              }}></View>
          );
        }}
      />
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      <View
        style={{flex: 1, paddingBottom: 200, backgroundColor: COLORS.green_50}}>
        {renderHeader()}
        {renderEmployee()}
      </View>
    </ScrollView>
  );
};

export default Home;
