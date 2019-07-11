import React, { Component, } from 'react';
import {TouchableHighlight, Text, TouchableOpacity, Button} from 'react-native'
import { Container,  Right, Icon, Card, CardItem, Content } from 'native-base';
import firebase from 'react-native-firebase';
import Header from '../components/Header';
import {createSwitchNavigator, navigationOptions, StatusBar, createStackNavigator, createAppContainer} from 'react-navigation';



const base = firebase.database().ref().child('Main');

export default class Main extends Component {
  //Navigation thrue the screens

  static navigationOptions = {
    title: 'Graph',
    title: 'addChild'
  };

  //Creating 
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      tables: [],
    }
  }

  componentDidMount() {
    base.on('value', (data) => {
      var list = data.val();
      this.setState({
        tables: list,
        loading: false,
      });
    });
  }

  renderRow(table) {
    const { navigate } = this.props.navigation;
    console.log(tables);
    return (
      { tables }
    );
  }

  

  render() {

    const tables = this.state.tables;
    const { navigate } = this.props.navigation;
    console.log(tables);
    return (
      <Container>

<Header/>
        <Content>
        <Card>
        <CardItem header bordered>
              <Text>Физические данные ребенка</Text>
            </CardItem>
            </Card>
            
          <Card dataArray={tables}
            renderRow={(item) =>
              <TouchableHighlight onPress={() => navigate('Graph')}>
              <CardItem footer bordered>
                <Text>{item.name}</Text>
                <Right style={{flex:1}}>
                  <Icon name="arrow-forward"/>
                </Right>
              </CardItem>
              </TouchableHighlight>
            }>
          </Card>

        </Content>
      </Container>
    );
  }
}
/*
<Button
title={ `Add child` }
onPress={() => navigate('addChild')} 
/>*/