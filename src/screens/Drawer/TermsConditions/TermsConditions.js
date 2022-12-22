import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import data from '../../../OrderCycle/OrderScreens/dummyData/PrivacyTermsDummyData.json';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import Indecator from '../../../components/Indecator/Indecator';
import {useLanguage} from '../../../utils/useLanguage';
import {useTranslation} from 'react-i18next';

const TermsConditions = () => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState({});
  
  const [content, setContent] = useState({});
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
          slug: 'terms',
        },
      }).then(res => {
        if (res.data.success) {
          setContent(res.data.data);
          // console.log('terms', res.data.data);
        }
      });
    } catch (err) {
      console.log('social links api issue', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Indecator color={COLORS.primary} size="large" />
    </View>
  ) : (
    <View
      style={{backgroundColor: COLORS.white, flex: 1, paddingHorizontal: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 15}}>
          <AppText style={{fontSize: 18, color: COLORS.black}}>
            {content.title}
          </AppText>
          <AppText style={{fontSize: 14, paddingVertical: 0}}>
            {content.content}
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({});
