import React from 'react';
import List from './List';

class OrderInfo extends React.Component {
	state = {
		hideList: false,
	};

	initHideList = () => {
		this.setState({ hideList: document.documentElement.offsetWidth < 576 });
	}

	toggleHideList = () => {
		if (document.documentElement.offsetWidth > 575) {
			return;
		}
		this.setState((state) => ({
			hideList: !state.hideList,
		}));
	}

	componentDidMount() {
		this.initHideList();
		window.addEventListener('resize', this.initHideList);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.initHideList);
	}

	render() {
		return (
			<div className="order-info p-sm-3 rounded-start">
				<h3
					className="order-info-title"
					onClick={this.toggleHideList}
				>
					訂單資訊
				</h3>

				<List
					listItems={this.props.listItems}
					hide={this.state.hideList}
					className="order-info-list p-sm-0 p-3"
				/>
			</div>
		);
	}
}

export default OrderInfo;