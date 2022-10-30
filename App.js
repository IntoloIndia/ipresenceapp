import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  ForgotPassword,
  Payment,
  SignIn,
  SignUp,
  VerifyProductKey,
} from './pages/userCredentials';
import Tabs from './navigation/Tabs';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {
  CompanyTeamRegister,
  CompanyDepartment,
  CompanyDesignation,
  DeviceConfig,
} from './pages';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DeviceConfig"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="VerifyProductKey" component={VerifyProductKey} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen
            name="CompanyDepartment"
            component={CompanyDepartment}
          />
          <Stack.Screen
            name="CompanyTeamRegister"
            component={CompanyTeamRegister}
          />
          <Stack.Screen
            name="CompanyDesignation"
            component={CompanyDesignation}
          />
          <Stack.Screen name="DeviceConfig" component={DeviceConfig} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
