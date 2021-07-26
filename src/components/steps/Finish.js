import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPaymentInfo } from '../../actions';
import Layout from '../Layout';
 
class Finish extends Component {
  componentDidMount() {
    if (Object.entries(this.props.paymentInfo).length < 1 && localStorage.getItem('payment-info')) {
      this.props.setPaymentInfo(
        JSON.parse(localStorage.getItem('payment-info'))
      );
    }
  }

  componentWillUnmount() {
		if (localStorage.getItem('payment-info')) {
			localStorage.removeItem('payment-info');
		}
	}

	render() {
		return (
      <Layout curPage={this.props.match.path}>
        <div className="text-center">
          <div className="show-finish-img-box mb-4">
            <img
              className="show-finish-img"
              src={require('../../assets/img/finish.svg').default}
              alt="payment finished"
            />
          </div>
          
          <p className="mb-4">
            稍後將寄送訂單詳細資訊至您的E-mail
          </p>

          <Link
            className="btn btn-primary text-white"
            to="/choose-pay-method"
          >
            <small>返回首頁</small>
          </Link>
        </div>
      </Layout>
		);
	}
} 

function mapStateToProps(state) {
  return { paymentInfo: state.paymentInfo };
}

export default connect(
  mapStateToProps,
  { setPaymentInfo }
)(Finish);