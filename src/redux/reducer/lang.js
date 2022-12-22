import {I18nManager} from 'react-native';
import {SET_LANG} from '../actions/types';

const initialState = {
  locale: 'ar',
  isRTL: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {lang: action.lang, rtl: action.rtl};
    default:
      return state;
  }
};
