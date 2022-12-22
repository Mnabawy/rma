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
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window').width;
const isRTL = false;

export const SearchInput = ({
  location,
  navigation,
  onPress,
  setSearchText,
  value,
  style,
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
      setSearchText(search);
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
          style={[
            {
              width: '100%',
              height: 100, // For all devices, even X, XS Max
              position: 'absolute',
              top: normalize(-20),
              left: 0,
              backgroundColor: COLORS.PRIMARY,
            },
            style,
          ]}
        />
      )}
      <SafeAreaView style={[styles.container, style]}>
        <View style={[styles.simpleRow, styles.viewInput]}>
          <TouchableOpacity
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
            placeholder={translate('searchForServices')}
            placeholderTextColor={COLORS.BLACK + 50}
            onSubmitEditing={_searching}
            returnKeyType="search"
          />
        </View>
        <View>
          {error && <Text style={styles.error}>{t('searchErrorText')}</Text>}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: normalize(16),
    width,
    backgroundColor: COLORS.lightGray,
    // borderBottomLeftRadius: normalize(16),
    // borderBottomRightRadius: normalize(16),
    borderRadius: 8,
    // marginHorizontal: 10,
    alignItems: 'center',
  },
  simpleRow: {
    flexDirection: !isRTL ? 'row-reverse' : 'row',
    // flexDirection: 'row',
    justifyContent: !isRTL ? 'space-between' : 'flex-start',
    alignItems: 'center',
    // borderWidth: 1,
  },
  input: {
    color: '#2C3E50',
    fontSize: normalize(16),
    marginStart: normalize(10),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  viewInput: {
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
