import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStores, setPaymentInfo } from '../../actions';
import Layout from '../Layout';
import List from '../List';
 
class Finish extends Component {
  componentDidMount() {
    this.props.getStores();
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

  renderList() {
    if (!this.props.paymentInfo.time) {
      return [];
    }
    const now = new Date(this.props.paymentInfo.time);
    const afterAWeek = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
    return [
      { title: '付款超商', content: this.props.store },
      { title: '付款代碼', content: now.getTime() },
      { title: '付款期限', content: afterAWeek.toLocaleString() },
    ];
  }

	render() {
		return (
      <Layout curPage={this.props.match.path}>
        <List
          className="show-store-finish-list mb-4"
          items={this.renderList()}
        />

        <small className="d-flex mb-4">
          <span className="flex-shrink-0 me-1">*</span>
          <span>請至您選擇之超商店內機台輸入代碼進行繳費，逾期訂單自動作廢。</span>
        </small>

        <Link
          className="btn btn-primary text-white float-end"
          to="/choose-pay-method"
        >
          <small>返回首頁</small>
        </Link>
      </Layout>
		);
	}
} 

function mapStateToProps(state) {
  const result = { store: '', paymentInfo: state.paymentInfo };
  if (Object.entries(state.paymentInfo).length < 1 || Object.entries(state.stores).length < 1) {
    return result;
  }
  return { ...result, store: state.stores[state.paymentInfo.store] };
}

export default connect(
  mapStateToProps,
  { getStores, setPaymentInfo }
)(Finish);