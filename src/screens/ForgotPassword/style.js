import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexGrow: 1,
  },
  logo: {alignItems: 'center', marginVertical: 15},
  textContainer: {alignItems: 'center', marginBottom: 30},
});
