import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceProviderDetails from '../../Supplier/Screens/FinishedCycle/ServiceProviderDetails/ServiceProviderDetails.js';
import UserEvaluation from '../../Supplier/Screens/FinishedCycle/UserEvaluation/UserEvaluation.js';
import UserReviews from '../../Supplier/Screens/FinishedCycle/UserReviews/UserReviews.js';
import { t } from 'i18next';

const Stack = createNativeStackNavigator();
const FinishedStack = () => {
  return (
    <Stack.Navigator initialRouteName="ServiceProvider">
      <Stack.Screen
        name="ServiceProvider"
        component={ServiceProviderDetails}
        options={{headerShadowVisible: false, title: t('technicalSupport')}}
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

export default FinishedStack;

const styles = StyleSheet.create({});
