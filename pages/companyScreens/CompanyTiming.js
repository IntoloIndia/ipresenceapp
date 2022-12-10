import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
import {
  HeaderBar,
  FormInput,
  TextButton,
  FloatingButton,
  CustomDropdown,
  ConfirmToast,
} from '../../reuseableComponents';
import {
  companyTime,
  getCompanyTiming,
} from '../apiController/CompanyController';
import {useSelector} from 'react-redux';

const CompanyTiming = () => {
  // confirm toast & Modal
  const [addTimingModal, setAddTimingModal] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  // company data from redux
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;

  // form states of user
  const [openTime, setOpenTime] = React.useState('');
  const [closeTime, setCloseTime] = React.useState('');
  const [lunchStartTime, setLunchStartTime] = React.useState('');
  const [lunchOverTime, setLunchOverTime] = React.useState('');

  // data of company timing
  const [companyTiming, setCompanyTiming] = React.useState([]);

  // post company data
  const postCompanyTiming = async () => {
    const userData = {
      company_id: company_id,
      open_time: openTime,
      close_time: closeTime,
      lunch_start_time: lunchStartTime,
      lunch_over_time: lunchOverTime,
    };
    const response = await companyTime(userData);

    if (response.status === 200) {
      setSuccess(true);
      setAddTimingModal(false);
      setOpenTime('');
      setCloseTime('');
      setLunchStartTime('');
      setLunchOverTime('');
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // get company timing
  const fetchCompanyTiming = async () => {
    const response = await getCompanyTiming(company_id);
    if (response.status === 200) {
      setCompanyTiming(response.data);
    }
  };

  React.useEffect(() => {
    fetchCompanyTiming();
  }, []);

  function renderAddDepartmentModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={addTimingModal}>
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
              <Text style={{...FONTS.h7, color: COLORS.true_gray_600}}>
                Office timing
              </Text>
              <TouchableOpacity
                onPress={() => setAddTimingModal(false)}
                style={{
                  backgroundColor: COLORS.white,
                  elevation: 5,
                  padding: 2,
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
            <View style={{marginTop: 10}}>
              {/* <Text style={{...FONTS.h3, color: COLORS.true_gray_600}}>
                User Name
              </Text> */}
              <FormInput
                placeholder={'Open time'}
                icon={icons.office_s_time}
                onChange={text => setOpenTime(text)}
              />
              {/* <Text style={{...FONTS.h3, color: COLORS.true_gray_600}}>
                User Name
              </Text> */}
              <FormInput
                placeholder={'Close time'}
                icon={icons.office_s_time}
                onChange={text => setCloseTime(text)}
              />
              {/* <Text style={{...FONTS.h3, color: COLORS.true_gray_600}}>
                Email
              </Text> */}
              <FormInput
                placeholder={'Lunch start time'}
                icon={icons.lunch_time}
                onChange={text => setLunchStartTime(text)}
              />
              {/* <Text style={{...FONTS.h3, color: COLORS.true_gray_600}}>
                Mobile No
              </Text> */}
              <FormInput
                placeholder={'Lunch over time'}
                icon={icons.lunch_time}
                onChange={text => setLunchOverTime(text)}
              />
              <TextButton
                label="Submit"
                buttonContainerStyle={{
                  marginTop: 10,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => postCompanyTiming()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderCompanyOfficeTiming() {
    const renderItem = ({item}) => (
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 15,
          borderRadius: 5,
          elevation: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
            Office Open Time {' -  '}
          </Text>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: '700'}}>
            {item.open_time}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
            Office Close Time {' -  '}
          </Text>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: '700'}}>
            {item.close_time}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
            Office Lunch Start Time {' -  '}
          </Text>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: '700'}}>
            {item.lunch_start_time}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
            Office Lunch Over Time {' -  '}
          </Text>
          <Text
            style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: '700'}}>
            {item.lunch_over_time}
          </Text>
        </View>
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={companyTiming}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar title={'Office timings'} titleColor={COLORS.true_gray_800} />
      {renderCompanyOfficeTiming()}
      {renderAddDepartmentModal()}
      <FloatingButton onClickBtn={() => setAddTimingModal(true)} />
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Office Times Added Successfully'}
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

export default CompanyTiming;
