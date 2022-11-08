import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  HeaderBar,
  FormInput,
  TextButton,
  FloatingButton,
  ConfirmToast,
} from '../reuseableComponents';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {useSelector} from 'react-redux';
import {
  postDepartment,
  getDepartment,
  editDepartment,
  deleteDepartment,
} from './apiController/DepartmentController';

const CompanyDepartment = () => {
  // confirm toast & Modal
  const [addDepartmentModal, setAddDepartmentModal] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  // company data from redux
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;

  // form states of user
  const [department, setDepartment] = React.useState('');

  // get department from api
  const [departmentData, setDepartmentData] = React.useState([]);

  // post user data
  const PostDepartment = async () => {
    const formData = {
      company_id: company_id,
      department: department,
    };
    const response = await postDepartment(formData);
    if (response.status === 200) {
      setSuccess(true);
      setAddDepartmentModal(false);
      setDepartment('');
      fetchDepartment();
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  // get data
  const [depId, setDepId] = React.useState('');
  const getDepartmentData = (id, department) => {
    setDepId(id);
    setDepartment(department);
    setAddDepartmentModal(true);
  };

  // edit department
  const EditDepartment = async () => {
    const formData = {
      company_id: company_id,
      department: department,
    };
    let response = await editDepartment(depId, formData);
    if (response.status === 200) {
      setUpdate(true);
      setAddDepartmentModal(false);
      setDepartment('');
      fetchDepartment();
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setUpdate(false);
    }, 2000);
  };

  // delete tools & machinery
  const DeleteDepartment = async id => {
    let response = await deleteDepartment(id);
    if (response.status === 200) {
      setRemove(true);
      fetchDepartment();
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setRemove(false);
    }, 2000);
  };

  // get department
  const fetchDepartment = async () => {
    const response = await getDepartment(company_id);
    if (response.status === 200) {
      setDepartmentData(response.data);
    }
  };

  React.useEffect(() => {
    fetchDepartment();
  }, []);
  //========================================================================

  function renderAddDepartmentModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addDepartmentModal}>
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
                New Department
              </Text>
              <TouchableOpacity
                onPress={() => setAddDepartmentModal(false)}
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
              <FormInput
                placeholder={'Department'}
                icon={icons.name}
                value={department}
                onChange={text => setDepartment(text)}
              />
              <TextButton
                label={depId != '' ? 'Update' : 'Submit'}
                buttonContainerStyle={{
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() =>
                  depId != '' ? EditDepartment() : PostDepartment()
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderDepartment() {
    const renderItem = ({item, index}) => (
      <View
        key={item._id}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.true_gray_700}}>
            {index + 1}.
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.true_gray_700,
              textTransform: 'capitalize',
              left: 5,
            }}>
            {item.department}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => getDepartmentData(item._id, item.department)}
            style={{
              right: 15,
              backgroundColor: COLORS.green_600,
              padding: 6,
              borderRadius: 5,
              elevation: 10,
            }}>
            <Image
              source={icons.edit}
              style={{height: 12, width: 12, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => DeleteDepartment(item._id)}
            style={{
              backgroundColor: COLORS.error,
              padding: 6,
              borderRadius: 5,
              elevation: 10,
            }}>
            <Image
              source={icons.delete_}
              style={{height: 12, width: 12, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={departmentData}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.true_gray_300,
                marginVertical: 10,
              }}></View>
          );
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      <HeaderBar title={'Departments'} titleColor={COLORS.true_gray_700} />
      {renderAddDepartmentModal()}
      {renderDepartment()}
      <FloatingButton onClickBtn={() => setAddDepartmentModal(true)} />
      <ConfirmToast
        isVisible={success}
        onClose={() => setSuccess(false)}
        bgColor={COLORS.green_700}
        icon={icons.success}
        message={'Department Added Successfully'}
      />
      <ConfirmToast
        isVisible={update}
        onClose={() => setUpdate(false)}
        bgColor={COLORS.amber_600}
        icon={icons.update}
        message={'Department Updated Successfully'}
      />
      <ConfirmToast
        isVisible={remove}
        onClose={() => setRemove(false)}
        bgColor={COLORS.error}
        icon={icons.delete_}
        message={'Deleted Successfully'}
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

export default CompanyDepartment;
