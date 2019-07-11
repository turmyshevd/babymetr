import { combineReducers } from 'redux';

const INITIAL_STATE = {};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'add': return state
    default:
      return state
    
  }
};

export default combineReducers({
  data: dataReducer,
});