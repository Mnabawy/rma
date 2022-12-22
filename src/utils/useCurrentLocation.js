import {useState, useEffect} from 'react';
import {PermissionsAndroid, Alert, Linking, Platform} from 'react-native';
// import Geolocation from "@react-native-community/geolocation";
import Geolocation from 'react-native-geolocation-service';

const INITIAL_REGION = {
  latitude: 24.746108,
  longitude: 46.662327,
  latitudeDelta: 0.5,
  longitudeDelta: 0.4,
};

export default function useCurrentLocation() {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [hasCurrentLocation, setHasCurrentLocation] = useState(false);

  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      // Geolocation.requestAuthorization()
      let x = await Geolocation.requestAuthorization('whenInUse');
      console.log('permission', x);
      // if (x != 'granted') {
      //   Alert.alert(
      //     "Location",
      //     "Location permission denied\nGo to settings allow permission for location",
      //     [
      //       {
      //         text: "Cancel",
      //         onPress: () => console.log("Cancel Pressed"),
      //         style: "cancel"
      //       },
      //       { text: "OK", onPress: () => Linking.openURL('app-settings:/موجود')
      //     }
      //     ]
      //   );
      // }
      Geolocation.getCurrentPosition(
        async ({coords}) => {
          console.log(coords);
          setRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            longitudeDelta: 0.25,
            latitudeDelta: 0.25,
          });
          setHasCurrentLocation(true);
          console.log(coords);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setRegion({INITIAL_REGION});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("You can use the location");
          Geolocation.getCurrentPosition(
            async ({coords}) => {
              setRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                longitudeDelta: 0.25,
                latitudeDelta: 0.25,
              });
              setHasCurrentLocation(true);
              console.log(coords);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          alert('Location permission denied');
          requestLocationPermission();
          //  alert('Location permission denied')
          //  requestLocationPermission();
          // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        } else {
          alert('Go to settings allow permission for location');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return {
    region,
    setRegion,
    hasCurrentLocation,
    requestLocationPermission,
  };
}
