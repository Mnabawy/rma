import React, {useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../utils';
const carouselItem = require('../../../assets/HomeCarosel.json');

const {width} = Dimensions.get('screen').width;
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const ImageCarousel = ({images}) => {
  let flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  //Only needed if want to know the index
  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  // render item with data
  const renderItemCarosel = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => console.log('pressed')}
        activeOpacity={1}>
        <Image
          source={{
            uri: item,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };
  // render item with without data
  const renderDummyItemCarosel = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => console.log('pressed')}
        activeOpacity={1}>
        <Image
          source={{
            uri: item.url,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };

  return images?.length !== 0 ? (
    <View style={styles.container}>
      
      <FlatList
        contentContainerStyle={{
          marginHorizontal: 0,
        }}
        data={images}
        renderItem={renderItemCarosel}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={ref => {
          flatListRef.current = ref;
        }}
        style={styles.carosel}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        bounces={false}
      />
      <View style={styles.dotView}>
        {images?.map(({}, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.circle,
              {
                backgroundColor:
                  index === currentIndex ? COLORS.yellow : COLORS.garay,
                width: index === currentIndex ? 30 : 10,
              },
            ]}
            onPress={() => {
              scrollToIndex(index);
              console.log(index);
            }}
          />
        ))}
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          marginHorizontal: 0,
        }}
        data={carouselItem}
        renderItem={renderDummyItemCarosel}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={ref => {
          flatListRef.current = ref;
        }}
        style={styles.carosel}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        bounces={false}
      />
      <View style={styles.dotView}>
        {carouselItem.map(({}, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.circle,
              {
                backgroundColor:
                  index === currentIndex ? COLORS.yellow : COLORS.garay,
                width: index === currentIndex ? 30 : 10,
              },
            ]}
            onPress={() => {
              scrollToIndex(index);
              console.log(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // justifyContent:'flex-end'
  },
  image: {
    width: width, // cuase err
    height: 200,
    resizeMode: 'cover',
    aspectRatio: 2,
  },
  carosel: {
    // maxHeight: 600,
    // height:
    height: 300,
    paddingRight: 20,

    // borderWidth: 1,
  },
  footer: {},
  footerText: {},
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    // borderWidth:1
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  serviceFlatList: {
    // justifyContent: 'center',
  },
  servicesImage: {
    width: 100,
    height: 100,
  },
});
