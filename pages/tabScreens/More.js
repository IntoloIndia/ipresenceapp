import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {FONTS, COLORS, icons} from '../../constants';
import {useSelector} from 'react-redux';

const More = ({navigation}) => {
  const companyDetail = useSelector(state => state.company);

  const tabLists = [
    {id: 1, img: icons.account, name: 'Add Employee'},
    {id: 2, img: icons.department, name: 'Add Department'},
    {id: 3, img: icons.designation, name: 'Add Designation'},
    {id: 4, img: icons.device_config, name: 'Device Configuration'},
    {id: 5, img: icons.login, name: 'Logout'},
  ];
  const [lists, setLists] = React.useState(tabLists);

  //===============================================================

  function renderTabLists() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() =>
          item.id == 1
            ? navigation.navigate('AddEmployee')
            : item.id === 2
            ? navigation.navigate('Department')
            : item.id === 3
            ? navigation.navigate('Designation')
            : item.id === 4
            ? navigation.navigate('DeviceConfig')
            : item.id === 5
            ? alert('Logout')
            : null
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ImageBackground
            style={{
              backgroundColor: COLORS.green_200,
              padding: 8,
              borderRadius: 50,
              elevation: 2,
            }}>
            <Image
              source={item.img}
              style={{height: 18, width: 18, tintColor: COLORS.black}}
            />
          </ImageBackground>
          <Text style={{...FONTS.h4, color: COLORS.true_gray_700, left: 15}}>
            {item.name}
          </Text>
        </View>
        {item.id != 5 && (
          <Image
            source={icons.right_arr1}
            style={{height: 18, width: 18, tintColor: COLORS.black}}
          />
        )}
      </TouchableOpacity>
    );

    const HeaderComponent = () => <View>{/* {renderCompanyProfile()} */}</View>;
    return (
      <FlatList
        contentContainerStyle={{
          margin: 20,
        }}
        data={lists}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        ListHeaderComponent={HeaderComponent}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.true_gray_300,
                marginVertical: 10,
              }}></View>
          );
        }}
      />
    );
  }

  function renderCompanyProfile() {
    return (
      <View
        style={{
          backgroundColor: COLORS.green_700,
          padding: 30,
          borderRadius: 20,
          marginBottom: 30,
        }}>
        <Text style={{...FONTS.h8, color: COLORS.white}}>
          {companyDetail.company_name}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Image
            source={icons.email}
            style={{height: 20, width: 20, tintColor: COLORS.white}}
          />
          <Text style={{...FONTS.h4, color: COLORS.white, left: 8}}>
            {companyDetail.email}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.call}
            style={{height: 20, width: 20, tintColor: COLORS.white}}
          />
          <Text style={{...FONTS.h4, color: COLORS.white, left: 8}}>
            {companyDetail.mobile}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_50}}>
      {/* {renderCompanyProfile()} */}
      {renderTabLists()}
    </View>
  );
};

export default More;
