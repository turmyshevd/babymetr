// @flow
import React from 'react';
import {
  StyleSheet, View, SafeAreaView, Dimensions, Animated, TextInput
} from 'react-native';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';

import * as getdata from './getdata'


//GET DATA NEED REFACTORING
//GET DATA NEED REFACTORING
//GET DATA NEED REFACTORING

import firebase from 'react-native-firebase';

const base = firebase.database().ref().child('tables/growth/norm');

import { applyMiddleware, createStore, combineReducers } from 'redux'

const INITIAL_STATE = 0


const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {

    case 'add':
      return  state = action.payload

      case 'read':
      return [...state, action.payload]
    default:
      return action.payload;
  }
  }

  const store = createStore(reducer);


base.on('value', (data) => {
  var list = data.val();

const action = {
type: 'add',
payload: 111
}

store.dispatch(action)

console.log(store.getState())
});

console.log(store.getState())

//GET DATA NEED REFACTORING
//GET DATA NEED REFACTORING
//GET DATA NEED REFACTORING


const d3 = {
  shape,
};

import {
  scaleTime,
  scaleLinear,
  scaleQuantile
} from 'd3-scale';

const height = 200;
const width = Dimensions.get('window').width;
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;

const dataL = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 0 },
  { x: new Date(2018, 9, 17), y: 200 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 5), y: 300 },
];

const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 5)]).range([0, width]);
const scaleY = scaleLinear().domain([0, 300]).range([height - verticalPadding, verticalPadding]);
const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);



console.log(store.getState())

const line = d3.shape.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(store.getState());

  console.log(line);

const properties = path.svgPathProperties(line);
const lineLength = properties.getTotalLength();

export default class App extends React.Component {
  cursor = React.createRef();
  label = React.createRef();
  state = {
    x: new Animated.Value(0),
  };

  moveCursor(value) {
    const { x, y } = properties.getPointAtLength(lineLength - value);
    this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    const label = scaleLabel(scaleY.invert(y));
    this.label.current.setNativeProps({ text: `${label} CHF` });
  }

  componentDidMount() {
    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);
  }

  render() {
    const { x } = this.state;
    const translateX = x.interpolate({
      inputRange: [0, lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp',
    });
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Svg {...{ width, height }}>
            <Defs>
              <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                <Stop stopColor="#CDE3F8" offset="0%" />
                <Stop stopColor="#eef6fd" offset="80%" />
                <Stop stopColor="#FEFFFF" offset="100%" />
              </LinearGradient>
            </Defs>
            <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={5} />
            <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
            <View ref={this.cursor} style={styles.cursor} />
          </Svg>
          <Animated.View style={[styles.label, { transform: [{ translateX }] }]}>
            <TextInput ref={this.label} />
          </Animated.View>
          <Animated.ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{ width: lineLength * 2 }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
            horizontal
          />
        </View>
      </SafeAreaView>
    );
  }
}
console.log(line);
console.log(data);

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    marginTop: 60,
    height,
    width
  },
  cursor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -45,
    left: 0,
    backgroundColor: 'lightgray',
    width: labelWidth,
  },
});
