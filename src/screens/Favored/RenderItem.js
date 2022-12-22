import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import {useLanguage} from '../../utils/useLanguage';
const FavoredRenderItem = ({item, onPress, onPressOnItem}) => {
  const {selectedLanguage} = useLanguage();
  const lang = selectedLanguage;
  console.log('itemid', item.id);
  const wishlistable = {...item?.wishlistable, is_fav: true};

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: lang === 'en' ? wishlistable.image_en : wishlistable.image_ar,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity style={styles.textContainer} onPress={onPressOnItem}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{wishlistable.name}</Text>
          <TouchableOpacity onPress={onPress}>
            <Icon
              name={wishlistable.is_fav ? 'heart' : 'hearto'}
              size={20}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.body}>
          {wishlistable?.description?.slice(0, 100)}
        </Text>
        {/* <Text style={styles.body}>{lang.slice(0,50)}</Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default FavoredRenderItem;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    padding: 5,
    flexDirection: 'row',
    margin: 10,
  },
  textContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: COLORS.black,
  },
  sub_title: {
    fontSize: 14,
    color: COLORS.black,
  },
  body: {
    flex: 1,
  },
  imageContainer: {},
  image: {
    overflow: 'hidden',
    borderRadius: 8,
    width: 100,
    height: 100,
  },
});
