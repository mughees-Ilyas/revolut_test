
import { all } from 'redux-saga/effects'
import fxRateSaga from './fxRates/sagas/fxRate.saga.js'
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
      fxRateSaga()
  ])
}
