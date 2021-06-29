import React from 'react';
import OrderInfo from './OrderInfo';

class AsideArea extends React.Component {
	render() {
		let containerClassName = 'position-relative';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}
		if (this.props.finish) {
			containerClassName += ' d-flex justify-content-end';
		}

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
			<aside
				className={containerClassName}
				style={{ top: `${this.props.top}px` }}
			>
				{
					this.props.finish &&
					<>
						<p className="fs-4 d-inline-block title-spacing text-end me-4">
							<span className="decoration-item fw-light" data-side="top">|</span>
							<span className="d-block">Finish</span>
							<span className="decoration-item fw-light" data-side="bottom">|</span>
						</p>
						<div
							className="decoration-bg-box rounded-start rounded-3 bg-light"
						></div>
					</>
				}
				
				{
					!this.props.finish &&
					<>
						<OrderInfo
							listItems={orderInfoContent}
						/>
						<button className="btn btn-dark mt-4">
							<small>
								返回商店
							</small>
						</button>
					</>
				}
			</aside>
		);
	}
}

export default AsideArea;