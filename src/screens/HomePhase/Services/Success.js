import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import {COLORS} from '../../../utils';
import Button from '../../../components/buttonColored/Button';

const data = require('./SuccessDummyData.json');

const Success = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('success')}</Text>
      <Text style={styles.body}>{t('successBody')}</Text>
      {data.map(item => (
        <View>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>{t('orderNumber')}</Text>
            <Text style={styles.blueText}>{item.orderNumber}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>{t('deliveryCode')}</Text>
            <Text style={styles.blueText}>{item.deliveryCode}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.text}>{t('receiptCode')}</Text>
            <Text style={styles.blueText}>{item.receiptCode}</Text>
          </View>
        </View>
      ))}
      <View style={styles.btnContainer}>
        <View style={{flex: 0.5}}>
          <Button
            textColor={COLORS.primary}
            backgroundColor={COLORS.white}
            borderColor={COLORS.primary}
            text={t('homePage')}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Button
            textColor={COLORS.white}
            backgroundColor={COLORS.primary}
            borderColor={COLORS.primary}
            text={t('orderDetails')}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 28,
    color: COLORS.black,
    marginTop: '60%',
  },
  body: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.black,
    marginVertical: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    // flex: 1,
    marginVertical: 20,
  },
  blueText: {
    color: COLORS.blue,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
