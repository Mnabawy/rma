import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../utils/colors';
import PopUpMenu from '../../../../components/PopUpMenu/PopUpMenu';
import CustomDialog from '../../../../components/Dialog/Dialog';
import {useState} from 'react';
import {t} from 'i18next';

const GreenCard = ({data}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.green,
        backgroundColor: COLORS.lighterGreen,
        borderRadius: 5,
        marginVertical: 10,
      }}>
      <View>
        <Text>
          {t('receiveCode')}: {data?.receipt_code}
        </Text>
        <Text style={{marginVertical: 5}}>
          {t('closeCode')}: {data?.delivery_code}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setVisible(visible => !visible)}>
        <Image
          style={{width: 30, height: 30}}
          source={require('../../../../../assets/info.png')}
        />
      </TouchableOpacity>
      <CustomDialog
        onTouchoutSide={() => setVisible(value => !value)}
        visible={visible}
        onPress={() => setVisible(value => !value)}
      />
    </View>
  );
};

export default GreenCard;

const styles = StyleSheet.create({});
