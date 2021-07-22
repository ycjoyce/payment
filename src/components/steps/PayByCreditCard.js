import { Component } from 'react';
import { reduxForm } from 'redux-form';
import Layout from '../Layout';
import InstallmentCtrler from '../controllers/InstallmentCtrler';
import CardNumCtrler from '../controllers/CardNumCtrler';

class PayByCreditCard extends Component {
  onSubmit(data) {
    console.log(data);
  }

  render() {
    return (
      <Layout curPage={this.props.match.path}>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <InstallmentCtrler className="mb-4" />
          <CardNumCtrler />
          <button>Submit</button>
        </form>
      </Layout>
    );
  }
}

function validateCardNum (cardNum) {
  if (cardNum.length < 16) {
      return false;
  }

  const newCardNum = cardNum.split('').map((num, index) => (
      (index + 1) % 2 === 0 ? +num : +num * 2
  )).map((num) => (
      num > 9 ? `${num}`.split('').map((n) => +n) : num
  )).flat().reduce((a, e) => a + e, 0);

  return newCardNum % 10 === 0;
}

function validate(formValues) {
  const error = {};
  const { cardNum1, cardNum2, cardNum3, cardNum4 } = formValues;
  const cardNum = [ cardNum1, cardNum2, cardNum3, cardNum4 ];

  if (!formValues.installment) {
    error.installment = '請選擇付款方式';
  }

  // if (cardNum.filter((num) => num).length < 4) {
  //   error.
  // }

  return error;
}

const formWrapped = reduxForm({
  form: 'PayByCreditCard',
  validate,
})(PayByCreditCard);

export default formWrapped;