import { Component } from 'react';
import { connect } from 'react-redux';
import { setPaymentInfo } from '../../actions';
import PayForm from './PayForm';
import StoreCtrler from '../controllers/StoreCtrler';

class PayByCreditCard extends Component {
  onSubmit = (formValues) => {
    this.props.setPaymentInfo(formValues);
    this.props.history.push('/finish');
  }

  render() {
    return (
      <PayForm
        path={this.props.match.path}
        onSubmit={this.onSubmit}
      >
        <StoreCtrler className="mb-4" />
      </PayForm>
    );
  }
}

export default connect(
  null,
  { setPaymentInfo }
)(PayByCreditCard);