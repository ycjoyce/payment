import React from 'react';
import OrderInfo from './OrderInfo';

class AsideArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hideFinish: false,
		};

		this.initHideFinish = this.initHideFinish.bind(this);
	}

	componentDidMount() {
		this.initHideFinish();
		window.addEventListener('resize', this.initHideFinish);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.initHideFinish);
	}

	initHideFinish() {
		this.setState({ hideFinish: document.documentElement.offsetWidth < 576 });
	}

	render() {
		let containerClassName = 'aside-area';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}
		if (this.props.finish) {
			containerClassName += ' d-flex justify-content-end';
		}

		return (
			<aside
				className={containerClassName}
				style={{ top: `${this.props.top}px` }}
			>
				{
					(this.props.finish && !this.state.hideFinish) &&
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
					<OrderInfo
						listItems={this.props.orderInfoContent}
					/>
				}
			</aside>
		);
	}
}

export default AsideArea;