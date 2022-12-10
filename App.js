import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {CompanyTabs, EmployeeTabs} from './navigation';
import {
  ForgotPassword,
  Payment,
  SignIn,
  SignUp,
  VerifyProductKey,
} from './pages/userCredentials';
import {
  DeviceConfig,
  AddEmployee,
  Department,
  Designation,
  EmployeeDetails,
  CompanyTiming,
} from './pages/companyScreens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="VerifyProductKey" component={VerifyProductKey} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="CompanyTabs" component={CompanyTabs} />
          <Stack.Screen name="EmployeeTabs" component={EmployeeTabs} />
          <Stack.Screen name="Department" component={Department} />
          <Stack.Screen name="AddEmployee" component={AddEmployee} />
          <Stack.Screen name="Designation" component={Designation} />
          <Stack.Screen name="DeviceConfig" component={DeviceConfig} />
          <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
          <Stack.Screen name="CompanyTiming" component={CompanyTiming} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
