import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {t} from 'i18next';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {useSelector} from 'react-redux';
import Button from '../../../components/buttonColored/Button';
import {COLORS, normalize} from '../../../utils';
import {BASE_URL} from '../../../utils/config';

const CancelDialog = ({
  visible,
  onPress,
  onTouchOutside,
  orderId,
  onRequestSuccess,
  onCancelSuccess,
}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [visibleState, setVisibleState] = useState(false);
  const token = useSelector(state => state.auth.token);

  const cancelOrderHandler = async () => {
    // console.log('orderId', orderId);
    // console.log(token);
    try {
      await axios({
        url: `${BASE_URL}/order/${orderId}/cancel`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          locale: 'en',
        },
        body: {
          status: 'cancel',
          cancel_reason: value,
        },
      }).then(res => {
        if (res.data.success) {
          setVisibleState(true);
          console.log('canceled successfully');
          navigation.goBack();
          // onRequestSuccess(true);
        } else {
          console.log('cancel failed', res.data);
        }
      });
    } catch (err) {
      console.log('cancel order err: ', err);
    }
  };

  const {i18n} = useTranslation();
  const lang = i18n.language;

  return (
    <Dialog
      visible={visibleState ? false : visible}
      onTouchOutside={onTouchOutside}>
      <View style={{padding: 0, width: normalize(350)}}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.garay,
            width: '100%',
            padding: 10,
            direction: lang === 'en' ? 'ltr' : 'rtl',
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../../../assets/close.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: COLORS.black,
            }}>
            {/* Delviry Code */}
            {t('cancelService')}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            padding: 15,
          }}>
          <Text
            style={{
              textAlign: lang == 'ar' ? 'left' : 'right',
              // textAlign:"left",
              color: COLORS.black,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
            }}>
            {t('reasonForCancellation')}
          </Text>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            multiline={true}
            numberOfLines={4}
            style={[
              styles.input,
              {textAlign: lang === 'en' ? 'left' : 'right'},
            ]}
            minHeight={70}
            placeholder={t('writeHere')}
          />

          <View
            style={{
              backgroundColor: COLORS.white,
              height: 77,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Button
                styles={{paddingHorizontal: 0}}
                onPress={onPress}
                backgroundColor={COLORS.white}
                textColor={COLORS.red}
                borderColor={COLORS.white}
                text={t('cancel')}
              />
            </View>
            <View style={{}}>
              <Button
                onPress={cancelOrderHandler}
                styles={{
                  paddingHorizontal: 35,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  marginHorizontal: 0,
                }}
                backgroundColor={COLORS.primary}
                textColor={COLORS.white}
                borderColor={COLORS.primary}
                text={t('send')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Dialog>
  );
};

export default CancelDialog;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.lightGray,
    textAlignVertical: 'top',
    borderRadius: 10,
    borderColor: COLORS.garay,
    borderWidth: 1,
    padding: 8,
  },
});
