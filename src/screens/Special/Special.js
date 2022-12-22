import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {t} from 'i18next';
import {FlatList} from 'react-native';
import {COLORS} from '../../utils';
const jsonData = require('../../../assets/SpecialServices.json');
import SpecialRenderItem from './RenderItem';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import Indecator from '../../components/Indecator/Indecator';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as serviceActions from '../../redux/actions/service';
import NoData from '../../components/NoData';
import {useTranslation} from 'react-i18next';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as authActions from '../../redux/actions/auth';
import {RefreshControl} from 'react-native';
import RedirectPopupIos from '../../components/RedirectPopupIos/RedirectPopup';
import RedirectPopup from '../../components/RedirectPopup/RedirectPopup';

const Special = ({}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const token = useSelector(state => state.auth.token);
  const [nodata, setNodata] = useState(false);
  const [redirectVisible, setRedirectVisible] = useState(false);
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      axios({
        url: `${BASE_URL}/service`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
        },
        params: {
          type: 'private', //private
        },
      }).then(res => {
        if (res.data.success) {
          if (res?.data?.data[0]?.children?.length === 0) {
            setNodata(true);
          }
          setServices(res?.data?.data[0]?.children);
          setDescription(res?.data?.data[0]?.description);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('get spectial services list err', error);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    }

    if (!token) {
      setRedirectVisible(true);
    }
  }, [isFocused, refreshing]);

  const WrpperComponent = ({children, style, background}) => {
    const Wrapper =
      Platform.OS === 'ios' ? (
        <SafeAreaView style={[style, {backgroundColor: background}]}>
          {children}
        </SafeAreaView>
      ) : (
        <>{children}</>
      );
    return Wrapper;
  };

  return (
    <WrpperComponent>
      <Header navigation={navigation} />
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: COLORS.white,
          }}>
          <Indecator size="large" color={COLORS.primary} />
        </View>
      ) : nodata ? (
        <NoData />
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <Text
            style={[
              styles.header,
              {textAlign: lang !== 'en' ? 'left' : 'right'},
            ]}>
            {t('specialServices')}
          </Text>
          <Text
            style={{
              marginBottom: 15,
              marginHorizontal: 10,
              textAlign: lang !== 'en' ? 'left' : 'right',
            }}>
            {description}
          </Text>

          <View>
            {/* image */}
            <FlatList
              style={styles.flatlist}
              data={services}
              renderItem={({item}) => (
                <SpecialRenderItem
                  item={item}
                  onPress={async () => {
                    navigation.navigate('SpectialStack', {
                      screen: 'SpecialService',
                    });
                    await dispatch(serviceActions.setServiceId(item?.id));
                  }}
                />
              )}
            />
            <View></View>
          </View>
        </ScrollView>
      )}
      {/* {Platform.OS === 'ios' ? ( */}
      <RedirectPopupIos
        onPress={async () => {
          await setRedirectVisible(false);
          await dispatch(authActions.logout());
        }}
        visible={redirectVisible}
        onTouchOutside={async () => {
          await navigation.navigate('Home');
          await setRedirectVisible(false);
        }}
      />
      {/* // ) : (
      //   <RedirectPopup
      //     onPress={async () => {
      //       await setRedirectVisible(false);
      //       await dispatch(authActions.logout());
      //     }}
      //     visible={redirectVisible}
      //     onTouchOutside={async () => {
      //       await navigation.navigate('Home');
      //       await setRedirectVisible(false);
      //     }}
      //   />
      // )} */}
    </WrpperComponent>
  );
};

export default Special;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    ...Platform.select({
      ios: {
        height: '100%',
      },
    }),
    backgroundColor: COLORS.white,
  },
  flatlist: {},
  header: {
    marginHorizontal: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.black,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    padding: 5,
    flexDirection: 'row',
    margin: 10,
  },
  textContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  imageContainer: {},
  image: {
    overflow: 'hidden',
    borderRadius: 8,
    width: 60,
    height: 60,
  },
});
