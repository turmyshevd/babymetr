import React from 'react'
import { ScrollView, StatusBar, Dimensions, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { LineChart } from 'react-native-chart-kit'
import 'babel-polyfill'
import { NavigationBar, Button, Icon } from '@shoutem/ui'
import firebase from 'react-native-firebase';

const base = firebase.database().ref().child('masterSheet2');

// in Expo - swipe left to see the following styling, or create your own
const chartConfigs = [
  {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  },
]

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Main',
    title: 'AddValue'
  };

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [{
        data: [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
      }, {
        data: []
      }],
      loading: false,
    }
  }

  componentDidMount() {
    base.on('value', (data) => {
      var scores = data.val();
      var keys = Object.keys(scores);

      this.setState({
        labels: scores[0],
        datasets: [{
          data: scores[1],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
        }, {
          data: scores[2]
        }],
        loading: false,
      });
    });
  }

  renderTabBar() {
    return <StatusBar hidden />
  }
  render() {
    const {navigate} = this.props.navigation;
    const width = Dimensions.get('window').width
    const height = 220
    return (
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {chartConfigs.map(chartConfig => {
          const labelStyle = {
            color: chartConfig.color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16
          }
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style
          }
          return (
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor
              }}
            >
              <NavigationBar
                hasHistory='true'
                navigateBack
                title="BabyNorm"
                styleName="inline"
              />
              <Text style={labelStyle}>Bezier Line Chart</Text>
              <LineChart
                data={this.state}
                width={width}
                height={height}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
              />
              <Button onPress={() => navigate('Main')}>
                <Icon name="add-event" />
                <Text>Назад</Text>
              </Button>
            </ScrollView>
          )
        })}
      </ScrollableTabView>
    )
  }
}