// react library imports
import { combineReducers } from 'redux';
import fxRateReducer from './fxRates/reducers/fxRate.reducer'

const rootReducer = combineReducers(
  {
      fxRateReducer
  }
);

export default rootReducer;
