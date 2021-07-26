import { Component } from 'react';
import { connect } from 'react-redux';
import { setPaymentInfo } from '../../actions';
import PayForm from './PayForm';
import InstallmentCtrler from '../controllers/InstCtrler';
import CardNumCtrler from '../controllers/CardNumCtrler';
import ExpirationCtrler from '../controllers/ExpirationCtrler';
import SafeCodeCtrler from '../controllers/SafeCodeCtrler';

class PayByCreditCard extends Component {
  onSubmit = (formValues) => {
    this.props.setPaymentInfo(formValues);
    localStorage.setItem('payment-info', JSON.stringify(formValues));
    this.props.history.push('/finish');
  }

  render() {
    return (
      <PayForm
        path={this.props.match.path}
        initialValues={{
					installment: 'pay-once',
					cardNum: { 1: '', 2: '', 3: '', 4: '' },
				}}
        onSubmit={this.onSubmit}
      >
        <InstallmentCtrler className="mb-4" />
        <CardNumCtrler className="mb-4" />
        <ExpirationCtrler className="mb-4" />
        <SafeCodeCtrler className="mb-4" />
      </PayForm>
    );
  }
}

export default connect(
  null,
  { setPaymentInfo }
)(PayByCreditCard);