import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_LANG} from './types';


export const setLang = (lang, rtl) => async dispatch => {
  dispatch({type: SET_LANG, lang, rtl});
  await AsyncStorage.setItem('lang', JSON.stringify({lang, rtl}));
};
