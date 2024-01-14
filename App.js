import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './src/navigation/StackNavigator'
import {Provider} from 'react-redux'
import store from './store'

export default function App() {
  return (
    <>
    <Provider store={store}>
    <StackNavigator/>
    </Provider>
      
    </>
  )
}

const styles = StyleSheet.create({})