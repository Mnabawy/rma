import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAccount from '../../Supplier/Screens/CreateAccount/CreateAccount';
import VerifyCode from '../../Supplier/Screens/VerifyCode/VerifyCode';
import DefineServices from '../../Supplier/Screens/DefineServices/DefineServices';
import Map from '../../Supplier/Screens/Map/Map';
import Success from '../../Supplier/Screens/Success/Success';
import SupplierHome from '../../Supplier/Screens/Home/SupplierHome';
import ApplyOrder from '../../Supplier/Screens/ApplyOrder/ApplyOrder';
import ServiceProviderDetails from '../../Supplier/Screens/ServiceProviderDetails/ServiceProviderDetails';
import StartDate from '../../Supplier/Screens/StartDate/StartDate';
import SelectRedirectRequest from '../../Supplier/Screens/SelectRedirectRequest/RedirectRequest';
import SelectServiceProvider from '../../Supplier/Screens/SelectServiceProvider/SelectServiceProvider';

const Stack = createNativeStackNavigator();

const SupplierAuth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="CreateAccountSupplier"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyCodeSupplier"
        component={VerifyCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DefineServicesSupplier"
        component={DefineServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MapSupplier"
        component={Map}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessSupplier"
        component={Success}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SupplierAuth;

{
  // we need them in another file
  /* <Stack.Screen
  name="ProviderDetails"
  component={ServiceProviderDetails}
  options={{headerShadowVisible: false}}
/>
<Stack.Screen
  name="ApplyOrder"
  component={ApplyOrder}
  options={{headerShadowVisible: false, title: ''}}
/>
<Stack.Screen
  name="StartDate"
  component={StartDate}
  options={{headerShadowVisible: false, title: ''}}
/>
<Stack.Screen
  name="SelectRedirectRequest"
  component={SelectRedirectRequest}
  options={{headerShadowVisible: false, title: ''}}
/>
<Stack.Screen
  name="SelectServiceProvider"
  component={SelectServiceProvider}
  options={{headerShadowVisible: false, title: ''}}
/> */
}
