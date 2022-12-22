import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SearchResults from '../screens/SearchResults/SearchResults';
import Search from '../screens/SearchScreen/Search';
import AppartmentStack from '../Navigation/User/AppartmentStack';
import Drawer from './Drawer';
import DrawerStaticStack from './DrawerStaticStack';
import HomeStack from '../Navigation/User/HomeStack';
import SpectialStack from '../Navigation/User/SpectialStack';
import Notifications from '../Supplier/Screens/Notifications/Notifications';
import {t} from 'i18next';

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={Drawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpectialStack"
        component={SpectialStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppartmentStack"
        component={AppartmentStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerStaticStack"
        component={DrawerStaticStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShadowVisible: false,
          title: t('notification'),
          headerBackVisible: true,
        }}
      />
      {/* <Stack.Screen
        name="UserAuth"
        component={UserAuth}
        options={{headerShown: false, drawerItemStyle: {height: 0}}}
      /> */}
    </Stack.Navigator>
  );
}
