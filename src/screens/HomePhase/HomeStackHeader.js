import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {t} from 'i18next';
import {shareOptions} from '../../App';
import {useLanguage} from '../../utils/useLanguage';

const HomeStackHeader = ({
  isFav,
  title,
  navigation,
  dotsMenu,
  onPress,
  onClickAddToFav,
}) => {
  const {selectedLanguage} = useLanguage();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={onPress ? onPress : () => navigation.goBack()}>
          <Icon
            name={selectedLanguage === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
            color={COLORS.darkBlue}
          />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>

      {dotsMenu && (
        <Menu>
          <MenuTrigger>
            <EntypoIcon
              name="dots-three-vertical"
              size={22}
              color={COLORS.darkBlue}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{marginTop: 30, width: 110}}>
            <MenuOption
              disabled={isFav === 1}
              style={styles.menuItem}
              onSelect={onClickAddToFav}>
              {/* <View style={styles.menuItem}> */}
              {isFav === 0 ? (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../../assets/saveIcon.png')}
                />
              ) : (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../../assets/full_heart.png')}
                />
              )}
              <Text style={styles.menuText}>{t('save')}</Text>
              {/* </View> */}
            </MenuOption>

            <MenuOption
              style={styles.menuItem}
              onSelect={() =>
                Share.open(shareOptions)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }>
              {/* <View style={styles.menuItem}> */}
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../assets/shareIcon.png')}
              />
              <Text style={styles.menuText}>{t('share')}</Text>
              {/* </View> */}
            </MenuOption>
            <MenuOption
              style={styles.menuItem}
              onSelect={() => alert(`retport`)}>
              {/* <View style={styles.menuItem}> */}
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../assets/reportIcon.png')}
              />
              <Text style={styles.menuText}>{t('report')}</Text>
              {/* </View> */}
            </MenuOption>
          </MenuOptions>
        </Menu>
      )}
    </View>
  );
};

export default HomeStackHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 60,
    marginHorizontal: 20,
    // paddingVertical:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    marginHorizontal: 10,
  },
  text: {
    color: COLORS.black,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
  },
  menuText: {marginHorizontal: 10},
});
