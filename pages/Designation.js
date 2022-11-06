import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, icons} from '../constants';
import {
  HeaderBar,
  FormInput,
  TextButton,
  FloatingButton,
  CustomDropdown,
  ConfirmToast,
} from '../reuseableComponents';
import {getDepartment} from './apiController/DepartmentController';
import {
  getDesignationByCompanyId,
  postDesignation,
} from './apiController/DesignationController';
import {useSelector} from 'react-redux';

const CompanyDesignation = () => {
  // confirm toast & Modal
  const [addDesignationModal, setAddDesignationModal] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  // company data from redux
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;

  // form states of user
  const [designation, setDesignation] = React.useState('');
  //Department Dropdown
  const [openDep, setOpenDep] = useState(false);
  const [depValue, setDepValue] = useState(null);
  const [department, setDepartment] = useState([]);

  const onOpenDep = () => {
    fetchDepartment();
  };

  // get department from api
  const [designationData, setDesignationData] = React.useState([]);

  // post user data
  const postUserRegistration = async () => {
    const formData = {
      company_id: company_id,
      department_id: depValue,
      designation: designation,
    };
    const response = await postDesignation(formData);
    if (response.status === 200) {
      setSuccess(true);
      setAddDesignationModal(false);
      setDesignation('');
      setDepValue('');
      fetchDesignation();
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // get department
  const fetchDepartment = async () => {
    const response = await getDepartment(company_id);
    if (response.status === 200) {
      let depFromApi = response.data.map(ele => {
        return {label: ele.department, value: ele._id};
      });
      setDepartment(depFromApi);
    }
  };

  // get department
  const fetchDesignation = async () => {
    const response = await getDesignationByCompanyId(company_id);
    if (response.status === 200) {
      setDesignationData(response.data);
    }
  };

  React.useEffect(() => {
    fetchDesignation();
  }, []);
  //=====================================================================

  function renderAddDepartmentModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addDesignationModal}>
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
              backgroundColor: COLORS.white3,
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
                New Designation
              </Text>
              <TouchableOpacity
                onPress={() => setAddDesignationModal(false)}
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
            <View style={{marginTop: 20}}>
              <CustomDropdown
                placeholder="Select Department"
                open={openDep}
                value={depValue}
                items={department}
                setOpen={setOpenDep}
                setValue={setDepValue}
                setItems={setDepartment}
                listParentLabelStyle={{
                  color: COLORS.white,
                }}
                zIndex={2000}
                onOpen={onOpenDep}
              />
              <FormInput
                placeholder={'Designation'}
                icon={icons.name}
                onChange={text => setDesignation(text)}
              />
              <TextButton
                label="Submit"
                buttonContainerStyle={{
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => postUserRegistration()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderDesignation() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          backgroundColor:
            index % 2
              ? COLORS.warning_200
              : index % 3
              ? COLORS.amber_200
              : COLORS.green_200,
          padding: 15,
          borderRadius: 5,
          elevation: 5,
        }}>
        <View
          key={item._id}
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text style={{...FONTS.h4, color: COLORS.true_gray_700}}>
            {index + 1}.
          </Text>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.true_gray_700,
              textTransform: 'capitalize',
              left: 5,
              fontWeight: 'bold',
            }}>
            {item.department}
          </Text>
        </View>
        {item.designationList.map((ele, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                borderWidth: 1,
                borderColor: COLORS.darkGray2,
                padding: 5,
                backgroundColor: COLORS.true_gray_50,
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_700,
                  textTransform: 'capitalize',
                  left: 15,
                }}>
                {i + 1}.
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.true_gray_700,
                  textTransform: 'capitalize',
                  left: 20,
                }}>
                {ele.designation}
              </Text>
            </View>
          );
        })}
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={designationData}
        keyExtractor={item => `${item.department_id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                // height: 1,
                // backgroundColor: COLORS.true_gray_300,
                marginVertical: 10,
              }}></View>
          );
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar title={'Designation'} titleColor={COLORS.true_gray_800} />
      {renderDesignation()}
      {renderAddDepartmentModal()}
      <FloatingButton onClickBtn={() => setAddDesignationModal(true)} />
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Designation Added Successfully'}
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

export default CompanyDesignation;
