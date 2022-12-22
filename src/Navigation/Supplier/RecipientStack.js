import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceProviderDetails from '../../Supplier/Screens/RecipientCycle/ServiceProviderDetails/ServiceProviderDetails.js';
import FinishWork from '../../Supplier/Screens/RecipientCycle/FinishWork/FinishWork.js';
import Message from '../../Supplier/Screens/RecipientCycle/Message/Message.js';
import { t } from 'i18next';

const Stack = createNativeStackNavigator();
const RecipientStack = () => {
  return (
    <Stack.Navigator initialRouteName="ServiceProvider">
      <Stack.Screen
        name="ServiceProvider"
        component={ServiceProviderDetails}
        options={{headerShadowVisible: false, title: t('technicalSupport')}}
      />
      <Stack.Screen
        name="FinishWork"
        component={FinishWork}
        options={{headerShadowVisible: false, title: ''}}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{headerShadowVisible: false, title: ''}}
      />
    </Stack.Navigator>
  );
};

export default RecipientStack;

const styles = StyleSheet.create({});
