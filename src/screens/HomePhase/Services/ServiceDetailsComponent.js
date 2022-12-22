import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
const carouselItem = require('../../../../assets/HomeCarosel.json');
import HomeStackHeader from '../HomeStackHeader';
import {useState} from 'react';
import {useRef} from 'react';
import {COLORS} from '../../../utils';
import ServiceDetailsTextCard from './ServiceDetailsTextCard';
const dummyData = require('./ServiceDetailsDummyData.json');
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const {width} = Dimensions.get('screen').width;
const ServiceDetailsComponent = ({navigation, route}) => {
  // const {title} = route.params;
  // console.log('title ', title);
  // console.log('props ', props);
  let flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  //Only needed if want to know the index
  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const renderItemCarosel = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => console.log('pressed')}
        activeOpacity={1}>
        {/* <View style={{flex}}> */}

        <Image
          source={{
            uri: item.url,
          }}
          style={styles.image}
        />
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };

  return (
    <>
      {/* <HomeStackHeader onPress={() => navigation.goBack()} /> */}
      {/* <ScrollView contentContainerStyle={{marginHorizontal: 10 , marginBottom:20}}> */}
      <View>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            marginHorizontal: 0,
            alignItems: 'center',
          }}
          data={carouselItem}
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
      {dummyData.map(item => (
        <ServiceDetailsTextCard title={item.title} body={item.body} />
      ))}
      {/* </ScrollView> */}
    </>
  );
};

export default ServiceDetailsComponent;

const styles = StyleSheet.create({
  image: {
    width: width, // cuase err
    height: 200,
    resizeMode: 'cover',
    aspectRatio: 2,
  },
  carosel: {
    maxHeight: 600,
    paddingRight: 20,
  },
  footer: {},
  footerText: {},
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
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
