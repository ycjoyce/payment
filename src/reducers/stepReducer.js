import { GET_STEPS, SET_CUR_STEP } from '../actions/type';

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

export function stepReducer(state = {}, action) {
  switch (action.type) {
    case GET_STEPS:
      return steps;
    default:
      return state;
  }
}

export function curStepReducer(state = 1, action) {
  switch (action.type) {
    case SET_CUR_STEP:
      return action.payload;
    default:
      return state;
  }
}