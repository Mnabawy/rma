import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, TouchableOpacity, View} from 'react-native';

import AppText from '../../../components/text/Text';
import {COLORS} from '../../../utils';
import Icon from 'react-native-vector-icons/AntDesign';

const TitleMenuHeader = ({title, menu, navigation}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name={lang === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
            color={COLORS.darkBlue}
          />
        </TouchableOpacity>
        <AppText
          style={{marginHorizontal: 20, fontSize: 18, color: COLORS.black}}>
          {title}
        </AppText>
      </View>
      {menu}
    </View>
  );
};

export default TitleMenuHeader;
