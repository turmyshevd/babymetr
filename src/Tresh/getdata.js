import firebase from 'react-native-firebase';

const base = firebase.database().ref().child('tables/growth/norm');
import {TouchableHighlight, Text, TouchableOpacity} from 'react-native'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { connect } from "react-redux";

const INITIAL_STATE = {data:[]}

const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {

    case 'add':
      return  {...state, data: action.payload}

      case 'read':
      return [...state, action.payload]
    default:
      return action.payload;
  }
  }

  const store = createStore(reducer);

console.log(store.getState())


base.once('value', (data) => {
  var list = data.val();

const action = {
type: 'add',
payload: list
}

store.dispatch(action)

console.log(store.getState())
});

console.log(store.getState())



const mapStateToProps = store => {
  console.log(store) // посмотрим, что же у нас в store?
  return {
    user: store.user,
  }
}

export default connect(mapStateToProps)(App)
