import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {t} from 'i18next';

const ChangePasswordSuccess = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 5000);
  }, []);

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <View style={{alignItems: 'center', marginHorizontal: 20}}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>{t('success')}</Text>
        <Text>{t('successBody')}</Text>
      </View>
    </View>
  );
};

export default ChangePasswordSuccess;

const styles = StyleSheet.create({});
