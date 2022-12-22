import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  inputContainer: {},

  wrapper: {
    borderWidth: 1,
    borderColor: COLORS.garay,
    borderRadius: 8,
    height: 60,
    paddingHorizontal: 10,
  },

  textInput: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
    width: '100%',
    height: Platform.OS === 'ios' ? '100%' : null,
    fontSize: 14,
  },

  error: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
  },
});
