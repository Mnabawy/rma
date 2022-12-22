import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SearchInput} from '../../components/searchInput/SearchInput';
import {useState} from 'react';
import {t} from 'i18next';
import {Image} from 'react-native';
import {COLORS} from '../../utils';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import Indecator from '../../components/Indecator/Indecator';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import NoData from '../../components/NoData';

const SearchResults = () => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const searchText = useSelector(state => state.searchState.searchText);
  const [text, setText] = useState(searchText);
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const lang = i18n.language;
  const [nodata, setNodata] = useState(false);
  // api
  const getRestults = () => {
    try {
      setLoading(true);
      axios({
        method: 'get',
        url: `${BASE_URL}/search`,
        params: {
          q: searchText,
        },
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.services.length === 0) {
            setNodata(true);
          }
          setServicesList(res.data.data.services);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log('serach result err: ', error);
    }
  };

  useEffect(() => {
    getRestults();
  }, []);

  // search list
  // const list = useSelector(state => state.searchState.searchList);
  const list = [
    {
      id: '604aedbcc5b098',
      text: 'test ',
      body: 'This text is an example that can be replaced in the same space',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginHorizontal: 5}}>
          <Icon
            name={lang === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
            color={COLORS.darkBlue}
          />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <SearchInput
            value={text}
            // setSearchText=
          />
        </View>
      </View>
      <View style={styles.contentConainer}>
        <Text style={styles.headerText}>{t('researchResults')}</Text>
        {loading ? (
          <Indecator size="large" color={COLORS.primary} />
        ) : nodata ? (
          <View
            style={{
              flex: 1,
              marginTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <NoData />
          </View>
        ) : (
          servicesList?.map((item, index) => {
            // get part of the decription
            const desc = item?.description.slice(0, 80);
            return (
              <TouchableOpacity
                key={index}
                style={styles.viewCotainer}
                onPress={() =>
                  navigation.navigate('HomeStack', {
                    screen: 'ServiceDetails',
                    params: {id: item.id},
                  })
                }>
                <Image
                  source={{
                    uri: lang === 'ar' ? item?.image_ar : item?.image_en,
                  }}
                  style={{width: 88, height: 88}}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.body}>{desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    paddingTop: 10,
    height: '100%',
    backgroundColor: COLORS.white,
  },
  // leftBtn:{
  //   width:20
  // },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  contentConainer: {
    margin: 10,
    height: '100%',
    marginHorizontal: 20,
    // flex:1
  },
  searchView: {
    flex: 1,
  },
  viewCotainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  textContainer: {
    // fli
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    // marginHorizontal: 10,
    fontSize: 14,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    color: COLORS.garay,
  },
  title: {
    // marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  body: {
    // marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.garay,
  },
});
