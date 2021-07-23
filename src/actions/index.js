import {
	GET_ORDER,
	GET_STEPS,
	SET_CUR_STEP,
	SET_PAYMENT_INFO,
} from './type';

export const getOrder = () => {
  // Fake Data
  return {
    type: GET_ORDER,
    payload: [
			{
				title: '商品名稱',
				content: 'Iphone XR 手機殼 x 1',
			},
			{
				title: '訂單編號',
				content: '17485739',
			},
			{
				title: '訂單金額',
				content: 'NT$ 600',
			}
		],
  };
};

export const getSteps = () => {
	return { type: GET_STEPS };
};

export const setCurStep = (step) => {
	return {
		type: SET_CUR_STEP,
		payload: step,
	};
};

export const setPaymentInfo = (info) => {
	return {
		type: SET_PAYMENT_INFO,
		payload: info,
	};
};