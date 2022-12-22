import ar from './ar.json';
import en from './en.json';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async cb => {
    const cachedLang = await AsyncStorage.getItem('@CACHED_LANG');
    //reactotron.log('detect', cachedLang);
    cb(cachedLang || 'en');
  },
  init: () => {},
  cacheUserLanguage: async lng => {
    await AsyncStorage.setItem('@CACHED_LANG', lng);
    //reactotron.log('cacheUserLanguage', lng)
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ar: {
        translation: ar,
      },

      en: {
        translation: en,
      },
    },
    compatibilityJSON: 'v3',
    lng: i18next.language,
    fallbackLng: ['en', 'ar'],
    debug: false,
    react: {
      bindI18n: 'loaded languageChanged',
      bindI18nStore: 'added',
      useSuspense: false,
    },
  });
i18next.languages = ['en', 'ar'];
i18next.on('languageChanged', async lng => {
  if (lng === 'ar') {
    if (!I18nManager.isRTL) {
      RNRestart.Restart();
      I18nManager.forceRTL(true);
    }
  } else {
    if (I18nManager.isRTL) {
      RNRestart.Restart();
      I18nManager.forceRTL(false);
    }
  }
});
export default i18next;
