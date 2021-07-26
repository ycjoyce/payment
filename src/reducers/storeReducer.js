import { GET_STORES } from '../actions/type';

const storeMap = {
  '7-11': '7-11',
  'fami-mart': '全家',
  'hi-life': '萊爾富',
  'ok-mart': 'OK mart',
};

export default function storeReducer(state = {}, action) {
  switch (action.type) {
    case GET_STORES :
      return storeMap;
    default:
      return state;
  }
}