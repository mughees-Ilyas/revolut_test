import React from "react";
import Navigation from "./core/Navigation";
import { Provider } from 'react-redux'
import configureStore from '../src/core/Redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';


export default () => {
  return (
  <Provider store={configureStore()}>
      <Navigation />
  </Provider>
  );
};
