import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    color: COLORS.white,
  },
});
