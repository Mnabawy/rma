import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from 'i18next';
import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../components/buttonColored/Button';
import CustomCheckBox from '../../../components/checkBox/CheckBox';
import RoundedCheckkBox from '../../../components/checkBoxRounded/CheckBox';
import {SearchInput} from '../../../components/searchInput/SearchInput';
import {removeFromSearch} from '../../../redux/actions/search';
import {COLORS} from '../../../utils';
// import {MMKVLoader} from 'react-native-mmkv-storage';

import AppText from '../../../components/text/Text';

import data from './DummyData.json';

const Search = ({navigation}) => {
  // const MMKV = new MMKVLoader().initialize();
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const searchList = useSelector(state => state.searchState.searchList); // from redux
  const text = useSelector(state => state.searchState.searchText);
  const [searchText, setSearchText] = useState(text);

  const [visible, setVisible] = useState('');

  const listName = 'searchList';
  const saveToAsyncStorage = useCallback(async () => {
    // MMKV.setArray(listName, []);

    const searchList = [];
    const newItem = {
      id: Math.random().toString(16).slice(2),
      text: text,
    };
    searchList.concat(newItem);
    // MMKV.setArray(listName, searchList);

    // const tergetList = MMKV.getArray(listName);
    // console.log(tergetList);
  }, [searchText]);

  useEffect(() => {
    setSearchText(text);
    saveToAsyncStorage();
  }, [searchText]);

  return (
    <View style={styles.container}>
      {/* search input with back arrow btn */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginHorizontal: 5}}>
          <Image
            source={require('../../../../assets/backBtn.png')}
            style={styles.leftBtn}
          />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <SearchInput
            onPress={() => navigation.navigate('SearchResults', {searchText})}
          />
        </View>
        <TouchableOpacity style={{padding: 5}} onPress={() => setVisible(true)}>
          <Image source={require('../../../../assets/filter.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentConainer}>
        <Text>{t('recentSearches')}</Text>
        {/* recent results */}
        {searchList.map(searchItem => (
          <View key={searchItem.id} style={styles.itemContainer}>
            <View style={styles.iconTextView}>
              <Image
                source={require('../../../../assets/searchitemIcon.png')}
              />
              <Text style={styles.text}>{searchItem.text}</Text>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(removeFromSearch({id: searchItem.id}))}>
              <Image source={require('../../../../assets/deleteItem.png')} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Dialog
        width={'95%'}
        height={'80%'}
        // dialogStyle={{bottom: 0, position: 'absolute'}}
        visible={visible}
        onTouchOutside={() => setVisible(value => !value)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.grayBg,
            padding: 10,
            paddingVertical: 15,
          }}>
          <TouchableOpacity onPress={() => setVisible(value => !value)}>
            <Image source={require('../../../../assets/close.png')} />
          </TouchableOpacity>
          <AppText style={{marginHorizontal: 10}}>{t('selectService')}</AppText>
        </View>
        <DialogContent style={{width: '100%', flex: 1, paddingHorizontal: 10}}>
          <SearchInput
            style={{marginTop: 20}}
            styles={{marginHorizontal: 0, marginTop: 40}}
            onPress={() => {}}
          />
          {/* <ScrollView> */}
          <FlatList 
            style={{flex: 1}}
            showsVerticalScrollIndicator
            data={data}
            renderItem={({item}) => (
              <View
                key={item.id}
                style={{paddingVertical: 20, marginHorizontal: 5}}>
                <View
                  style={{
                    marginBottom: 10,
                  }}>
                  <RoundedCheckkBox
                    boxType="circle"
                    text={item.title}
                    textStyle={{fontSize: 16, color: COLORS.black}}
                    containerStyle={{marginVertical: 0}}
                  />
                </View>
                {item.items.map(item => (
                  <View
                    key={item.id}
                    style={{
                      marginHorizontal: 30,
                      justifyContent: 'center',
                    }}>
                    <CustomCheckBox
                      textStyle={{fontSize: 16, color: COLORS.black}}
                      containerStyle={{marginVertical: 5}}
                      text={item.title}
                    />
                  </View>
                ))}
              </View>
            )}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              height: 50,
            }}>
            <View style={{}}>
              <CustomButton
                text={t('cancel')}
                backgroundColor={COLORS.white}
                textColor={COLORS.red}
                borderColor={COLORS.white}
              />
            </View>
            <View style={{}}>
              <CustomButton
                styles={{paddingHorizontal: 30, paddingVertical: 10}}
                text={t('done')}
                backgroundColor={COLORS.primary}
                textColor={COLORS.white}
                borderColor={COLORS.primary}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    flex: 1,
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
