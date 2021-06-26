import React from 'react';
import List from './List';

class OrderInfo extends React.Component {
	render() {
		return (
			<div className="order-info bg-info p-3 rounded-start">
				<h3 className="order-info-title fs-5">
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