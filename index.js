import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import createSagaMiddleware from '@redux-saga/core';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import rootReducer from './src/reducers';
import rootSaga from './src/sagas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import React from 'react';
import {defaultState} from './src/reducers/defaultState';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'turismo-gps-ibarra',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancer = compose(applyMiddleware(...[sagaMiddleware]));

const store = createStore(persistedReducer, defaultState, enhancer);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

const SFAPP = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => SFAPP);
