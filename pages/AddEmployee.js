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
import {getDesignation} from './apiController/DesignationController';
import {useSelector} from 'react-redux';
import {
  getEmployee,
  employeeRegistration,
} from './apiController/EmployeeController';

const CompanyTeamRegister = () => {
  // confirm toast & Modal
  const [teamAddModal, setTeamAddModal] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  // company data from redux
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;

  // form states of user
  const [userName, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [empCode, setEmpCode] = React.useState('');
  console.log(empCode);
  //Department Dropdown
  const [openDep, setOpenDep] = useState(false);
  const [depValue, setDepValue] = useState(null);
  const [department, setDepartment] = useState([]);

  const onOpenDep = () => {
    setOpenDes(false);
    fetchDepartment();
  };
  //Designation Dropdown
  const [openDes, setOpenDes] = useState(false);
  const [desValue, setDesValue] = useState(null);
  const [designation, setDesignation] = useState([]);

  const onOpenDes = () => {
    setOpenDep(false);
  };

  const [users, setUsers] = React.useState([]);

  // post user data
  const postUserRegistration = async () => {
    const userData = {
      company_id: company_id,
      department_id: depValue,
      designation_id: desValue,
      employee_name: userName,
      employee_email: email,
      employee_mobile: mobile,
      employee_code: empCode,
    };
    const response = await employeeRegistration(userData);
    if (response.status === 200) {
      setSuccess(true);
      setTeamAddModal(false);
      setDepValue('');
      setDesValue('');
      setUsername('');
      setEmail('');
      setMobile('');
      setEmpCode('');
      fetchEmployee();
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

  // get designations on change of department
  const onChangeDepartment = async department_id => {
    const response = await getDesignation(department_id);
    if (response.status === 200) {
      let desFromApi = response.data.map(ele => {
        return {label: ele.designation, value: ele._id};
      });
      setDesignation(desFromApi);
    }
  };

  // get department
  const fetchEmployee = async () => {
    const response = await getEmployee(company_id);
    if (response.status === 200) {
      setUsers(response.data);
    }
  };

  React.useEffect(() => {
    fetchEmployee();
  }, []);
  //============================================================

  function renderTeamModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={teamAddModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              top:20,
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
                New User
              </Text>
              <TouchableOpacity
                onPress={() => setTeamAddModal(false)}
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
                onChangeValue={value => onChangeDepartment(value)}
              />
              <CustomDropdown
                placeholder="Select Designation"
                open={openDes}
                value={desValue}
                items={designation}
                setOpen={setOpenDes}
                setValue={setDesValue}
                setItems={setDesignation}
                listParentLabelStyle={{
                  color: COLORS.white,
                }}
                zIndex={1000}
                onOpen={onOpenDes}
              />
              <FormInput
                placeholder={'Employee Code'}
                icon={icons.name}
                onChange={text => setEmpCode(text)}
              />
              <FormInput
                placeholder={'Name'}
                icon={icons.name}
                onChange={text => setUsername(text)}
              />
              {/* <Text style={{...FONTS.h3, color: COLORS.true_gray_600}}>
                Email
              </Text> */}
              <FormInput
                placeholder={'Email'}
                icon={icons.email}
                onChange={text => setEmail(text)}
              />
              {/* <Text style={{...FONTS.h3, color: COLORS.true_gray_600}}>
                Mobile No
              </Text> */}
              <FormInput
                placeholder={'Mobile'}
                icon={icons.call}
                onChange={text => setMobile(text)}
              />

              <TextButton
                label="Submit"
                buttonContainerStyle={{
                  marginTop: 10,
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

  function renderUsers() {
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
        {item.employeeList.map((ele, i) => {
          return (
            <View
              key={i}
              style={{
                // borderTopWidth: i == 0 ? null : 1,
                // marginVertical: 5,
                // borderColor: COLORS.true_gray_400,
                // borderRadius:5,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: COLORS.darkGray2,
                padding: 5,
                backgroundColor: COLORS.true_gray_50,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // marginTop: i == 0 ? null : 10,
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
                  {ele.employee_name}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', left: 25}}>
                <Image source={icons.call} style={{height: 15, width: 15}} />
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.true_gray_700,
                    left: 10,
                  }}>
                  {ele.employee_mobile}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', left: 25}}>
                <Image source={icons.email} style={{height: 15, width: 15}} />
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.true_gray_700,
                    left: 10,
                  }}>
                  {ele.employee_email}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={users}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                // height: 1,
                // backgroundColor: COLORS.true_gray_400,
                marginVertical: 10,
              }}></View>
          );
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar
        title={'Team Registration'}
        titleColor={COLORS.true_gray_800}
      />
      {renderTeamModal()}
      {renderUsers()}
      <FloatingButton onClickBtn={() => setTeamAddModal(true)} />
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'User Registered Successfully'}
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

export default CompanyTeamRegister;
