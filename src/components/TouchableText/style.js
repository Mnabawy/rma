import {I18nManager, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  text: {
    color: COLORS.blue,
  },
});
