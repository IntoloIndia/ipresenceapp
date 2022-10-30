import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile, Account, More} from '../pages/tabScreens';
import {COLORS, icons} from '../constants';
import {TabIcon} from '../reuseableComponents';

const Tab = createBottomTabNavigator();

export default function App() {
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
          height: 70,
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
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.profile} name={'Profile'} />
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
      <Tab.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.more} name={'More'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
