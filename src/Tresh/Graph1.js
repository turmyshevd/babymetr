// @flow
import React from 'react';
import {
  StyleSheet, View, SafeAreaView, Dimensions, Animated, TextInput, Button
} from 'react-native';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import firebase from 'react-native-firebase';
import Header from '../components/Header'

import { applyMiddleware, createStore, combineReducers } from 'redux'
import { connect } from "react-redux";

const INITIAL_STATE = 0


const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {

    case 'add':
      return  action.payload

      case 'read':
      return [state.current]
    default:
      return state;
  }
  }

  const store = createStore(reducer);

console.log(store.getState())

const d3 = {
  shape,
};

import {
  scaleTime,
  scaleLinear,
  scaleQuantile
} from 'd3-scale';

const base = firebase.database().ref().child('tables/growth/norm');


const height = 200;
const width = Dimensions.get('window').width;
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;


const scaleX = scaleTime().domain([0, 24]).range([0, width]);
const scaleY = scaleLinear().domain([2.4, 9.2]).range([height - verticalPadding, verticalPadding]);
const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
      lineL: 0,
      line1: 'M0,195L2.875,191.27450980392155C5.75,187.54901960784312,11.5,180.09803921568627,17.25,172.6470588235294C23,165.1960784313725,28.75,157.74509803921566,34.5,151.22549019607843C40.25,144.7058823529412,46,139.11764705882354,51.75,133.99509803921566C57.5,128.87254901960785,63.25,124.21568627450979,69,120.02450980392156C74.75,115.83333333333331,80.5,112.10784313725487,86.25,108.84803921568626C92,105.58823529411762,97.75,102.7941176470588,103.5,99.99999999999999C109.25,97.20588235294116,115,94.41176470588233,120.75,92.08333333333333C126.5,89.75490196078431,132.25,87.89215686274508,138,85.56372549019608C143.75,83.23529411764706,149.5,80.44117647058823,155.25,78.11274509803921C161,75.78431372549018,166.75,73.92156862745095,172.5,72.05882352941175C178.25,70.19607843137253,184,68.33333333333333,189.75,66.93627450980391C195.5,65.53921568627452,201.25,64.6078431372549,207,63.21078431372549C212.75,61.81372549019607,218.5,59.95098039215683,224.25,58.0882352941176C230,56.22549019607839,235.75,54.36274509803918,241.5,52.499999999999964C247.25,50.63725490196075,253,48.77450980392154,258.75,47.377450980392126C264.5,45.98039215686271,270.25,45.049019607843114,276,43.6519607843137C281.75,42.25490196078429,287.5,40.392156862745075,293.25,38.52941176470586C299,36.66666666666665,304.75,34.80392156862744,310.5,33.40686274509803C316.25,32.00980392156862,322,31.078431372549005,327.75,29.68137254901959C333.5,28.284313725490176,339.25,26.421568627450956,345,24.558823529411743C350.75,22.69607843137253,356.5,20.833333333333325,362.25,19.43627450980391C368,18.039215686274492,373.75,17.10784313725487,379.5,15.710784313725455C385.25,14.31372549019604,391,12.450980392156831,396.75,10.588235294117624C402.5,8.725490196078416,408.25,6.862745098039208,411.125,5.931372549019604L414,5',
      x: new Animated.Value(0)
    }
  }
  
  static navigationOptions = {
    title: 'Main',
  };

  componentDidMount() {

    console.log(this.state.lineL)
    base.on('value', (data) => {
      var list = data.val();

      const line = d3.shape.line()
      .x(d => scaleX(d.x))
      .y(d => scaleY(d.y))
      .curve(d3.shape.curveBasis)(list);

      const properties = path.svgPathProperties(line);
      console.log(line)
      const  lineLength = properties.getTotalLength()
const action = {
  type: 'add',
  payload: line
}

store.dispatch(action)
console.log(this.state)
console.log(store.getState())


      this.setState({
        line1: line,
        lineL: lineLength,
        loading: false,
      });
      console.log(this.state)
      console.log(store.getState())
    });

    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);
  }

  cursor = React.createRef();
  label = React.createRef();

  moveCursor(value) {
    const properties = path.svgPathProperties(this.state.line1);
    const { x, y } = properties.getPointAtLength(store.getState() - value);
    this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    const label = scaleLabel(scaleY.invert(y));
    this.label.current.setNativeProps({ text: `${label} CHF` });
  }



  render() {
  
    const { navigate } = this.props.navigation;
    const { x } = this.state;
    const translateX = x.interpolate({
      inputRange: [0, this.state.lineL],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp',
    });
    return (
      <View flex={1}>
         <Header/>
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
            <Path d={this.state.line1} fill="transparent" stroke="#367be2" strokeWidth={5} />
            <Path d={`${this.state.line1} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
            <View ref={this.cursor} style={styles.cursor} />
          </Svg>
          <Animated.View style={[styles.label, { transform: [{ translateX }] }]}>
            <TextInput ref={this.label} />
          </Animated.View>
          <Animated.ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{ width: this.state.lineL * 2 }}
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
      <Button style={[styles.button]}
                        onPress={() =>navigate('Add')}
                        title="Add value"
                        accessibilityLabel="Learn more about this purple button"
                      />
      </View>
                      
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 2
  },
  button: {
    borderColor: '#367be2',
   // flex: 1,
    borderWidth: 3,
    color: 'white'
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
