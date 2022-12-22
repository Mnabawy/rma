import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    // flex:1,
    marginTop:20,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {alignItems: 'center', marginVertical: 15},
  textContainer: {alignItems: 'center', marginBottom: 30},
});
