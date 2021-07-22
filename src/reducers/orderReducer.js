import { GET_ORDER } from '../actions/type';

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDER:
      return action.payload;
    default:
      return state;
  }
}