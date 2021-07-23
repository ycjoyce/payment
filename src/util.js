// export function validateEmail (email) {
//     const rule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
//     return rule.test(email);
// }

export function validateCardNum(cardNum) {
    if (cardNum.length < 16 || Number.isNaN(+cardNum)) {
        return false;
    }
  
    const newCardNum = cardNum.split('').map((num, idx) => (
        (idx + 1) % 2 === 0 ? +num : +num * 2
    )).map((num) => (
        num > 9 ? `${num}`.split('').map((n) => +n) : num
    )).flat().reduce((a, e) => a + e, 0);
  
    return newCardNum % 10 === 0;
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
