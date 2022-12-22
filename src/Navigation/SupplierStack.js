import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SupplierHome from '../Supplier/Screens/Home/SupplierHome';
import ProviderDetails from '../Supplier/Screens/ServiceProviderDetails/ServiceProviderDetails';

const Stack = createNativeStackNavigator();

function SupplierStack() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen name="SupplierHome" component={SupplierHome} />
      <Stack.Screen
        name="ProviderDetails"
        component={ProviderDetails}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}

export default SupplierStack;
