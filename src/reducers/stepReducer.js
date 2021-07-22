import { GET_STEPS } from '../actions/type';

const steps = {
  1: {
    title: {
      default: '選擇付款方式',
    },
    value: 'choose-pay-method',
  },
  2: {
    title: {
      default: '填寫付款資訊',
    },
    value: 'fill-in-info',
  },
  3: {
    title: {
      default: '您的訂單已完成付款！',
      store: '您的訂單已成立！',
    },
    value: 'finish',
  },
};

export default function stepReducer(state = {}, action) {
  switch (action.type) {
    case GET_STEPS:
      return steps;
    default:
      return state;
  }
}