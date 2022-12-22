import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';

const useLanguage = () => {
  const {i18n} = useTranslation();
  const [selectedLanguage, setselectedLanguage] = useState('');
  useEffect(() => {
    getCurrentLanguage();
    return () => {};
  }, []);
  const getCurrentLanguage = () => {
    setselectedLanguage(i18n.language);
  };
  const onChageLanguage = useCallback(
    async language => {
      i18n.changeLanguage(language);
      setselectedLanguage(language);
    },
    [i18n],
  );
  const showEnLngModal = useCallback(() => {
    Alert.alert(
      'Change Langauge',
      'Are you want to change langauge to English ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onChageLanguage('en');
          },
        },
      ],
    );
  }, [selectedLanguage]);
  const showArLngModal = useCallback(() => {
    Alert.alert('تغيير اللغة', 'هل تريد تغيير اللغة الي العربية ؟', [
      {
        text: 'إلغاء',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'تأكيد',
        onPress: () => {
          onChageLanguage('ar');
        },
      },
    ]);
  }, [selectedLanguage]);
  return {onChageLanguage, selectedLanguage, showEnLngModal, showArLngModal};
};

export {useLanguage};
