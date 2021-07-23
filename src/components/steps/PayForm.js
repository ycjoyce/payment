import { Component } from 'react';
import { reduxForm } from 'redux-form';
import {
  validateCardNum,
  validateExpiration,
  validateSafeCode,
  validateEmail,
} from '../../util';
import Layout from '../Layout';
import EmailCtrler from '../controllers/EmailCtrler';
import ConfirmCheckCtrler from '../controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from '../BtnsToChangeStep';

class PayByStore extends Component {
  render() {
    return (
      <Layout curPage={this.props.path}>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.props.children}
          <EmailCtrler className="mb-4" />
          <ConfirmCheckCtrler className="mb-4" />
          <BtnsToChangeStep />
        </form>
      </Layout>
    );
  }
}

function validate(formValues) {
  const error = {};
  const cardNum = formValues.cardNum ? Object.values(formValues.cardNum).join('') : '';

  if (!validateCardNum(cardNum).status) {
    error.cardNum = validateCardNum(cardNum).msg;
  }

  if (!validateExpiration(formValues.expiration).status) {
    error.expiration = validateExpiration(formValues.expiration).msg;
  }

  if (!validateSafeCode(formValues.safeCode).status) {
    error.safeCode = validateSafeCode(formValues.safeCode).msg;
  }

  if (!validateEmail(formValues.email).status) {
    error.email = validateEmail(formValues.email).msg;
  }
  
  if (!formValues.confirmCheck) {
    error.confirmCheck = '請勾選';
  }

  if (!formValues.store) {
    error.store = '請選擇付款超商';
  }

  return error;
}

const formWrapped = reduxForm({
  form: 'Payment',
  validate,
})(PayByStore);

export default formWrapped;