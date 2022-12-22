import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {COLORS} from '../../utils/colors';

const PopUpMenu = ({content, optionsContainerStyle}) => {
  return (
    <Menu style={styles.menuContainer}>
      <MenuTrigger onPress={() => console.log('clicked')}>
        <EntypoIcon
          name="dots-three-vertical"
          size={22}
          color={COLORS.darkBlue}
        />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={optionsContainerStyle}>
        {content
          ? content.map((item, index) => {
              return (
                <MenuOption
                  key={index}
                  style={styles.menuItem}
                  onSelect={item.onSelect}>
                  {/* <View style={styles.menuItem}> */}
                  <Image source={item.uri} style={styles.image} />

                  <Text style={styles.menuText}>{item.text}</Text>
                  {/* </View> */}
                </MenuOption>
              );
            })
          : ''}
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
  image: {marginHorizontal: 5, width: 25, height: 25},
  text: {
    color: COLORS.black,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    height: 50,

    // alignSelf: 'flex-end',
  },
  menuText: {
    // marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
    fontSize: 12,
  },
});
