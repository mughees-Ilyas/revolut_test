import {
    FX_RATE,
    FX_RATE_FAIL,
    FX_RATE_SUCCESS
} from '../actions/fxRate.actions';

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {

      case FX_RATE:
          return {
              ...state,
              loading: true,
              loaded: false,
              data: null,
              error: null,
          };

      case FX_RATE_SUCCESS:
          return {
              ...state,
              loading: false,
              loaded: true,
              error: null,
              data: action.data
          };

      case FX_RATE_FAIL:
          return {
              ...state,
              loading: false,
              loaded: true,
              data: null,
              error: action.ex
          };

    default:
      return state
  }
}
