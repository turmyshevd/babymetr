import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import friendReducer from './FriendReducer';
import Stack from './Stack'

const store = createStore(friendReducer);



//В первой версии можно будет только смотреть нормы
//1. Отображать график как есть (норма)
//2. Навигация
//3. Пояснения
//
//
//
//
//
//
//
//


export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
       <Stack/>
      </Provider>
    );
  }
}
