import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import {setDefaultNamespace, t} from 'i18next';
import {Linking} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import Indecator from '../../../components/Indecator/Indecator';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const AboutUs = () => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({});
  const [socialLinks, setSocialLinks] = useState({});

  const getData = async () => {
    setLoading(true);
    try {
      await axios({
        url: `${BASE_URL}/page`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          slug: 'about-us',
        },
      }).then(res => {
        if (res.data.success) {
          setContent(res.data.data);
        }
      });
    } catch (err) {
      console.log('social links api issue', err);
    }
    setLoading(false);
  };

  const getSocialData = async () => {
    setLoading(true);
    try {
      await axios({
        url: `${BASE_URL}/settings`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          code: 'social_links',
        },
      }).then(res => {
        if (res.data.success) {
          setSocialLinks(res.data.data.value);
        }
      });
    } catch (err) {
      console.log('about us api issue', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
    getSocialData();
  }, []);

  // console.log('facebook', socialLinks['facebook']);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Indecator color={COLORS.primary} size="large" />
    </View>
  ) : (
    <View
      style={{backgroundColor: COLORS.white, flex: 1, paddingHorizontal: 10}}>
      <View style={{alignItems: 'center', marginTop: 25}}>
        <Image source={require('../../../../assets/aboutUs.png')} />
      </View>
      <>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <AppText style={{fontSize: 18, color: COLORS.black}}>
            {content.title}
          </AppText>

          <AppText
            style={{
              textAlign: 'center',
              marginTop: 10,
              color: COLORS.black,
            }}>
            {content.content}
          </AppText>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: COLORS.black,
              marginTop: 10,
            }}>
            {t('socialMedia')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '40%',
              marginTop: 10,
            }}>
            {/* added socital links */}
            {/* { */}

            <TouchableOpacity
              onPress={() => Linking.openURL(socialLinks['facebook'])}>
              <Image
                style={styles.socital_icon}
                source={require('../../../../assets/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialLinks['twitter'])}>
              <Image
                style={styles.socital_icon}
                source={require('../../../../assets/twitter.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialLinks['linkedin'])}>
              <Image
                style={styles.socital_icon}
                source={require('../../../../assets/linkedin.png')}
              />
            </TouchableOpacity>
            {/* } */}
          </View>
        </View>
      </>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  socital_icon: {
    width: 50,
    height: 50,
    marginHorizontal:5
  },
});
