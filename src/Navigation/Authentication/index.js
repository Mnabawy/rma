import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import ChangePasswordSuccess from '../../screens/ChangePasswordSuccess/ChangePasswordSuccess';
import NewPassword from '../../screens/CreateNewPassword/NewPassword';
import ForgotPassword from '../../screens/ForgotPassword/ForgotPassword';
// import Home from '../screens/Home/Home';
import SignIn from '../../screens/Signin/SignIn';
import VerifyCode from '../../screens/VerifyCode/VerifyCode';
import Welcome from '../../screens/Welcome/Welcome';
import style from '../style';
import AccountType from '../../screens/AccountType/AccountType';
import SupplierAuth from './SupplierAuth';
import UserAuth from './UserAuth';
import {useSelector} from 'react-redux';
import {USER} from '../../redux/actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
// import SupplierAuth from './SupplierStack';

const Stack = createNativeStackNavigator();

export default function Auth() {
  useEffect(() => {}, []);
  const showed = useSelector(state => state.welcome.showed);
  // console.log('showed: ', showed);
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const lang = i18n.language;

  return (
    <Stack.Navigator>
      {/* {!showed && (
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
      )} */}
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false, headerBackVisible: true}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={
          Platform.OS === 'ios'
            ? {
                // headerBackVisible: false,
                // headerBackTitle: '',
                title: '',
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
            : style.headerbackbutton
        }
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCode}
        // options={style.headerbackbutton}
        options={
          Platform.OS === 'ios'
            ? {
                // headerBackVisible: false,
                // headerBackTitle: '',
                title: '',
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
            : style.headerbackbutton
        }
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={
          Platform.OS === 'ios'
            ? {
                // headerBackVisible: false,
                // headerBackTitle: '',
                title: '',
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
            : style.headerbackbutton
        }
      />
      <Stack.Screen
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountType"
        component={AccountType}
        options={style.headerbackbutton}
      />
      <Stack.Screen
        name="UserAtuh"
        component={UserAuth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

{
  /* {userType === USER ? ( */
}
// ) : (
//   <Stack.Screen
//     name="SupplierAuth"
//     component={SupplierAuth}
//     options={{headerShown: false}}
//   />
// )}
