import {StyleSheet, I18nManager, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {height} from 'styled-system';
import {COLORS, normalize} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    zIndex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
  },
  btn: {
    width: '100%',
    marginHorizontal: '4%',
  },
  currentMarker: {
    width: normalize(25),
    height: normalize(25),
    resizeMode: 'contain',
  },
  linearGradient: {
    height: hp(30),
    width: '100%',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingStart: 16,
    // marginTop: hp(5)
  },
  title_txt: {
    color: 'black',
    fontSize: normalize(18),
    marginStart: 10,
  },
  gps: {
    width: normalize(55),
    height: normalize(55),
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  gps_container: {
    marginStart: 'auto',
    marginEnd: '4%',
    marginBottom: '2%',
    // borderRadius: 30,
    // borderColor: 'gray',
    // borderWidth: 1,
  },
});

export default styles;
