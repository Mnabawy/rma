import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils';
import {t} from 'i18next';
import TouchableText from '../components/TouchableText/TouchableText';
import axios from 'axios';
import {BASE_URL} from '../utils/config';
import TitleMenuHeader from './Coponents/Header/Header';
import {useTranslation} from 'react-i18next';

const data = require('./Data/AboutDummyData.json');

const About = ({route, navigation}) => {
  const {company_id} = route.params;
  const [companyDetails, setCompanyDetails] = useState({});
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const getData = async () => {
    try {
      await axios({
        method: 'get',
        url: `${BASE_URL}/company/details`,
        headers: {
          locale: lang,
        },
        params: {
          company_id,
        },
      }).then(res => {
        if (res.data.success) {
          setCompanyDetails(res.data.data);
        }
      });
    } catch (error) {
      console.log('about spectial comapny details', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <TitleMenuHeader
          title={`${t('about')} ${companyDetails.name}`}
          navigation={navigation}
        />
        <View style={styles.contentCotainer}>
          <Text style={styles.title}>{companyDetails?.name}</Text>
          <Text style={styles.body}>{companyDetails?.about}</Text>
        </View>

        <Text style={styles.title}>{t('website')}</Text>
        <View style={{alignItems: 'flex-start', marginTop: 10}}>
          <TouchableText
            text={companyDetails?.website}
            onPress={() => Linking.openURL(companyDetails?.website)}
          />
        </View>
        <Text style={styles.title}>{t('phone')}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableText
            text={companyDetails?.phone_number}
            onPress={() => {}}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${companyDetails?.phone_number}`)
            }
            style={{
              // borderWidth: 1,
              // padding: 10,
              shadowColor: COLORS.darkBlue,
              padding: 5,
              shadowOffset: {width: 0, height: 10},
              shadowRadius: 2,
              shadowOpacity: 0.8,
              elevation: 0.4,
              // width: 40,
              // height: 40,
            }}>
            <Image source={require('../../assets/telbg.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{t('socialMedia')}</Text>
        <View style={styles.soctialView}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${companyDetails?.social_media?.facebook}`)
            }>
            <Image source={require('../../assets/facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${companyDetails?.social_media?.twitter}`)
            }>
            <Image
              style={styles.soctialItem}
              source={require('../../assets/twitter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${companyDetails?.social_media?.snapchat}`)
            }>
            <Image
              style={styles.soctialItem}
              source={require('../../assets/snapchat.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${companyDetails?.social_media?.linkedin}`)
            }>
            <Image
              style={styles.soctialItem}
              source={require('../../assets/linkedin.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  contentCotainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
    marginTop: 10,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    // color: COLORS.black,
  },
  soctialView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  soctialItem: {
    marginHorizontal: 5,
  },
  footer: {},
});
