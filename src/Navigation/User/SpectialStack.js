import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text} from 'react-native';
import SpecialService from '../../SpecialCycle/SpecialServices';
import PopUpMenu from '../../components/PopUpMenu/PopUpMenu';
import ServiceProviderDetails from '../../SpecialCycle/ServiceProviderDetails';
import {t} from 'i18next';
import CompanyDetails from '../../SpecialCycle/CompanyDetails';
import About from '../../SpecialCycle/About';
import Share from 'react-native-share';
import {shareOptions} from '../../App';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function SpectialStack({}) {
  return (
    <Stack.Navigator
      screenOptions={{headerShadowVisible: false}}
      initialRouteName="ServiceProviderDetails">
      <Stack.Screen
        name="SpecialServices"
        component={SpecialService}
        options={({navigation, route}) => ({
          headerShown: false,

          headerRight: () => (
            <PopUpMenu
              optionsContainerStyle={{
                width: 200,
                padding: 10,
                marginTop: 30,
                alignSelf: 'flex-start',
              }}
              content={[
                // {
                //   text: t('joinAsServiceProvider'),
                //   uri: require('../../../assets/serviceProviderIcon.png'),
                //   onSelect: () => console.log('join as a service porvider'),
                // },
                {
                  text: t('share'),
                  uri: require('../../../assets/shareIcon.png'),
                  onSelect: () => Share.open(shareOptions),
                },
              ]}
            />
          ),
        })}
        // })}
      />
      <Stack.Screen
        name="ServiceProviderDetails"
        component={ServiceProviderDetails}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="CompanyDetails"
        component={CompanyDetails}
        options={{
          headerShown: false,
          headerRight: () => (
            <PopUpMenu
              optionsContainerStyle={{
                width: 150,
                marginTop: 30,
                alignSelf: 'flex-start',
              }}
              content={[
                {
                  text: t('save'),
                  uri: require('../../../assets/saveIcon.png'),
                  onSelect: () => console.log('save'),
                },
                {
                  text: t('share'),
                  uri: require('../../../assets/shareIcon.png'),
                  onSelect: () => console.log('share'),
                },
                {
                  text: t('report'),
                  uri: require('../../../assets/reportIcon.png'),
                  onSelect: () => console.log('report'),
                },
              ]}
            />
          ),
        }}
        // })}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SpectialStack;
