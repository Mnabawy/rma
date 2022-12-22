import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('local notifications: ', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'my channel',
    channelDescription: 'a test descriotion',
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 1000,
  },
  create => console.log(`channel created ${create}`),
);

export const localNotification = () => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    channelName: 'my channel',
    autoCancel: true,
    bigText: 'this is local notifications demo',
    subText: 'local Notifications',
    title: 'local notifications title',
    message:'hey there',
    channelDescription: 'a test descriotion',
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 1000,
  });
};
