import {
  Image,
  NativeModules,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {t} from 'i18next';
import {FlatList} from 'react-native';
import {COLORS} from '../../utils';
const jsonData = require('../../../assets/FavoredData.json');
import FavoredRenderItem from './RenderItem';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import Indecator from '../../components/Indecator/Indecator';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from '../../components/Toast/Toast';
import NoData from '../../components/NoData';
import {useTranslation} from 'react-i18next';
import RedirectPopup from '../../components/RedirectPopup/RedirectPopup';
import * as authActions from '../../redux/actions/auth';

const Favored = ({}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [redirectVisible, setRedirectVisible] = useState(false);
  const [data, setData] = useState([]);
  const [serviceRemoved, setServiceRemoved] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    text: '',
  });

  const getData = async () => {
    try {
      setLoading(true);
      await axios({
        method: 'get',
        url: `${BASE_URL}/favorite`,
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
        },
      }).then(res => {
        if (res.data.success) {
          setData(res?.data?.data);
          console.log('fav res', res.data.data);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('favored err', error);
    }
  };

  const clearListHandler = async () => {
    try {
      setLoading(true);
      await axios({
        method: 'delete',
        url: `${BASE_URL}/favorite`,
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
          Accept: 'application/json',
        },
      }).then(res => {
        if (res.data.success) {
          setData([]);
          setToast({visible: true, text: t('deleted')});

          (function () {
            setTimeout(() => setToast({visible: false}), 2000);
          })();
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('favored err', error);
    }
  };

  const isFocused = useIsFocused();

  const removieItemFromFavoretHandler = item => {
    // console.log('service to remove id:', item?.wishlistable?.id);
    const id = item?.wishlistable?.id;
    try {
      axios({
        url: `${BASE_URL}/service/favorite`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
          // locale: lang,
          Accept: 'application/json',
        },
        data: {
          service_id: id,
        },
      }).then(res => {
        if (res.data.success) {
          console.log('deleted successfully success');
          setServiceRemoved(value => !value);
        } else {
          console.log(res.data);
        }
      });
    } catch (error) {}
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData();
    if (!token) {
      setRedirectVisible(true);
    }
  }, [isFocused, serviceRemoved, refreshing]);

  const {StatusBarManager} = NativeModules;
  return (
    <ScrollView
      // refreshControl={
      //   <RefreshControl
      //     colors={[COLORS.primary]}
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //   />
      // }
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: StatusBarManager.HEIGHT,
      }}>
      <Header navigation={navigation} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Indecator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {toast.visible && (
            <View
              style={{
                position: 'absolute',
                zIndex: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Toast text={toast.text} />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <Text style={styles.header}>{t('favoredList')}</Text>
            <TouchableOpacity onPress={clearListHandler}>
              {data?.length !== 0 && (
                <Text style={{color: COLORS.blue}}>{t('clearList')}</Text>
              )}
            </TouchableOpacity>
          </View>
          <View>
            {/* image */}
            {data.length !== 0 ? (
              <FlatList
                style={styles.flatlist}
                data={data}
                renderItem={({item}) => (
                  <FavoredRenderItem
                    onPressOnItem={
                      // () => console.log(item)
                      // navigation.navigate('ServiceDetails'),
                      () =>
                        navigation.navigate('HomeStack', {
                          screen: 'ServiceDetails',
                          params: {
                            id: item.wishlistable.id,
                          },
                        })
                    }
                    onPress={() => removieItemFromFavoretHandler(item)}
                    item={item}
                  />
                )}
              />
            ) : (
              <View
                style={{
                  marginTop: 100,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <NoData />
              </View>
            )}
            {/* text */}
            <View></View>
          </View>
        </View>
      )}
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
    </ScrollView>
  );
};

export default Favored;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  flatlist: {},
  header: {
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
