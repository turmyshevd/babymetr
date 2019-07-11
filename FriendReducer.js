import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: [
    'Allie',
    'Gator',
  ],
  base: [  { date: 1, value: 0 },
    { date: 2, value: 0 },
    { date: 3, value: 200 },
    { date: 4, value: 200 },],
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_FRIEND':

    state.base = action.payload


    return state

    case 'read':


    return [...state, action.payload]
    
    default:
      return state;
  }
};

export default combineReducers({
  friends: friendReducer,
});
