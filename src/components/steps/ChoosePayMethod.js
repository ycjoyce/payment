import { Component } from 'react';
import Layout from '../Layout';

class ChoosePayMethod extends Component {
	state = {
		payMethod: '',
	};

	onPayMethodClick = (method) => {
		this.setState({ payMethod: method });
	};

	renderPayment() {
		const payMethods = [
			{
				title: '信用卡/金融卡',
				value: 'credit-card',
				img: require('../../assets/img/credit-card.svg'),
			},
			{
				title: '超商付款',
				value: 'convenience-store',
				img: require('../../assets/img/shop.svg'),
			},
			{
				title: 'Web ATM',
				value: 'web-atm',
				img: require('../../assets/img/web-atm.svg'),
			},
		];

		return payMethods.map((method) => {
			const className = `
				pay-method-box btn col-5 col-lg-3 mx-2 my-2 my-lg-0
				${this.state.payMethod === method.value ? ' btn-primary text-white' : ' btn-light'}
			`;
			const imgClassName = `
				pay-method-img d-block mx-auto
				${this.state.payMethod === method.value ? ' light' : ''}
			`;

			return (
				<div
					key={method.value}
					className={className}
					onClick={() => this.onPayMethodClick(method.value)}
				>
					<img
						className={imgClassName}
						src={method.img.default}
						alt={method.value}
					/>

					<small>
						{method.title}
					</small>
				</div>
			);
		});
	}

	onNextStepBtnClick = () => {
		this.props.history.push(`/fill-in-info/${this.state.payMethod}`);
	};

	render() {
		return (
			<Layout
				curPage={this.props.match.path}
			>
				<div className="pay-method-box-container row justify-content-center flex-wrap my-5">
					{this.renderPayment()}
				</div>

				<button
					className="btn btn-primary text-white ms-auto d-block"
					disabled={!this.state.payMethod}
					onClick={this.onNextStepBtnClick}
				>
					<small>下一步</small>
				</button>
			</Layout>
		);
	}
}

export default ChoosePayMethod;