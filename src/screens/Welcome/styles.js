import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    height: height,
    width: width,
    // width: '100%', // applied to Image
    // height: '100%'
  },

  txtContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '30%',
  },

  header: {
    color: COLORS.white,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    fontSize: 22,
    // fontWeight: 'bold',
    // fontFamily: 'Poppins-Light',
    fontFamily: 'Poppins-Regular',
  },
  body: {
    color: COLORS.white,
    // textAlign: I18nManager.isRTL ? 'left' : 'right',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  button: {
    color: 'red',
  },
});
