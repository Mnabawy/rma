import {t} from 'i18next';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import Button from '../../../components/button/Button';
import CustomCheckBox from '../../../components/checkBox/CheckBox';
import RoundedCheckkBox from '../../../components/checkBoxRounded/CheckBox';
import {SearchInput} from '../../../components/searchInput/SearchInput';
import Select from '../../../components/Select/Select';
import AppText from '../../../components/text/Text';
import UploadFile from '../../../components/UploadFile/UploadFile';
import {COLORS} from '../../../utils';
import data from './DummyData.json';
import ServiceCard from './ServiceCard';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import CustomButton from '../../../components/buttonColored/Button';
import {Dimensions} from 'react-native';
import { StatusBar } from 'react-native';
import CustomProgress from '../../../components/Progress/Progress';
import ScreenWrpper from '../../../components/ScreenWrpper/ScreenWrpper';
import HeaderArrowBack from '../../../components/HeaderArrowBack/HeaderArrowBack';

const width = Dimensions.get('screen').width;

const DefineServices = ({navigation}) => {
  const [serviceType, setServiceType] = useState({
    public: false,
    special: false,
  });
  const [visible, setVisible] = useState(false);
  const [service, setService] = useState('');
  // for dile upload
  const [resultFile, setResultFile] = React.useState([]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  return (
    <ScreenWrpper style={{flex:1, backgroundColor:COLORS.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <CustomProgress
        borderWidth={0}
        progress={0.75}
        color={COLORS.primary}
        width={width}
      />
      <HeaderArrowBack />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingTop: 30,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.black,
            textAlign: 'center',
          }}></Text>
        <AppText
          style={{
            fontSize: 20,
            color: COLORS.black,
            textAlign: 'center',
          }}>
          {t('defineServices')}
        </AppText>
        <AppText
          style={{
            fontSize: 14,
            marginHorizontal: 10,
          }}>
          {t('defineServicesBody')}
        </AppText>

        <AppText style={{marginTop: 40, fontSize: 14, marginBottom: 10}}>
          {t('serviceType')}
        </AppText>

        <View
          style={{
            flexDirection: 'row',
            // flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.48}}>
            <ServiceCard
              selected={serviceType['public']}
              onPress={() => setServiceType({public: value => !value})}
              text={t('publicServices')}
            />
          </View>
          <View style={{flex: 0.48}}>
            <ServiceCard
              selected={serviceType['special']}
              onPress={() => setServiceType({special: value => !value})}
              text={t('specialServices')}
            />
          </View>
        </View>
        <Select
          style={{marginTop: 30}}
          onPress={() => setVisible(value => !value)}
          label={t('service')}
          placeholder={t('selectService')}
        />
        <UploadFile
          style={{marginTop: 30}}
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
              });
              setResultFile([pickerResult]);
              console.log(resultFile);
            } catch (e) {
              handleError(e);
            }
          }}
          placeholder={t('uploadPdf')}
          label={t('license')}
        />

        <Button
          style={{marginHorizontal: 0, marginVertical: 30}}
          onPress={() => navigation.navigate('MapSupplier')}
          text={t('next')}
        />

        <Dialog
          width={'95%'}
          height={'80%'}
          // dialogStyle={{bottom: 0, position: 'absolute'}}
          visible={visible}
          onTouchOutside={() => setVisible(value => !value)}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.grayBg,
              padding: 10,
              paddingVertical: 15,
            }}>
            <TouchableOpacity onPress={() => setVisible(value => !value)}>
              <Image source={require('../../../../assets/close.png')} />
            </TouchableOpacity>
            <AppText style={{marginHorizontal: 10}}>
              {t('selectService')}
            </AppText>
          </View>
          <DialogContent
            style={{width: '100%', flex: 1, paddingHorizontal: 10}}>
            <SearchInput
              style={{marginTop: 20}}
              styles={{marginHorizontal: 0, marginTop: 40}}
              onPress={() => {}}
            />
            {/* <ScrollView> */}
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator
              data={data}
              renderItem={({item}) => (
                <View
                  key={item.id}
                  style={{paddingVertical: 20, marginHorizontal: 5}}>
                  <View
                    style={{
                      marginBottom: 10,
                    }}>
                    <RoundedCheckkBox
                      boxType="circle"
                      text={item.title}
                      textStyle={{fontSize: 16, color: COLORS.black}}
                      containerStyle={{marginVertical: 0}}
                    />
                  </View>
                  {item.items.map(item => (
                    <View
                      key={item.id}
                      style={{
                        marginHorizontal: 30,
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
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                height: 50,
              }}>
              <View style={{}}>
                <CustomButton
                  text={t('cancel')}
                  backgroundColor={COLORS.white}
                  textColor={COLORS.red}
                  borderColor={COLORS.white}
                />
              </View>
              <View style={{}}>
                <CustomButton
                  styles={{paddingHorizontal: 30, paddingVertical: 10}}
                  text={t('done')}
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
    </ScreenWrpper>
  );
};

export default DefineServices;

const styles = StyleSheet.create({});
