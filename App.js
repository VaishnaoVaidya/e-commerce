import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import {ModalPortal} from 'react-native-modals';
import {Provider} from 'react-redux';
import store from './store';
import {UserContext} from './src/context/UserContext';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
