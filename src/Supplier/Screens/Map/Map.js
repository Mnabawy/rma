import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Text,
  I18nManager,
  StatusBar,
  Dimensions,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
// import {t} from '../../i18n';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';
import Button from '../../../components/button/Button';
import {IMAGES, normalize} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../../../utils/config';
import * as Icon from 'phosphor-react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {setAddress} from '../../redux/actions';
import axios from 'axios';
import {t} from 'i18next';
const longitudeDelta = 0.25;
const latitudeDelta = 0.25;
import {COLORS} from '../../../utils/colors';
import CustomProgress from '../../../components/Progress/Progress';
import {useLanguage} from '../../../utils/useLanguage';

const width = Dimensions.get('screen').width;

const Map = ({navigation, route}) => {
  const {selectedLanguage} = useLanguage();
  // const dispatch = useDispatch();
  console.log('map supplier');
  const lang = selectedLanguage;
  // useSelector(state => state.langState.locale);
  // const addresTest = useSelector(state => state.addressState.address);

  const from = 'verify';
  // const from = route?.params?.from;
  const isLocation = route?.params?.isLocation;
  const isEdit = route?.params?.isEdit;
  const item_from_select_address = route?.params?.item_from_select_address;

  const initialLocation = isLocation
    ? {
        // latitude: isLocation?.lat,
        latitude: '37.78825',
        // longitude: isLocation?.lng,
        longitude: '-122.4324',
        longitudeDelta,
        latitudeDelta,
      }
    : null;

  const [region, setRegion] = useState(initialLocation); // my current location
  const [loading, setLoading] = useState(false);

  const watchId = useRef(null);
  const mapRef = useRef(null);

  const track = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        watchId.current = Geolocation.getCurrentPosition(
          async ({coords}) => {
            console.log('newCoords', coords);
            setRegion({
              latitude: coords.latitude,
              longitude: coords.longitude,
              longitudeDelta,
              latitudeDelta,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          //maximumAge: 10,
          {
            enableHighAccuracy: true,
            timeout: 20000,
            distanceFilter: 10,
            showsBackgroundLocationIndicator: true,
          },
        );
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log({granted});
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("You can use the location");
          watchId.current = Geolocation.getCurrentPosition(
            async ({coords}) => {
              // console.log('newCoords', coords);
              setRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                longitudeDelta,
                latitudeDelta,
              });
            },
            error => {
              console.log(error.code, error.message);
            },
            //maximumAge: 10,
            {
              enableHighAccuracy: true,
              timeout: 20000,
              distanceFilter: 10,
              showsBackgroundLocationIndicator: true,
            },
          );
        } else {
          console.log('location permission denied');
        }
      } catch (error) {
        console.log({error});
      }
    }
  };
  //Mount && unmount trackLocation listner
  useEffect(() => {
    if (isLocation == null) track();
  }, []);

  //animte to new region
  useEffect(() => {
    if (region) {
      const newCamera = {
        center: {
          latitude: region?.latitude,
          longitude: region?.longitude,
        },
        zoom: 15,
        heading: 1,
        pitch: 1,
        altitude: 1,
      };
      setTimeout(() => {
        mapRef?.current?.animateCamera(newCamera, {duration: 1000});
      }, 500);
    }
  }, [region]);

  const getCurrentLocation = () => {
    track();
  };

  const getAddressName = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_APIKEY}&latlng=${
        region?.latitude
      },${region?.longitude}&sensor=${true}&language=${lang}`,
    );
    console.log({res});
    let address = {
      lat: region?.latitude,
      lng: region?.longitude,
      addressName: res?.data?.results[0]?.formatted_address,
    };
    setLoading(false);
    return address;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <CustomProgress
        borderWidth={0}
        progress={1}
        color={COLORS.primary}
        width={width}
      />
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && (
          <View
            style={{
              width: '100%',
              height: 100, // For all devices, even X, XS Max
              position: 'absolute',
              top: normalize(-20),
              left: 0,
              backgroundColor: COLORS.primary,
            }}
          />
        )}
        <StatusBar
          backgroundColor={COLORS.white}
          barStyle="dark-content"
          animated
        />

        {/* <LinearGradient
        colors={[
          '#fff',
          '#fff',
          '#fff',
          '#ffffff90',
          '#ffffff80',
          '#ffffff50',
          '#ffffff00',
        ]}
        style={styles.linearGradient}
      /> */}

        <View style={styles.titleContainer}>
          {from != 'verify' && (
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <Image
                source={require('../../../../assets/left.png')}
                style={[
                  styles.currentMarker,
                  {
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  },
                ]}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.title_txt}>{t('selectLocation')}</Text>
        </View>

        <GooglePlacesAutocomplete
          placeholder={t('searchhere')}
          // currentLocation={true}
          returnKeyType={'search'}
          fetchDetails={true}
          renderLeftButton={() => {
            return (
              <Icon.MagnifyingGlass
                color={COLORS.black}
                weight="bold"
                size={normalize(22)}
              />
            );
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            if (details) {
              setRegion({
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                longitudeDelta,
                latitudeDelta,
              });
            }
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'ar',
          }}
          styles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              //backgroundColor: 'red',
              zIndex: 1,
              position: 'absolute',
              width: '100%',
              // top: heightPercentageToDP(10),
              backgroundColor: 'white',
              paddingVertical: 30,
            },
            textInputContainer: {
              paddingHorizontal: 8,
              height: 55,
              borderRadius: 10,
              marginHorizontal: 16,
              borderWidth: 1,
              borderColor: COLORS.garay,
              backgroundColor: '#fff',
              alignItems: 'center',
            },
            textInput: {},
            listView: {
              maxHeight: heightPercentageToDP(25),
            },
          }}
        />

        {region && (
          <MapView
            style={styles.map}
            ref={mapRef}
            provider={PROVIDER_DEFAULT}
            initialRegion={region}
            followUserLocation={true}
            showsCompass={false}
            showsMyLocationButton={false}
            onPress={event => {
              setRegion({
                latitude: event.nativeEvent.coordinate?.latitude,
                longitude: event.nativeEvent.coordinate?.longitude,
                longitudeDelta,
                latitudeDelta,
              });
            }}>
            <Marker
              coordinate={{
                latitude: region?.latitude,
                longitude: region?.longitude,
              }}
              title={t('currentlocation')}
              description={t('userscurrentlocation')}>
              <Image
                source={require('../../../../assets/marker.png')}
                style={styles.currentMarker}
              />
            </Marker>
          </MapView>
        )}

        {/**FOOTER */}

        <View style={[styles.footer]}>
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              style={styles.gps_container}
              onPress={getCurrentLocation}>
              <Image
                source={require('../../../../assets/gps.png')}
                style={styles.gps}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.8}}>
            <Button
              text="Done"
              // style={styles.btn}
              // loading={loading}
              onPress={async () => {
                let address = await getAddressName();
                // set location
                // if (from == 'verify') {
                //   //
                //   // dispatch(setAddress(await getAddressName()));
                //   navigation.replace('Drawer');
                // // }
                // if (from == 'address') {
                //   let addressLocation = await getAddressName();
                //   navigation.navigate('AddNewAddress', {
                //     addressLocation,
                //     isEdit,
                //     item_from_select_address: item_from_select_address,
                //   });
                // } else navigation.pop();
                console.log(address);
                navigation.navigate('SuccessSupplier');
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Map;
