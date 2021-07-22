import { Component } from 'react';
import { connect } from 'react-redux';
import { getOrder } from '../actions';
import List from './List';

class OrderInfo extends Component {
// 	state = {
// 		hideList: false,
// 	};
// 
// 	initHideList = () => {
// 		this.setState({ hideList: document.documentElement.offsetWidth < 576 });
// 	}
// 
// 	toggleHideList = () => {
// 		if (document.documentElement.offsetWidth > 575) {
// 			return;
// 		}
// 		this.setState((state) => ({
// 			hideList: !state.hideList,
// 		}));
// 	}
// 
// 	componentDidMount() {
// 		this.initHideList();
// 		window.addEventListener('resize', this.initHideList);
// 	}
// 
// 	componentWillUnmount() {
// 		window.removeEventListener('resize', this.initHideList);
// 	}

	componentDidMount() {
		this.props.getOrder();
	}

	renderList() {
		if (this.props.order.length < 1) {
			return null;
		} 
		return (
			<List
				items={this.props.order}
				// hide={this.state.hideList}
				className="order-info-list p-sm-0 p-3"
			/>
		);
	}

	render() {
		return (
			<div className={`order-info p-sm-3 rounded-start ${this.props.className || ''}`}>
				<h3
					className="order-info-title"
					// onClick={this.toggleHideList}
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