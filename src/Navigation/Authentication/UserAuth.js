import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyCode from '../../screens/VerifyCode/VerifyCode';
import Map from '../../screens/Map/Map';
import CreateAccount from '../../screens/CreateAccount/CreateAccount';
import Home from '../../screens/Home/Home';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../utils/useLanguage';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

const UserAuth = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <Stack.Navigator
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
          : {}
      }
      initialRouteName="CreateAccount">
      <Stack.Screen component={CreateAccount} name="CreateAccount" />
      <Stack.Screen component={VerifyCode} name="VerifyCode" />
      <Stack.Screen component={Map} name="Map" />
    </Stack.Navigator>
  );
};

export default UserAuth;

const styles = StyleSheet.create({});
