import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Account} from '../pages/employeeTabScreens';
import {COLORS, icons} from '../constants';
import {TabIcon} from '../reuseableComponents';

const Tab = createBottomTabNavigator();

export default function EmployeeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          height: 100,
          // paddingHorizontal:5
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} name={'Home'} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.account} name={'Account'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
