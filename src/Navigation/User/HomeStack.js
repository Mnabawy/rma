import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from '../../screens/HomePhase/Services/Categories';
// new stepper  ;)
import ServiceDetails from '../../OrderCycle/OrderScreens/ServiceDetails2';
import BookService from '../../OrderCycle/OrderScreens/BookService2';
import Additions from '../../OrderCycle/OrderScreens/Additions2';
import TermsConditions from '../../OrderCycle/OrderScreens/TermsConditions2';
import style from '../style.js';
import {Platform, StyleSheet, Text} from 'react-native';
import Success from '../../OrderCycle/OrderScreens/Success';
import PopUpMenu from '../../components/PopUpMenu/PopUpMenu';
import Home from '../../screens/Home/Home';
import Map from '../../screens/Map/Map';
import Notifications from '../../Supplier/Screens/Notifications/Notifications';
import {t} from 'i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

const deafultHeaderStyle = StyleSheet.create({
  headerbackbutton: {
    headerBackVisible: true,
    headerBackTitleVisible: false,
    borderBottomColor: 'white',
    headerShadowVisible: false,
  },
});

function HomeStack() {
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const lang = i18n.language;

  return (
    <Stack.Navigator
      screenOptions={{headerShadowVisible: false}}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
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
        }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{headerShown: false}}
      />
      {/* // {headerbackbutton: deafultHeaderStyle.headerbackbutton}, */}
      <Stack.Screen
        name="BookService"
        component={BookService}
        options={
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
            : {title: ''}
        }
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={
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
            : {}
        }
      />
      <Stack.Screen
        name="Additions"
        component={Additions}
        options={{title: t('additions')}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsConditions}
        options={{title: t('privacyTerms')}}
      />
      <Stack.Screen
        name="HomeSuccess"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{title: t('notification')}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
