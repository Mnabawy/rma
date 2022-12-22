import {StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {alignItems: 'center', marginVertical: 15},
  textContainer: {alignItems: 'center', marginBottom: 30},
});
