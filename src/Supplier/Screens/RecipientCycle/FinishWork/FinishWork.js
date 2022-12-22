import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../../utils';
import AppText from '../../../../components/text/Text';
import {t} from 'i18next';
import Input from '../../../../components/input/input';
import Button from '../../../../components/buttonColored/Button';
import TouchableText from '../../../../components/TouchableText/TouchableText';

import data from './DummyData.json';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import CustomCheckBox from '../../../../components/checkBox/CheckBox';
import TextArea from '../../../../components/TextArea/TextArea';

const FinishWork = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [code, setCode] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingTop: 50,
      }}>
      <AppText style={{fontSize: 18, marginBottom: 15, color: COLORS.black}}>
        {t('enterReceipt')}
      </AppText>
      <AppText style={{fontSize: 16, marginBottom: 15, color: COLORS.black}}>
        {t('receiveCodeBody')}
      </AppText>
      <AppText style={{fontSize: 16, marginBottom: 15, color: COLORS.black}}>
        {t('requestCode')}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          top: -10,
        }}>
        <TouchableText text={t('message')} />
        <AppText
          style={{
            fontSize: 16,
            marginHorizontal: 5,
            color: COLORS.black,
          }}>
          or
        </AppText>
        <TouchableText text={t('phone')} />
      </View>

      <View>
        <Input
          label={t('deliveryCodeLabel')}
          placeholder={t('enterDeliveryCode')}
          value={code}
          onChangeText={value => setCode(value)}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          height: 77,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <View style={{flex: 0.4}}>
          <Button
            onPress={() => setVisible(true)}
            styles={{paddingHorizontal: 0, paddingVertical: 8}}
            backgroundColor={COLORS.white}
            textColor={COLORS.red}
            borderColor={COLORS.red}
            text={t('cancel')}
          />
        </View>
        <View style={{flex: 0.6}}>
          <Button
            onPress={() => navigation.navigate('Message')}
            styles={{
              paddingVertical: 8,
              paddingHorizontal: 0,
            }}
            backgroundColor={COLORS.primary}
            textColor={COLORS.white}
            borderColor={COLORS.primary}
            text={t('doneFinishWork')}
          />
        </View>
      </View>

      <Dialog
        width={'95%'}
        height={'80%'}
        visible={visible}
        onTouchOutside={() => setVisible(value => !value)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.grayBg,
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <TouchableOpacity onPress={() => setVisible(value => !value)}>
            <Image source={require('../../../../../assets/close.png')} />
          </TouchableOpacity>
          <AppText
            style={{marginHorizontal: 10, fontSize: 16, color: COLORS.black}}>
            {t('rejectOrder')}
          </AppText>
        </View>
        <DialogContent style={{width: '100%', flex: 1, paddingHorizontal: 10}}>
          {/* <ScrollView> */}
          <View style={{flex: 1}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator
              data={data}
              renderItem={({item}) => (
                <View
                  key={item.id}
                  style={{paddingVertical: 5, marginHorizontal: 0}}>
                  <View
                    style={{
                      marginBottom: 10,
                    }}></View>
                  {item.items.map(item => (
                    <View
                      key={item.id}
                      style={{
                        justifyContent: 'center',
                      }}>
                      <CustomCheckBox
                        textStyle={{fontSize: 16, color: COLORS.black}}
                        containerStyle={{marginVertical: 5}}
                        text={item.title}
                      />
                    </View>
                  ))}
                </View>
              )}
            />
          </View>
          <View style={{flex: 1}}>
            <AppText style={{fontSize: 16, color: COLORS.black}}>
              {t('reasonForReject')}
            </AppText>
            <TextArea
              value={reason}
              onChangeText={text => setReason(text)}
              placeholder={t('writeHere')}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              height: 50,
            }}>
            <View style={{}}>
              <Button
                onPress={() => setVisible(false)}
                styles={{paddingHorizontal: 30, paddingVertical: 5}}
                text={t('cancel')}
                backgroundColor={COLORS.white}
                textColor={COLORS.red}
                borderColor={COLORS.white}
              />
            </View>
            <View style={{}}>
              <Button
                styles={{paddingHorizontal: 30, paddingVertical: 5}}
                text={t('send')}
                backgroundColor={COLORS.primary}
                textColor={COLORS.white}
                borderColor={COLORS.primary}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default FinishWork;

const styles = StyleSheet.create({});
