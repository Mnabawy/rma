import React from 'react';
import BottomTabs from '../Navigation/User/BottomTabs';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS} from '../utils';
import CustomDrawerContent from './CustomDrawerContent';
import {USER} from '../redux/actions/types';
import {useSelector} from 'react-redux';
import SupplierStack from './Supplier/SupplierStack';
import {useLanguage} from '../utils/useLanguage';

const Drawer = createDrawerNavigator();

const DrawerNavigation = props => {
  const {selectedLanguage, onChageLanguage} = useLanguage();
  const userType = useSelector(state => state.auth.userType);

  console.log('userType: ', userType);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      useLegacyImplementation
      screenOptions={{
        drawerPosition: selectedLanguage === 'en' ? 'left' : 'right',
        drawerStyle: {
          width: '90%',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {userType === USER ? (
        <Drawer.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false, drawerItemStyle: {height: 0}}}
        />
      ) : (
        <Drawer.Screen
          name="SupplierStack"
          component={SupplierStack}
          options={{headerShown: false, drawerItemStyle: {height: 0}}}
        />
      )}
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: COLORS.primary,
    height: 230,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  image: {},
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
  },
});
