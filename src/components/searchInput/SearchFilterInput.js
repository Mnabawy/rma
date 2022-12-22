// not used till this moment
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  I18nManager,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  SafeAreaView,
} from 'react-native';
// import { COLORS, IMAGES, normalize } from './';
import {COLORS, normalize} from '../../utils';
import {t, t as translate} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addToSearch} from '../../redux/actions/search';
// import { searching } from '../../redux/actions';
// import { MyStatusBar } from '../MyStatusBar/index';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const {width} = Dimensions.get('window').width;
const isRTL = false;

const SearchFilterInput = ({
  location,
  navigation,
  onPress,
  // setSearchText,
  value,
}) => {
  const dispatch = useDispatch();
  const [search, onChangeSearch] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef();
  const [color, setColor] = useState(COLORS.PRIMARY);

  const _searching = async () => {
    if (search.length !== 0) {
      dispatch(addToSearch({text: search}));
      clearInput();
      onPress();
      // setSearchText(search);
      // const list = []
      // await AsyncStorage.setItem('searchList')
      setError(false);
    } else {
      setError(true);
    }
  };

  const clearInput = () => {
    inputRef.current.clear();
    onChangeSearch('');
  };

  return (
    <View>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: 100, // For all devices, even X, XS Max
            position: 'absolute',
            top: normalize(-20),
            left: 0,
            backgroundColor: COLORS.PRIMARY,
          }}
        />
      )}
      <SafeAreaView
        style={[
          styles.container,
          Platform.OS == 'ios' && {height: 40, justifyContent: 'center'},
        ]}>
        <View style={[styles.simpleRow, styles.viewInput]}>
          <TouchableOpacity
            // style={{flex: 0.3}}
            onPress={() => {
              _searching;
            }}>
            <AntDesign
              name={'search1'}
              color={'#2C3E50'}
              size={normalize(25)}
            />
          </TouchableOpacity>

          <TextInput
            value={value}
            ref={inputRef}
            style={styles.input}
            onChangeText={onChangeSearch}
            placeholder={translate('search')}
            placeholderTextColor={COLORS.BLACK + 50}
            onSubmitEditing={_searching}
            returnKeyType="search"
          />
          {/* </View> */}
          <TouchableOpacity
            // style={{flex: 0.2}}
            onPress={() => {
              console.log('filter');
            }}>
            <AntDesign name="filter" size={normalize(25)} color={'#2C3E50'} />
          </TouchableOpacity>
        </View>
        <View>
          {error && <Text style={styles.error}>{t('searchErrorText')}</Text>}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchFilterInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  simpleRow: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 0.9,
    color: '#2C3E50',
    fontSize: normalize(16),
    marginStart: normalize(10),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  viewInput: {
    felx: 1,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    height: Platform.OS === 'ios' ? normalize(30) : hp(6),
  },
  backIcon: {
    width: normalize(30),
    height: normalize(30),
    marginBottom: normalize(10),
  },
  reverseImg: {
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  error: {
    color: 'red',
  },
  //
});
