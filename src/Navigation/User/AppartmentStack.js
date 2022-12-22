import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Appartment from '../../AppartmentCycle/screens/Appartment';
import AppartmentServiceDetails from '../../AppartmentCycle/AppartmentServiceDetails';
import RateUser from '../../AppartmentCycle/screens/RateUser';
import Notifications from '../../Supplier/Screens/Notifications/Notifications';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

const AppartmentStack = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <Stack.Navigator
      initialRouteName="Appartment"
      screenOptions={
        Platform.OS === 'ios'
          ? {
              headerBackVisible: false,
              headerShadowVisible: false,
              title: '',
              headerLeft: () => (
                <Icon
                  style={{fontSize: 22}}
                  name={lang === 'en' ? 'arrowleft' : 'arrowright'}
                  onPress={() => navigation.goBack()}
                />
              ),
            }
          : {headerShadowVisible: false}
      }>
      <Stack.Screen
        name="Appartment"
        options={{headerShown: false}}
        component={Appartment}
      />
      <Stack.Screen
        options={{title: 'test'}}
        name="ServiceDetails"
        component={AppartmentServiceDetails}
      />
      <Stack.Screen
        options={{title: ''}}
        name="RateUser"
        component={RateUser}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default AppartmentStack;
