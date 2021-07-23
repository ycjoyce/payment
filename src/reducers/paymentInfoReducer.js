import { SET_PAYMENT_INFO } from '../actions/type';

export default function paymentInfoReducer(state = {}, action) {
  switch (action.type) {
    case SET_PAYMENT_INFO:
      return action.payload;
    default:
      return state;
  }
}