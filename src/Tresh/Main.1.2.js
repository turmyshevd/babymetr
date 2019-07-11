import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Icon, ListView, Tile, Text, Row, Divider, NavigationBar, Title, ImageBackground, View, Screen, TouchableOpacity } from '@shoutem/ui';
import firebase from 'react-native-firebase';
import {RkButton} from 'react-native-ui-kitten';


const base = firebase.database().ref().child('Main');

export default class MainStart extends Component {

  static navigationOptions = {
    title: 'Graph',
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      tables: [],
    }
  }

  componentDidMount(){
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
    return (
      <View>
        <TouchableHighlight onPress={() => navigate(table.link)}>
          <Row styleName="small">
            <Icon name= {table.icon} />
            <Text>{table.name}</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableHighlight>
        <Divider styleName="line" />
      </View>
    );
  }

  render() {
    const tables = this.state.tables;
    console.log(tables);
    return (
      <Screen>
        <NavigationBar
          title="BabyNorm"
          styleName="inline"
        />
        <ListView
          data={tables}
          renderRow={this.renderRow}
        />
           <View>
      <RkButton>Click me!</RkButton>
    </View>
      </Screen>
    );
  }
}