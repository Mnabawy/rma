import React, {useEffect, useRef, useState} from 'react';

import Navigation from './Navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './Navigation/Authentication';
import {MenuProvider} from 'react-native-popup-menu';
import Geolocation from 'react-native-geolocation-service';
import useCurrentLocation from './utils/useCurrentLocation';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import {LogBox} from 'react-native';
import {GOOGLE_MAPS_APIKEY} from './utils/config';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import NoInternetScreen from './screens/NoInternetScreen/NoInternetScreen';
import * as authActions from './redux/actions/auth';

LogBox.ignoreAllLogs();
export const shareOptions = {
  title: 'Share via',
  message: 'CRMA App ',
  url: 'https://play.google.com/store/apps/details?id=com.app.com.khadmatna',
  social: Share.Social.WHATSAPP,
  whatsAppNumber: '9199999999', // country code + phone number
  filename: 'test', // only for base64 file in Android
};

const INITIAL_REGION = {
  latitude: 24.746108,
  longitude: 46.662327,
  latitudeDelta: 0.5,
  longitudeDelta: 0.4,
};

const App = () => {
  console.log('APP COMPONENT');
  const watchId = useRef(null);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(INITIAL_REGION);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const go_to_home = useSelector(state => state.goToHome.go_to_home);
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const [networkState, setNetworkState] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        setNetworkState(true);
      } else {
        if (state.isInternetReachable != null) setNetworkState(false);
      }
    });

    // Unsubscribe
    return unsubscribe;
  }, [NetInfo.useNetInfo().isConnected]);
  const dispatch = useDispatch();
  useEffect(() => {
    // track();
    if (go_to_home) {
      dispatch(authActions.login());
    }
  }, []);
  if (networkState) {
    return (
      <MenuProvider>
        <NavigationContainer>
          {!isLoggedIn ? <Auth /> : <Navigation />}
        </NavigationContainer>
      </MenuProvider>
    );
  } else {
    return <NoInternetScreen networkState={networkState} />;
  }
};

export default App;
