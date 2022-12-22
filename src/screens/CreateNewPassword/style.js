import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'flex-start',
    paddingTop: 90,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  txtContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {},
  btnContainer: {marginTop: 30},
});
