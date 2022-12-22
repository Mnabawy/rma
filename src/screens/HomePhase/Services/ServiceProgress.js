//

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TermsConditions from './TermsConditions';
import Stepper from '../../../components/react-native-stepper-ui';
import {COLORS} from '../../../utils';
import ServiceDetailsComponent from './ServiceDetailsComponent';

import HomeStackHeader from '../HomeStackHeader';
import BookService from './BookService';
import Additions from './Additions';

const ServiceDetails = ({navigation, route}) => {
  const {title} = route.params;
  const [active, setActive] = useState(0);
  const MyComponent = props => {
    return (
      <View>
        <Text>{props.title}</Text>
      </View>
    );
  };

  const content = [
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <HomeStackHeader title={title} navigation={navigation} route={route} />
      <ServiceDetailsComponent navigation={navigation} route={route} />
    </View>, // 1
    <View style={{paddingHorizontal: 10, backgroundColor: COLORS.white}}>
      <BookService
        navigation={navigation}
        route={route}
        onPress={() => navigation.goBack()}
      />
    </View>, //2
    <Additions />, //3
    <TermsConditions title="Privacy & Terms" />, // 4
  ];

  return (
    <View
      style={{
        marginBottom: 80, // button will disabear
        // marginHorizontal: 20
      }}>
      <Stepper
        navigation={navigation}
        route={route}
        // buttonStyle={buttonStyle}
        active={active}
        content={content}
        onBack={() => setActive(p => p - 1)}
        onFinish={() => navigation.navigate('HomeSuccess')}
        onNext={() => setActive(p => p + 1)}
      />
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  // buttonStyle: {
  //   backgroundColor: COLORS.primary,
  // },
});
