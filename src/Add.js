// @flow
import React from "react";
import {
  StatusBar, ActivityIndicator, StyleSheet, View,
} from "react-native";
//mport { Asset } from "expo";
import Header from '../components/Header'

import { WeightTarget } from "../components";

type AppState = {
  ready: boolean,
};


export default class App extends React.PureComponent<{}, AppState> {

  static navigationOptions = {
    title: 'Main',
  };
  state = {
    ready: false,
  };

  async componentDidMount() {
    const img = require("../assets/pinch.png");
   // await Asset.loadAsync(img);
    this.setState({ ready: true });
  }
 
  render() {
    const { navigate } = this.props.navigation;
    const { ready } = this.state;
    if (ready) {
      return (
        <React.Fragment>
                     <Header/>
          <StatusBar barStyle="light-content" />
          <WeightTarget weight={84} height={1.77} />
        </React.Fragment>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#367be2",
  },
});