import { FETCH_PRODUCTS } from '../constants/products';
import { resolve, reject } from 'redux-simple-promise';

const initialState = {
  loadedProducts: [],
  currentProduct: false,
  fetching: true,
  page: 0,
  error: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        fetching: true
      }
    case resolve(FETCH_PRODUCTS):
      return {
        ...state,
        fetching: false,
        page: action.meta ? action.meta.page : 0,
        loadedProducts: state.loadedProducts.concat(action.payload.p)
      }
    case reject(FETCH_PRODUCTS):
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state;
  }
}
