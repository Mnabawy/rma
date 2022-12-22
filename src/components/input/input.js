import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TextInput, I18nManager} from 'react-native';
import {COLORS} from '../../utils';
import {useLanguage} from '../../utils/useLanguage';
import styles from './style';

const Input = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label,
  error,
  onBlur,
  placeholder,
  ...props
}) => {
  const {selectedLanguage, onChageLanguage} = useLanguage();
  const [focused, setFocused] = React.useState(false);
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const isRtl = selectedLanguage === 'ar';
  // const isRtl = true
  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text
          style={{
            opacity: 1,
            color: COLORS.black,
            top: 10,
            fontSize: 16,
            backgroundColor: 'white',
            // flexDirection: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: 10,
            paddingHorizontal: 5,
            alignSelf: 'flex-start',
            zIndex: 5, // to display it on top of the other view
          }}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {flexDirection: selectedLanguage === 'en' ? 'row-reverse' : 'row'},
        ]}>
        <View style={{}}>{icon && icon}</View>

        <TextInput
          autoFocus={true}
          style={[
            styles.textInput,
            style,
            {
              textAlign: lang === 'ar' ? 'left' : 'right',
            },
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
