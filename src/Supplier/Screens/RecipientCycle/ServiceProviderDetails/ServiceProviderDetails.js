import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
// import ServiceDetailsCard from './screens/components/ServiceDetails/ServiceDetailsCard';
import ServiceDetailsCard from '../../../../AppartmentCycle/screens/components/ServiceDetails/ServiceDetailsCard';
// import {COLORS} from '../utils/colors';
import GreenCard from '../../../../AppartmentCycle/screens/components/ServiceDetails/GreenCard';
import {t} from 'i18next';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../../../components/buttonColored/Button';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import CancelDialog from '../../../../AppartmentCycle/screens/components/CancelDialog';
import {COLORS} from '../../../../utils';

const imagesData = [
  {id: '2121', uri: require('../../../../../assets/square.png')},
  {id: '123412', uri: require('../../../../../assets/square.png')},
  {id: '2324', uri: require('../../../../../assets/square.png')},
  {id: '355', uri: require('../../../../../assets/square.png')},
  {id: '466', uri: require('../../../../../assets/square3.png')},
];
const additionsData = [
  {id: '2121', text: 'additions 1'},
  {id: '123412', text: 'additions 2'},
  {id: '2324', text: 'additions 3'},
  {id: '355', text: 'additions 4'},
  {id: '466', text: 'additions 5'},
];

const ServiceProviderDetails = ({navigation}) => {
  console.log('from Recipient');

  const route = useRoute();
  // const from = route.params.from;
  const [routeName, setRouteName] = useState('');
  const [cancelVisible, setCancelVisible] = useState(false);

  // useEffect(() => {
  //   if (from) {
  //     setRouteName(from);
  //   } else {
  //     setRouteName('');
  //   }
  // }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{paddingHorizontal: 10}}>
          <ServiceDetailsCard borderBottomColor={COLORS.green} />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <GreenCard />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderBottomColor: COLORS.lightGray,
            marginVertical: 5,
          }}>
          <Text>{t('subjectService')}</Text>
          <Text style={{color: COLORS.black, marginTop: 5}}>
            Technical Support
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderBottomColor: COLORS.lightGray,
            marginVertical: 5,
          }}>
          <Text>{t('details')}</Text>
          <Text style={{color: COLORS.black, marginTop: 5}}>
            This text is an example that can be replaced in the same space,.
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            {imagesData.map(item => (
              <Image
                key={item.id}
                style={{marginHorizontal: 2}}
                source={item.uri}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderBottomColor: COLORS.lightGray,
          }}>
          <Text>{t('location')}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../../../../assets/location.png')} />
              <Text style={{marginHorizontal: 5, color: COLORS.black}}>
                Building 25, Al Tayaran Street
              </Text>
            </View>
            <View
              style={{
                elevation: 2,
                padding: 5,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowRadius: 16,
                shadowColor: COLORS.black,
              }}>
              <Image source={require('../../../../../assets/map.png')} />
            </View>
          </View>
          <View>
            <Text style={{marginVertical: 5}}>{t('detailsAddress')}</Text>
            <Text style={{color: COLORS.black}}>
              Building 25, Al Tayaran Street, Nasr City
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            paddingTop: 15,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderBottomColor: COLORS.garay,
            marginVertical: 5,
          }}>
          {/* date */}
          <View>
            <Text>{t('startWork')}</Text>
            <Text style={{color: COLORS.black, paddingTop: 10}}>
              Tu, April 25, 2022 PM
            </Text>
          </View>
          <View style={{marginLeft: '10%'}}>
            <Text>{t('startWork')}</Text>
            <Text style={{color: COLORS.black, paddingTop: 10}}>
              Tu, April 25, 2022 PM
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            paddingTop: 15,
            paddingBottom: 15,
            marginVertical: 5,
          }}>
          {/* date */}
          <View
            style={{
              paddingHorizontal: 10,
            }}>
            <Text style={{marginBottom: 10}}>{t('additions')}</Text>
            {additionsData.map(item => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{}}
                  source={require('../../../../../assets/additionsIcon.png')}
                />
                {/* <Image source={require('../../assets/addionsIcon.png')} /> */}
                <Text
                  key={item.id}
                  style={{
                    color: COLORS.black,
                    // paddingTop: 10,
                    marginHorizontal: 8,
                  }}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <CancelDialog
          onTouchOutside={() => setCancelVisible(false)}
          visible={cancelVisible}
          onPress={() => setCancelVisible(value => !value)}
        />
      </ScrollView>

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
            onPress={() => setCancelVisible(true)}
            backgroundColor={COLORS.white}
            textColor={COLORS.red}
            borderColor={COLORS.white}
            text={t('rejectOrder')}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Button
            onPress={() => navigation.navigate('FinishWork')}
            styles={{paddingHorizontal: 0, paddingVertical: 10}}
            backgroundColor={COLORS.primary}
            textColor={COLORS.white}
            borderColor={COLORS.primary}
            text={t('finishWork')}
          />
        </View>
      </View>
    </>
  );
};

export default ServiceProviderDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // flex:1,
    paddingBottom: 40,
    paddingTop: 10,
    // height: '100%',
    // padding: 10,
  },
});
