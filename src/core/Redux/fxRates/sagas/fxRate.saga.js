import {
    FX_RATE,
    FX_RATE_FAIL,
    FX_RATE_SUCCESS
} from '../actions/fxRate.actions';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { environment } from '../../../../environment'

function fetchData(payload) {
    let url = environment.API_URL+"latest?base="+ payload.currency;
    if (payload.conversionRate){
        url = url + "&&symbols="+payload.conversionRate;
    }
    return  fetch(url)
        .then(res => res.json() )
        .then(data => ({ data }) )
        .catch(ex => {
            console.log('parsing failed', ex);
            return ({ ex });
        });
}

function* fxrate(payload) {
    const { data, ex } = yield call(fetchData,payload);
    if (data)
        yield put({ type:FX_RATE_SUCCESS, data });
    else
        yield put({ type:FX_RATE_FAIL, ex });
}

function* watchInvite() {
    yield takeLatest(FX_RATE, fxrate)
}

export default function* fxRateSaga() {
  yield all([
    watchInvite()
  ]);
}
