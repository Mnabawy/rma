import React, {useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  ScrollView,
  NativeModules,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AppartmentActive from './AppartmentActive';
import AppartmentHistory from './AppartmentHistory';
import SearchHeader from '../../components/Header/SearchHeader';
import {COLORS} from '../../utils';
import CustomTabBar from '../../components/TabBar/TabBar';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import TabButton from '../../Supplier/Screens/Home/component.js/TabButton';
import {t} from 'i18next';
import RedirectPopup from '../../components/RedirectPopup/RedirectPopup';
import * as authActions from '../../redux/actions/auth';
import {useIsFocused} from '@react-navigation/native';
import {RefreshControl} from 'react-native';
const Appartment = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [redirectVisible, setRedirectVisible] = useState(false);
  const dispatch = useDispatch();
  // tabs
  const [select, setSelect] = useState({
    active: true,
    history: false,
  });

  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!token) {
      setRedirectVisible(true);
    }
  }, [isFocused]);

  const {StatusBarManager} = NativeModules;
  //  {marginTop: StatusBarManager.HEIGHT}
  return (
    <View
      style={[
        styles.container,
      ]}>
      <SearchHeader navigation={navigation} />

      {/* tabs */}
      <View style={{paddingHorizontal: 10}}>
        <ScrollView
          // refreshControl={
          //   <RefreshControl
          //     colors={[COLORS.primary]}
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //   />
          // }
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            width: '100%',
            height: 60,
          }}>
          <TabButton
            style={{flex: 0.5}}
            title={t('active')}
            active={select.active}
            onPress={() => {
              setSelect({active: true});
            }}
          />
          <TabButton
            style={{flex: 0.5}}
            title={t('history')}
            active={select.history}
            onPress={() => {
              setSelect({history: true});
            }}
          />
        </ScrollView>
      </View>

      {/* content */}
      <View
        style={{
          marginTop: 10,
          height: '100%',
          marginHorizontal: 10,
          flex: 1,
        }}>
        {select.active && <AppartmentActive navigation={navigation} />}
        {select.history && <AppartmentHistory navigation={navigation} />}
      </View>
      <RedirectPopup
        onPress={async () => {
          await setRedirectVisible(false);
          await dispatch(authActions.logout());
        }}
        visible={redirectVisible}
        onTouchOutside={() => {
          setRedirectVisible(false);
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

export default Appartment;
