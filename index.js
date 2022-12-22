/**
 * @format
 */
import './src/i18n/index';
import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {ModalPortal} from 'react-native-modals';
import {store, persistor} from './src/redux/store/store';
// import at the very top of everything.
// import "./ignoreWarnings";
import {PersistGate} from 'redux-persist/integration/react';

const Wrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ModalPortal />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Wrapper);
