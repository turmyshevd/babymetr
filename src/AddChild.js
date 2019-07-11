import React, { Component } from 'react';
import {
  View, Image, Text, StyleSheet, Dimensions,
} from "react-native";
import Header from '../components/Header';

const backgroundColor = "#367be2";
const { width, height } = Dimensions.get("window");

export default class addChild extends Component {
  render() {
    return (
      <View>
        <View style={styles.container} pointEvents="none">
          <Header />
          <Text style={styles.title}>What is the target weight (kg) that you would like to reach?</Text>
          <Text style={styles.subtitle}>Drag the bubble  to set your target weight</Text>
        </View>
        <Image
          style={{
            width: 100, height: 100, resizeMode: "contain", alignSelf: "flex-end", marginRight: 16,
          }}
          source={require("../assets/pinch.png")}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor,
  },
  title: {
    color: "white",
    fontSize: 24,
    width: 300,
    textAlign: "center",
  },
  subtitle: {
    width: 150,
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  cursor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'white',
  },
});
