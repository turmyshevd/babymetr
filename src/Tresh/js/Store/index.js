// src/js/store/index.js
import { createStore } from "react-redux";
import rootReducer from "./index";
const store = createStore(rootReducer);
export default store;