import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';
import firebase from 'react-native-firebase';


const base = firebase.database().ref().child('masterSheet2');

export default class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableData: [],
      loading: false,
    }
  }

  componentDidMount(){
    base.on('value', (data) => {
      var scores = data.val();
      var keys = Object.keys(scores);a
     
      for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        var initials = scores[k].initials;
        var score = scores[k].score;
        var arr = arr + scores[i]
        console.log(arr);
      }

      this.setState({
        tableHead: scores[0],
        tableData: [scores[1], scores[2], scores[3], scores[4], scores[5], scores[6],
    ],
    loading: false,
      });
    });
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});