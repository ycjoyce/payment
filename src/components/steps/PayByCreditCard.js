import { Component } from 'react';
import { reduxForm } from 'redux-form';
import Layout from '../Layout';
import InstallmentCtrler from '../controllers/InstallmentCtrler';
import CardNumCtrler from '../controllers/CardNumCtrler';
import { validateCardNum } from '../../util';

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

function validate(formValues) {
  const error = {};
  const cardNum = formValues.cardNum ? Object.values(formValues.cardNum).join('') : '';

  if (!validateCardNum(cardNum)) {
    error.cardNum = '請填寫正確信用卡號';
  }
  
  return error;
}

const formWrapped = reduxForm({
  form: 'PayByCreditCard',
  validate,
})(PayByCreditCard);

export default formWrapped;