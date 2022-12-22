import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import AppText from '../../../../components/text/Text';
import {COLORS} from '../../../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/buttonColored/Button';
import {Rating, AirbnbRating} from 'react-native-ratings';

const UserReviews = ({route}) => {
  const {items} = route?.params;
  console.log('items: ', items);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: COLORS.white,
          flex: 1,
        }}>
        <AppText style={{color: COLORS.black, fontSize: 20}}>
          {t('userReviews')}
        </AppText>

        {items?.map(item => (
          <View style={{marginTop: 15}}>
            <AppText style={{color: COLORS.black, fontSize: 16}}>
              {item?.question}
            </AppText>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <AirbnbRating
                count={5}
                defaultRating={item?.rate}
                size={25}
                showRating={false}
                onFinishRating={newRate => {}}
              />
              {/* <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
          <Icon name="staro" size={20} /> */}
            </View>
          </View>
        ))}
        {/* <View style={{marginTop: 15}}>
          <AppText style={{color: COLORS.black, fontSize: 16}}>
            Professionalism in dealing
          </AppText>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="staro" size={20} />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <AppText style={{color: COLORS.black, fontSize: 16}}>
            connection speed
          </AppText>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="staro" size={20} />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <AppText style={{color: COLORS.black, fontSize: 16}}>
            Workmanship
          </AppText>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="staro" size={20} />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <AppText style={{color: COLORS.black, fontSize: 16}}>
            work experience
          </AppText>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="staro" size={20} />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <AppText style={{color: COLORS.black, fontSize: 16}}>
            Respect the delivery date
          </AppText>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="star" size={20} color={COLORS.gold} />
            <Icon name="staro" size={20} />
          </View>
        </View> */}
      </ScrollView>
    </>
  );
};

export default UserReviews;

const styles = StyleSheet.create({});
