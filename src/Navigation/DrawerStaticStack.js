import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {t} from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AboutUs from '../screens/Drawer/AboutUs/AboutUs';
import CallUs from '../screens/Drawer/CallUs/CallUs';
import EditProfile from '../screens/Drawer/EditProfile/EditProfile';
import Languege from '../screens/Drawer/Language/Languege';
import Profile from '../screens/Drawer/Profile/Profile';
import ShareApp from '../screens/Drawer/ShareApp/ShareApp';
import TermsConditions from '../screens/Drawer/TermsConditions/TermsConditions';
import Natifications from '../screens/Natifications/Natifications';
import {COLORS} from '../utils';
import {useLanguage} from '../utils/useLanguage';

const Stack = createNativeStackNavigator();

const DrawerStaticStack = ({navigation}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const {selectedLanguage, onChageLanguage} = useLanguage();
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
      }>
      <Stack.Screen
        name="PrivacyTerms"
        component={TermsConditions}
        options={{title: t('privacyTerms')}}
      />
      <Stack.Screen name="AboutUs" component={AboutUs} options={{title: ''}} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: '', headerStyle: {backgroundColor: COLORS.grayBg}}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: t('editProfile'),
          // headerStyle: {backgroundColor: COLORS.grayBg},
        }}
      />
      <Stack.Screen
        name="CallUs"
        component={CallUs}
        options={{
          title: '',
          headerStyle: {backgroundColor: COLORS.darkGold},
          headerLeft: () =>
            selectedLanguage === 'en' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/backarrow.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/backarrowrtl.png')}
                />
              </TouchableOpacity>
            ),
        }}
      />
      <Stack.Screen
        name="Language"
        options={{title: t('language')}}
        component={Languege}
      />
      <Stack.Screen name="ShareApp" component={ShareApp} />
    </Stack.Navigator>
  );
};

export default DrawerStaticStack;

const styles = StyleSheet.create({});
