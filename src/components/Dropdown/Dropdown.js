import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';

// const data = [
//   {label: 'Item 1', value: '1'},
//   {label: 'Item 2', value: '2'},
//   {label: 'Item 3', value: '3'},
//   {label: 'Item 4', value: '4'},
//   {label: 'Item 5', value: '5'},
//   {label: 'Item 6', value: '6'},
//   {label: 'Item 7', value: '7'},
//   {label: 'Item 8', value: '8'},
// ];

const DropdownComponent = ({
  search,
  data,
  onChange,
  label,
  placeholder,
  value,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const renderLabel = () => {
    if (true) {
      return (
        <Text style={[styles.label, isFocus && {color: COLORS.garay}]}>
          {label}
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: COLORS.garay}]}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            textAlign: lang ? 'left' : 'right',
          },
        ]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? t('selectItem') : '...'}
        searchPlaceholder={t('searchDots')}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
      />
    </View>
  );
};

export default DropdownComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height:50,
    padding: 16,
    marginHorizontal: -16,
    // marginVertical:16
    // marginVertical:20
  },
  dropdown: {
    height: 55,
    borderColor: COLORS.garay,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    left: 22,
    top: 2,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.black,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
