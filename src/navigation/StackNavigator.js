import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: 'black'},
            headerShown: false,
            tabBarIcon: tabInfo => {
              return tabInfo.focused ? (
                <Image
                  source={require('../images/home.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#008E97',
                  }}
                />
              ) : (
                <Image
                  source={require('../images/home-outline.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'black',
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {color: 'black'},
            headerShown: false,
            tabBarIcon: tabInfo => {
              return tabInfo.focused ? (
                <Image
                  source={require('../images/user.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#008E97',
                  }}
                />
              ) : (
                <Image
                  source={require('../images/user-outline.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'black',
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {color: 'black'},
            headerShown: false,
            tabBarIcon: tabInfo => {
              return tabInfo.focused ? (
                <Image
                  source={require('../images/cart.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#008E97',
                  }}
                />
              ) : (
                <Image
                  source={require('../images/cart-outline.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'black',
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
