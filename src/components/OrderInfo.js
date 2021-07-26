import { Component } from 'react';
import { connect } from 'react-redux';
import { getOrder } from '../actions';
import List from './List';

class OrderInfo extends Component {
	state = { hideList: null };

	componentDidMount() {
		this.props.getOrder();
		this.setState({ hideList: this.props.windowWidth < 576 });
	}

	componentDidUpdate(oldProps) {
		if (oldProps.windowWidth !== this.props.windowWidth) {
			this.setState({ hideList: this.props.windowWidth < 576 });
		}
	}

	renderList() {
		if (this.props.order.length < 1) {
			return null;
		} 
		return (
			<List
				items={this.props.order}
				className={`order-info-list p-sm-0 p-3 ${this.state.hideList ? 'hide' : ''}`}
			/>
		);
	}

	render() {
		return (
			<div className={`order-info p-sm-3 rounded-start ${this.props.className || ''}`}>
				<h3
					className="order-info-title"
					onClick={() => this.setState((state) => ({ hideList: !state.hideList }))}
				>
					訂單資訊
				</h3>

				{this.renderList()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { order: state.order };
}

export default connect(
	mapStateToProps,
	{ getOrder }
)(OrderInfo);