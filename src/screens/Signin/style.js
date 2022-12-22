import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    // paddingBottom:200
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 70,
  },
  textContainer: {alignItems: 'center', height: 100, marginBottom: 30},
  header: {
    fontSize: 24,
    color: COLORS.black,
    marginVertical: 5,
  },
  subHeader: {
    color: COLORS.black,
    marginVertical: 5,
  },
  centeText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
