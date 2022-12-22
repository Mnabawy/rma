import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils';
import CustomCheckBox from '../../../components/checkBox/CheckBox';
import {t} from 'i18next';
import TouchableText from '../../../components/TouchableText/TouchableText';
import {useState} from 'react';

const data = require('./PrivacyTermsDummyData.json');

const TermsConditions = ({navigation}) => {
  const [value, setValue] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.body}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('screen').height,
        marginHorizontal: 10,
      }}>
      <FlatList data={data} renderItem={renderItem} />
      <CustomCheckBox
        value={value}
        onValueChange={newValue => setValue(newValue)}
        text={<TouchableText text={t('checkBoxText')} onPress={() => {}} />}
      />
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginTop: 10,
    color: COLORS.black,
  },
  text: {
    color: COLORS.black,
  },
});
