import { useEffect, useState } from 'react';
import {Dimensions, Keyboard} from 'react-native';

export const widthDevice = Dimensions.get('window').width;
export const heightDevice = Dimensions.get('window').height;

export * from './colors';
export * from './normalize';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e) {
    // Remove type here if not using TypeScript
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
};

// export const keyboardHeight = useKeyboard();
