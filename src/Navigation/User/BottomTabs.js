import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Special from '../../screens/Special/Special';
import Appartment from '../../../src/AppartmentCycle/screens/Appartment';
import Favored from '../../screens/Favored/Favored';
import {Image, Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../utils';
import HomeStack from './HomeStack';
import AppartmentStack from './AppartmentStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notifications from '../../Supplier/Screens/Notifications/Notifications';
import {t} from 'i18next';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// default style

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          paddingTop: 5,
        },
        tabBarActiveTintColor: COLORS.black,
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 10,
          fontFamily: 'Poppins-Regular',
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: t('home'),
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Image
                style={styles.icon}
                source={require('../../../assets/HomeIconColored.png')}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require('../../../assets/HomeIcon.png')}
              />
            ),
          tabBarActiveTintColor: COLORS.black,

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Special"
        component={Special}
        options={{
          title: t('special'),
          headerShown: false,
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Image
                style={styles.icon}
                source={require('../../../assets/SpectialIconColored.png')}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require('../../../assets/SpectialIcon.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="AppartmentStack"
        component={AppartmentStack}
        options={{
          headerShown: false,
          title: t('appointment'),
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Image
                style={styles.icon}
                source={require('../../../assets/AppartmentIconColored.png')}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require('../../../assets/AppartmentIcon.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Favored"
        component={Favored}
        options={{
          title: t('favored'),
          headerShown: false,
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Image
                style={styles.icon}
                source={require('../../../assets/FavoredIconColored.png')}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require('../../../assets/FavoredIcon.png')}
              />
            ),
        }}
      />

      {/* <Tab.Screen
        name="NestedNotification"
        component={() => <Stack.Navigator>
          <Stack.Screen name='Notifi' component={Notifications}/>
        </Stack.Navigator>}
      /> */}
    </Tab.Navigator>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
});
