import React from 'react';
import List from './List';

class OrderInfo extends React.Component {
	render() {
		return (
			<div className="order-info">
				<h3 className="order-info-title title-sdr text-bold">
					訂單資訊
				</h3>

				<List
					className="order-info-list"
					listItems={this.props.listItems}
				/>
			</div>
		);
	}
}

export default OrderInfo;