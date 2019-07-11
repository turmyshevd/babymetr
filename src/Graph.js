import React, { Component } from 'react'
import { StyleSheet, View, Button, Text } from "react-native";
import firebase from 'react-native-firebase';
import Graph from "../components/Graph";
import { bindActionCreators } from 'redux';

const base = firebase.database().ref().child('tables/growth/normm');

import { addFriend, read } from '../FriendActions'

import { applyMiddleware, createStore, combineReducers } from 'redux'
import { connect } from "react-redux";

import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';



const dt = {
  norm : [
  { date: 0, value: 2.4 },
  { date: 30, value: 3.2 },
  { date: 60, value: 4 },
  { date: 90, value: 4.6 },
  { date: 120, value: 6.3 },
  { date: 150, value: 6.8 },
  { date: 180, value: 7.3 },
  { date: 210, value: 7.7 },
]};


class GraphL extends React.PureComponent<OverlaysProps> {
  static navigationOptions = {
    title: 'Add'
  };
  constructor(props) {
    super(props);
    this.state = {
      datl: [ { date: 0, value: 2.4 },
        { date: 30, value: 3.2 },
        { date: 60, value: 4 },
        { date: 90, value: 4.6 },
        { date: 120, value: 6.3 },]
    }
  }


 /* componentDidMount() {
    base.on('value', (data) => {
      var list = data.val();
      console.log(this.state.datl)
      this.setState( {
        loading: false,
        datl: list,
      })
      console.log(this.state.datl)
    });
  }*/



  render() {
    console.log(this.props.friends.base)
    console.log(dat)
   // const dat = this.state.datl
    console.log(dat)
    const dat = dt
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Header />
   <View style={styles.container}>
      <Graph { ...{dat}} />
    </View>
    <Button style={[styles.button]}
                        onPress={() =>navigate('Add')}
                        title="Add"
                      />
    </View>
    );
    
  }
  
}


const styles = StyleSheet.create({
  container: {
//    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFriend,
  },
   dispatch)
);

/*{
  this.props.friends.possible.map((friend, index) => (
    <Button
      key={ friend }
      title={ `Add ${ friend }` }
      onPress={() =>
        this.setState({
          datl: datal,
          loading: false,
        })
      }
      
    />
  )
)
}
      {
  this.props.friends.possible.map((friend, index) => (
    <Button
      key={ friend }
      title={ `Add ${ friend }` }
      onPress={() => navigate('Add')} 
    />
  )
)
}*/

export default connect(mapStateToProps, mapDispatchToProps)(GraphL);