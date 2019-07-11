import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

// import the different screens

import Loading from './src/Loading'
import SignUp from './src/SignUp'
import Login from './src/Login'
import Main from './src/Main'
import Graph from './src/Graph'
import Add from './src/Add'
import addChild from './src/AddChild'

// create our app's navigation stack
const RootStack = createSwitchNavigator(
  
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    Main: Main,
    Graph: Graph,
    Add: Add,
    addChild: addChild,
  },
  {
    initialRouteName: 'Loading',
    },
);
  
const Stack = createAppContainer(RootStack);
export default Stack;