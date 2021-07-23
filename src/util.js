import ErrMsg from './components/controllers/ErrMsg';

export function validateEmail(email) {
	if (!email) {
		return { status: false, msg: '請填寫付款人Email' };
	}
	const rule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
	if (rule.test(email)) {
		return { status: true };
	}
	return { status: false, msg: '請填寫正確Email' };
}

export function validateCardNum(cardNum) {
	if (!cardNum) {
		return { status: false, msg: '請填寫信用卡號' };
	}

	const errMsg = { status: false, msg: '請填寫正確信用卡號' };

	if (cardNum.length < 16 || Number.isNaN(+cardNum)) {
		return errMsg;
	}

	const newCardNum = cardNum.split('').map((num, idx) => (
			(idx + 1) % 2 === 0 ? +num : +num * 2
	)).map((num) => (
			num > 9 ? `${num}`.split('').map((n) => +n) : num
	)).flat().reduce((a, e) => a + e, 0);

	const result = newCardNum % 10 === 0;

	if (result) {
		return { status: true };
	}
	return errMsg;
}

export function validateExpiration(expiration) {
  if (!expiration) {
    return { status: false, msg: '請選擇有效年月' };
  }
  const { year, month } = expiration;
  if (!year) {
    return { status: false, msg: '請選擇有效年' };
  }
  if (!month) {
    return { status: false, msg: '請選擇有效月' };
  }
  return { status: true };
}

export function validateSafeCode(code) {
  if (!code) {
    return { status: false, msg: '請填寫背面末三碼' };
  }
  if (Number.isNaN(+code) || code.length < 3) {
    return { status: false, msg: '請填寫正確背面末三碼' };
  }
  return { status: true };
}

export function renderErrMsg({ meta: { error, touched }, rootEl }) {
	if (error && touched) {
		return (
			<ErrMsg rootEl={rootEl}>
				{error}
			</ErrMsg>
		);
	}
	return null;
}

// export function validCheckBeforeSubmit (err) {
//     const newErr = err.slice();
//     if (!this.state.confirmCheck) {
//         setStateWithData.call(this, {
//             unvalid: { confirmCheck: true },
//         });
//         newErr.push('confirm-check');
//     }
//     if (!validateEmail(this.state.email)) {
//         setStateWithData.call(this, {
//             unvalid: { email: true },
//         });
//         newErr.push('email');
//     }
//     if (newErr.length > 0) {
//         return;
//     }
//     this.handleChangeStep('next');
// }
// 
// export function setStateWithData(data) {
//     for (let col in data) {
//         if (!{}.hasOwnProperty.call(data, col)) {
//             continue;
//         }
//         if ({}.toString.call(data[col]) === '[object Object]') {
//             this.setState((state) => ({
//                 [col]: {
//                     ...state[col],
//                     ...data[col],
//                 },
//             }));
//             continue;
//         }
//         this.setState({ [col]: data[col] });
//     }
// }
