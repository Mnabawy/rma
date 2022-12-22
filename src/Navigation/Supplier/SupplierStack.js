import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SupplierHome from '../../Supplier/Screens/Home/SupplierHome';
import ApplyOrder from '../../Supplier/Screens/ApplyOrder/ApplyOrder';
import StartDate from '../../Supplier/Screens/StartDate/StartDate';
import SelectRedirectRequest from '../../Supplier/Screens/SelectRedirectRequest/RedirectRequest';
import SelectServiceProvider from '../../Supplier/Screens/SelectServiceProvider/SelectServiceProvider';
import Success from '../../Supplier/Screens/Success/Success';
import SuccessRequestSent from '../../Supplier/Screens/SuccessServiceSelected/SuccessServiceSelected';
import ServiceProviderDetails from '../../Supplier/Screens/ServiceProviderDetails/ServiceProviderDetails';
import Notifications from '../../Supplier/Screens/Notifications/Notifications';
import RecipientStack from './RecipientStack';
import FinishedStack from './FinishedStack';
import {t} from 'i18next';
import Search from '../../Supplier/Screens/Search/Search';
import UserEvaluation from '../../Supplier/Screens/FinishedCycle/UserEvaluation/UserEvaluation';
import UserReviews from '../../Supplier/Screens/FinishedCycle/UserReviews/UserReviews';
import DeliveryCode from '../../Supplier/Screens/DeliveryCode/DeliveryCode';
import SuccessDeliveryCode from '../../Supplier/Screens/SuccessDeliveryCode/SuccessDeliveryCode';

const Stack = createNativeStackNavigator();
const SupplierStack = () => {
  return (
    <Stack.Navigator initialRouteName="SuppllierHome">
      <Stack.Screen
        name="SuppllierHome"
        component={SupplierHome}
        options={{headerShown: false}}
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
        name="DeliveryCode"
        component={DeliveryCode}
        options={{headerShadowVisible: false, title: ''}}
      />
      <Stack.Screen
        name="SuccessDeliveryCode"
        component={SuccessDeliveryCode}
        options={{headerShadowVisible: false, title: ''}}
      />
      <Stack.Screen
        name="SelectRedirectRequest"
        component={SelectRedirectRequest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectServiceProvider"
        component={SelectServiceProvider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceProvider"
        component={ServiceProviderDetails}
        options={{title: ''}}
      />

      <Stack.Screen
        name="SupplierSuccess"
        component={Success}
        options={{headerShadowVisible: false, title: ''}}
      />
      <Stack.Screen
        name="SuccessRequestSent"
        component={SuccessRequestSent}
        options={{headerShadowVisible: false, title: ''}}
      />
      <Stack.Screen
        name="SupplierNotifications"
        component={Notifications}
        options={{headerShadowVisible: false, title: t('notification')}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recipient"
        component={RecipientStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserEvaluation"
        component={UserEvaluation}
        options={{headerShadowVisible: false, title: ''}}
      />
      <Stack.Screen
        name="UserReviews"
        component={UserReviews}
        options={{headerShadowVisible: false, title: ''}}
      />
    </Stack.Navigator>
  );
};

export default SupplierStack;

const styles = StyleSheet.create({});
