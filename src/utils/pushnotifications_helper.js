import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function getFCMToken() {
  let fcmtoken = AsyncStorage.getItem('fcmtoken');
  if (fcmtoken) {
    try {
      let fcmtoken = messaging().getToken();
    } catch (error) {
      console.log('fcm token err', error);
    }
  } else {
  }
}
