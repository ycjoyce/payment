import React from 'react';
import OrderInfo from './OrderInfo';

class AsideArea extends React.Component {
	render() {
		const orderInfoContent = [
			{
				title: '商品名稱',
				content: 'Iphone XR 手機殼 x 1',
			},
			{
				title: '訂單編號',
				content: '17485739',
			},
			{
				title: '訂單金額',
				content: 'NT$ 600',
			}
		];

		return (
			<aside className={this.props.className}>
				{
					this.props.finish &&
					<p>
						Finish
					</p>
				}
				<OrderInfo
					listItems={orderInfoContent}
				/>
				<button className="btn btn-dark mt-4">
					<small>
						返回商店
					</small>
				</button>
			</aside>
		);
	}
}

AsideArea.defaultProps = {
	className: '',
};

export default AsideArea;