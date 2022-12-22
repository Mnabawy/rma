/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {t} from 'i18next';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DrawerItem from './DrawerItem';
import {useDispatch, useSelector} from 'react-redux';
import * as AuthActions from '../redux/actions/auth';
import TouchableText from '../components/TouchableText/TouchableText';
import {COLORS} from '../utils';
import AppText from '../components/text/Text';
import Dialog, {DialogContent, DialogTitle} from 'react-native-popup-dialog';
import CustomButton from '../components/buttonColored/Button';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNCUSERDATA, SUPPLIER, USER} from '../redux/actions/types';
import RNRestart from 'react-native-restart';
import {useEffect} from 'react';
import Share from 'react-native-share';
import {shareOptions} from '../App';
import axios from 'axios';
import {BASE_URL} from '../utils/config';
import {useLanguage} from '../utils/useLanguage';
import {useTranslation} from 'react-i18next';

const UserCard = ({source, userType, onPress, logged, role}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image style={{width: 40, height: 40}} source={source} />
        <View style={{marginHorizontal: 10}}>
          <AppText>{userType}</AppText>
        </View>
      </View>
      <View>
        {!logged ? (
          <CustomButton
            textColor={COLORS.primary}
            onPress={onPress}
            borderColor={COLORS.primary}
            styles={{
              paddingHorizontal: 25,
              paddingVertical: 5,
              margin: 0,
              marginHorizontal: 0,
            }}
            text={t('loginAccount')}
          />
        ) : (
          <AppText style={{marginHorizontal: 10}}>{t('loggedIn')}</AppText>
        )}
      </View>
    </View>
  );
};

