import {t} from 'i18next';
import React from 'react';
import {Image, View} from 'react-native';
import Modal from 'react-native-modals';
import {COLORS} from '../../utils';
import Button from '../buttonColored/Button';
import Text from '../text/Text';

const RedirectPopup = ({visible, onTouchOutside, onPress}) => {
  return (
    <View
      style={
        {
          // flex: 1,
          // paddingVertical: '20%',
        }
      }>
      <Modal
        coverScreen={true}
        visible={visible}
        onTouchOutside={onTouchOutside}
        modalStyle={{
          marginTop: '20%',
          height: '60%',
          // width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            paddingHorizontal: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../../../assets/login.png')} />
        </View>
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            // marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: COLORS.black,
              marginBottom: 10,
            }}>
            {t('loginAccount')}
          </Text>
          <Text style={{fontSize: 18}}>{t('pleaseLogInToContinue')}</Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 77,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.5}}>
            <Button
              onPress={onTouchOutside}
              backgroundColor={COLORS.white}
              textColor={COLORS.red}
              borderColor={COLORS.white}
              text={t('cancel')}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Button
              onPress={onPress}
              styles={{paddingHorizontal: 0, paddingVertical: 10}}
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              borderColor={COLORS.primary}
              text={t('loginAccount')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
{
  /* // </View> */
}

export default RedirectPopup;
