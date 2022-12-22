import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomProgress from '../../../components/Progress/Progress';
import {StatusBar} from 'react-native';
import HeaderArrowBack from '../../../components/HeaderArrowBack/HeaderArrowBack';
import {COLORS} from '../../../utils';
import {t} from 'i18next';
import {TabView, SceneMap} from 'react-native-tab-view';
import CustomTabBar from '../../../components/TabBar/TabBar';
import AppText from '../../../components/text/Text';

import People from './Tabs/People';
import Group from './Tabs/Group';
import TabButton from '../Home/component.js/TabButton';
import Screen from '../../../components/ScreenWrpper/ScreenWrpper';
import {useTranslation} from 'react-i18next';

const SelectServiceProvider = ({navigation}) => {
  const width = Dimensions.get('screen').width;
  const [select, setSelect] = useState({
    people: true,
    group: false,
  });

  return (
    <Screen style={{flex: 1}} background={COLORS.white}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <CustomProgress
        borderWidth={0}
        color={COLORS.primary}
        width={width}
        progress={1}
      />
      <HeaderArrowBack />
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 15,
          paddingTop: 20,
        }}>
        <AppText
          style={{
            color: COLORS.black,
            fontSize: 18,
          }}>
          {t('selectServiceProvider')}
        </AppText>
      </View>
      {/* header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 0.5}}>
          <TabButton
            active={select.people}
            onPress={() => {
              setSelect({people: true});
            }}
            title={t('people')}
          />
        </View>
        <View style={{flex: 0.5}}>
          <TabButton
            title={t('group')}
            active={select.group}
            onPress={() => {
              setSelect({group: true});
            }}
          />
        </View>
      </View>
      {/* content */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
        }}>
        {select.people && <People navigation={navigation} />}
        {select.group && <Group navigation={navigation} />}
      </View>
    </Screen>
  );
};

export default SelectServiceProvider;

const styles = StyleSheet.create({});