function CustomDrawerContent(props) {
  const {selectedLanguage} = useLanguage();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.token);
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const user = useSelector(state => state.auth.userData);
  const userType = useSelector(state => state.auth.userType);
  // console.log('user type', userType);

  // console.log('user', user);

  // console.log('token from custom drawer content', token);

  const [visible, setVisible] = useState(false);

  const [UserType, setUserType] = useState({
    user: false,
    supplier: false,
  });

  const logoutHandler = async () => {
    await AsyncStorage.removeItem(ASYNCUSERDATA);
    await dispatch(AuthActions.logout());
  };
  const deleteAccountHandler = async () => {
    try {
      axios({
        url: `${BASE_URL}/auth/user`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
          locale: selectedLanguage,
        },
      }).then(res => {
        if (res.data.success) {
          AsyncStorage.removeItem(ASYNCUSERDATA);
          dispatch(AuthActions.logout());
          console.log('deleted');
        } else {
          console.log(res.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Profile Icon */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          width: '100%',
          height: '30%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View></View>
        {isLoggedIn && (
          <View>
            <Image
              style={{margin: 20, width: 90, height: 90, borderRadius: 50}}
              source={{uri: user?.picture}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {!token ? (
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: 'center',
                    alignItems: 'center',
                    color: COLORS.white,
                    paddingBottom: 300,
                  }}>
                  {t('WelcomeToOurServices')}
                </Text>
              ) : (
                <>
                  <View style={{alignItems: 'flex-start'}}>
                    <AppText style={{fontSize: 18, color: COLORS.white}}>
                      {user?.name} {user?.last_name}
                    </AppText>

                    <TouchableText
                      textstyle={{color: COLORS.white}}
                      text={t('viewProfile')}
                      onPress={() =>
                        props.navigation.navigate('DrawerStaticStack', {
                          screen: 'Profile',
                        })
                      }
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setVisible(value => !value)}>
                      <Image
                        style={styles.personIcon}
                        source={require('../../assets/switchAccount.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        )}
      </View>
      {/* <View></View> */}
      {/* content */}

      <View
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: COLORS.blue,
          margin: 10,
          flexDirection: 'row',
          // backgroundColor: COLORS.blue,
          padding: 10,
          borderRadius: 8,
        }}>
        <Image
          style={styles.icon}
          source={require('../../assets/facilityIcon.png')}
        />
        <AppText style={{color: COLORS.black, marginLeft: 10}}>
          {t('facilityText')}
        </AppText>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <DrawerItem
          onPress={() =>
            // () => console.log(navigation.getState().routeNames)
            props.navigation.navigate('DrawerStaticStack', {
              screen: 'PrivacyTerms',
            })
          }
          title={t('privacyTerms')}
          icon={
            <Image
              style={styles.icon}
              source={require('../../assets/privacyIcon.png')}
            />
          }
        />
        <DrawerItem
          onPress={() =>
            props.navigation.navigate('DrawerStaticStack', {
              screen: 'AboutUs',
            })
          }
          title={t('aboutUs')}
          icon={
            <Image
              style={styles.icon}
              source={require('../../assets/aboutIcon.png')}
            />
          }
        />
        <DrawerItem
          onPress={() =>
            props.navigation.navigate('DrawerStaticStack', {
              screen: 'CallUs',
            })
          }
          title={t('callUs')}
          icon={
            <Image
              style={styles.icon}
              source={require('../../assets/callUsIcon.png')}
            />
          }
        />
        <DrawerItem
          onPress={() => Share.open(shareOptions)}
          title={t('shareApp')}
          icon={
            <Image
              style={styles.icon}
              source={require('../../assets/shareAppIcon.png')}
            />
          }
        />
        <DrawerItem
          onPress={() =>
            props.navigation.navigate('DrawerStaticStack', {
              screen: 'Language',
              params: {
                local: selectedLanguage,
              },
            })
          }
          title={t('language')}
          icon={
            <Image
              style={styles.icon}
              source={require('../../assets/languageIcon.png')}
            />
          }
        />
        {token ? (
          <>
            <DrawerItem
              onPress={logoutHandler}
              title={t('logOut')}
              icon={
                <Image
                  style={styles.icon}
                  source={require('../../assets/logoutIcon.png')}
                />
              }
            />
            {Platform.OS === 'ios' && (
              <DrawerItem
                onPress={deleteAccountHandler}
                title={t('deleteAccount')}
                icon={
                  <Image
                    style={styles.icon}
                    source={require('../../assets/delete.png')}
                  />
                }
              />
            )}
          </>
        ) : (
          <DrawerItem
            onPress={() => dispatch(AuthActions.logout())}
            title={t('login')}
            icon={
              <Image
                style={styles.icon}
                source={require('../../assets/loginIcon.png')}
              />
            }
          />
        )}
      </View>
      <DrawerContentScrollView {...props}></DrawerContentScrollView>
      {/* logout button */}

      <Dialog
        width={Dimensions.get('screen').width}
        dialogStyle={{bottom: 0, position: 'absolute'}}
        visible={visible}
        onTouchOutside={() => setVisible(false)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.grayBg,
            padding: 10,
            paddingVertical: 15,
          }}>
          <TouchableOpacity onPress={() => setVisible(value => !value)}>
            <Image
              style={styles.icon}
              source={require('../../assets/close.png')}
            />
          </TouchableOpacity>
          <AppText style={{marginHorizontal: 10}}>{t('switchAccount')}</AppText>
        </View>
        <DialogContent style={{width: '100%'}}>
          <UserCard
            role={userType}
            onPress={() => {
              // setUserType({user: value => !value});
              dispatch(AuthActions.userType(USER));
              setVisible(false);
              navigation.dispatch(DrawerActions.toggleDrawer());
              // RNRestart.Restart();
            }}
            // logged={user?.roles?.includes('member')}
            logged={userType === USER}
            userType={lang === 'en' ? 'user' : 'عميل'}
            source={require('../../assets/user.png')}
          />

          <UserCard
            role={userType}
            onPress={() => {
              // setUserType({supplier: value => !value});
              dispatch(AuthActions.userType(SUPPLIER));
              // RNRestart.Restart();
              setVisible(false);
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            logged={userType === SUPPLIER}
            userType={lang === 'en' ? 'supplier' : 'مورد'}
            source={require('../../assets/supplier.png')}
          />
        </DialogContent>
      </Dialog>
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  personIcon: {
    width: 35,
    height: 35,
  },
});
