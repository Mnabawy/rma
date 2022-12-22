import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from 'i18next';
import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SearchInput} from '../../components/searchInput/SearchInput';
import {removeFromSearch} from '../../redux/actions/search';
import {COLORS} from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
// import {MMKVLoader} from 'react-native-mmkv-storage';

const Search = ({navigation}) => {
  // const MMKV = new MMKVLoader().initialize();
  const [list, setList] = useState([]);
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const searchList = useSelector(state => state.searchState.searchList); // from redux
  const text = useSelector(state => state.searchState.searchText);
  const [searchText, setSearchText] = useState(text);
  const listName = 'searchList';
  const saveToAsyncStorage = useCallback(async () => {
    const searchList = [];
    const newItem = {
      id: Math.random().toString(16).slice(2),
      text: text,
    };
    searchList.concat(newItem);
  }, [searchText]);

  useEffect(() => {
    setSearchText(text);
    saveToAsyncStorage();
  }, [searchText]);

  return (
    <View style={styles.container}>
      {/* search input with back arrow btn */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name={lang === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
            color={COLORS.darkBlue}
          />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <SearchInput
            onPress={() => navigation.navigate('SearchResults', {searchText})}
          />
        </View>
      </View>
      <View style={styles.contentConainer}>
        <Text>{t('recentSearches')}</Text>
        {/* recent results */}
        {searchList.map(searchItem => (
          <View key={searchItem.id} style={styles.itemContainer}>
            <View style={styles.iconTextView}>
              <Image source={require('../../../assets/searchitemIcon.png')} />
              <Text style={styles.text}>{searchItem.text}</Text>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(removeFromSearch({id: searchItem.id}))}>
              <Image source={require('../../../assets/deleteItem.png')} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  // },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    // flex: 1,
  },
  contentConainer: {
    marginTop: 30,
  },
  searchView: {
    flex: 1,
  },
  itemContainer: {
    marginTop: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
});
