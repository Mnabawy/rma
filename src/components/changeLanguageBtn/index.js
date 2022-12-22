import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useLanguage} from '../../utils/useLanguage';

const ChangeLanguage = ({lng}) => {
  const {onChageLanguage, selectedLanguage} = useLanguage();
  return (
    <TouchableOpacity
      onPress={() => onChageLanguage(lng)}
      style={{
        position: 'absolute',
        top: 100,
        zIndex: 100,
        marginHorizontal: 100,
        backgroundColor: 'red',
      }}>
      <Text>change language</Text>
    </TouchableOpacity>
  );
};

export default ChangeLanguage;
