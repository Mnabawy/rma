import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import {t} from 'i18next';
import AccountTypeCard from '../../components/AccountType/AccountType';
import CustomButton from '../../components/button/Button';
import TouchableText from '../../components/TouchableText/TouchableText';

import AppText from '../../components/text/Text';
import {useDispatch, useSelector} from 'react-redux';
import * as AuthActions from '../../redux/actions/auth';
import {SUPPLIER, USER} from '../../redux/actions/types';

const AccountType = ({navigation}) => {
  console.log('we are here');
  const dispatch = useDispatch();
  const AccountTypeIsLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const AccountType = useSelector(state => state.auth.userType);
  console.log('userType', AccountType);

  const userTypeState = useSelector(state => state.auth.userType);
  console.log('userTypeState', userTypeState);

  const [userType, setUserType] = useState({
    user: false,
    supplier: false,
  });

  const userTypeHandler = () => {
    setUserType({user: value => !value});
    dispatch(AuthActions.userType(USER));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View style={{marginBottom: 10}}>
        <AppText
          style={{
            fontSize: 22,
            marginVertical: 10,
            textAlign: 'center',
            marginHorizontal: '20%',
            color: COLORS.black,
          }}>
          {t('welcomeToApp')}
        </AppText>
        <AppText style={{textAlign: 'center', marginHorizontal: 10}}>
          {t('chooseAccountType')}
        </AppText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 50,
        }}>
        <Pressable onPress={() => setUserActive(value => !value)}>
          <AccountTypeCard
            source={
              userType['supplier']
                ? require('../../../assets/userType.png')
                : require('../../../assets/userTypeActive.png')
            }
            type="user"
            onPress={userTypeHandler}
            title={t('user')}
            selected={userType['user']}
          />
        </Pressable>
        <Pressable onPress={() => setUserType({supplier: value => !value})}>
          <AccountTypeCard
            source={
              userType['supplier']
                ? require('../../../assets/toolActive.png')
                : require('../../../assets/tool.png')
            }
            type="supplier"
            onPress={() => {
              setUserType({supplier: value => !value});
              dispatch(AuthActions.userType(SUPPLIER));
            }}
            title={t('supplier')}
            selected={userType['supplier']}
          />
        </Pressable>
      </View>
      <CustomButton
        text={t('next')}
        onPress={() => {
          userTypeState === SUPPLIER
            ? // ? console.log('spplierrrrr')
              navigation.navigate('SupplierAuth', {
                screen: 'CreateAccountSupplier',
              })
            : // console.log('userrrrrr');
              navigation.navigate('UserAtuh', {
                screen: 'CreateAccount',
              });
        }}
      />
      <View style={{alignItems: 'center', marginTop: 20}}>
        <AppText style={{color: COLORS.black}}>
          {t('alreadyHaveAccount')}
        </AppText>
        <TouchableText
          text={t('signIn')}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
      </View>
    </View>
  );
};

export default AccountType;
