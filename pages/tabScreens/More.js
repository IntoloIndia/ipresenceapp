import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {FONTS, COLORS, icons} from '../../constants';
import {useSelector} from 'react-redux';

const More = ({navigation}) => {
  const companyDetail = useSelector(state => state.company);

  const tabLists = [
    {id: 1, img: icons.account, name: 'Crete Company Team'},
    {id: 2, img: icons.department, name: 'Company Department'},
    {id: 3, img: icons.designation, name: 'Company Designation'},
    {id: 4, img: icons.device_config, name: 'Device Config'},
  ];
  const [lists, setLists] = React.useState(tabLists);

  function renderTabLists() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() =>
          item.id == 1
            ? navigation.navigate('CompanyTeamRegister')
            : item.id === 2
            ? navigation.navigate('CompanyDepartment')
            : item.id === 3
            ? navigation.navigate('CompanyDesignation')
            : item.id === 4
            ? navigation.navigate('DeviceConfig')
            : null
        }>
        <Text style={{...FONTS.h4, color: COLORS.true_gray_900}}>
          {item.name}
        </Text>
        <Image
          source={item.img}
          style={{height: 25, width: 25, tintColor: COLORS.true_gray_900}}
        />
      </TouchableOpacity>
    );

    const HeaderComponent = () => <View>{renderCompanyProfile()}</View>;
    return (
      <FlatList
        data={lists}
        contentContainerStyle={{
          margin: 25,
        }}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.true_gray_400,
                marginVertical: 15,
              }}></View>
          );
        }}
        // ListHeaderComponent={HeaderComponent}
      />
    );
  }

  function renderCompanyProfile() {
    return (
      <View
        style={{
          backgroundColor: COLORS.green_700,
          padding: 25,
          borderRadius: 10,
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
