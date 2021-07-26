import { Component } from 'react';
import { connect } from 'react-redux';
import { setPaymentInfo } from '../../actions';
import PayForm from './PayForm';
import StoreCtrler from '../controllers/StoreCtrler';

class PayByCreditCard extends Component {
  onSubmit = (formValues) => {
    const target = `/finish${this.props.type === 'convenience-store' ? '/convenience-store' : ''}`;
    const data = { ...formValues, time: Date.now() };
    this.props.setPaymentInfo(data);
    localStorage.setItem('payment-info', JSON.stringify(data));
    this.props.history.push(target);
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

function mapStateToProps(state, ownProps) {
  const [,type] = ownProps.match.path.substr(1).split('/');
  return { type };
}

export default connect(
  mapStateToProps,
  { setPaymentInfo }
)(PayByCreditCard);