import React from 'react';
import CardNumCtrler from '../controllers/CardNumCtrler';
import InstallmentCtrler from '../controllers/InstallmentCtrler';
import ExpirationDateCtrler from '../controllers/ExpirationDateCtrler';
import SafeCodeCtrler from '../controllers/SafeCodeCtrler';
import { validateCardNum } from '../../assets/js/util';

class PayByCard extends React.Component {
	state = {
		installment: '',
		cardNum: '',
		expiration: {
			year: 'placeholder',
			month: 'placeholder',
		},
		safeCode: '',
		unvalid: {
			installment: false,
			cardNum: false,
			expiration: false,
			safeCode: false,
		},
	};

	cardLabels = [
		{
			title: 'visa',
			img: require('../../assets/img/visa.svg'),
		},
		{
			title: 'master-card',
			img: require('../../assets/img/mastercard.svg'),
		},
		{
			title: 'jcb',
			img: require('../../assets/img/jcb.svg'),
		}
	];

	installments = [
		{
			title: '一次付款',
			value: 'pay-once',
		},
		{
			title: '分期付款',
			value: 'installment-plan',
		}
	];

	handleSubmit = () => {
		const err = [];
		if (!this.state.installment) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					installment: true,
				},
			}));
			err.push('installment');
		}
		if (!validateCardNum(this.state.cardNum)) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					cardNum: true,
				},
			}));
			err.push('card-num');
		}
		if (Number.isNaN(+this.state.expiration.year) || Number.isNaN(+this.state.expiration.month)) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					expiration: true,
				},
			}));
			err.push('expiration');
		}
		if (this.state.safeCode.length < 3 || Number.isNaN(+this.state.safeCode)) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					safeCode: true,
				},
			}));
			err.push('safe-code');
		}
		return err;
	}

	componentDidMount() {
		this.props.handleSubmitMethod({ submitMethod: this.handleSubmit });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.installment !== this.state.installment) {
			this.setState((state) => ({
				unvalid: { ...state.unvalid, installment: !state.installment },
			}));
			return;
		}
		if (prevState.cardNum !== this.state.cardNum) {
			this.setState((state) => ({
				unvalid: { ...state.unvalid, cardNum: !validateCardNum(state.cardNum) },
			}));
			return;
		}
		if (
			prevState.expiration.year !== this.state.expiration.year ||
			prevState.expiration.month !== this.state.expiration.month
		) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid, 
					expiration: Number.isNaN(+state.expiration.year) || Number.isNaN(+state.expiration.month),
				},
			}));
			return;
		}
		if (prevState.safeCode !== this.state.safeCode) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					safeCode: Number.isNaN(+state.safeCode) || state.safeCode.length !== 3,
				},
			}));
			return;
		}
	}

	render() {
		return (
			<>
				<InstallmentCtrler
					installments={this.installments}
					installment={this.state.installment}
					unvalid={this.state.unvalid.installment}
					getData={this.props.getData.bind(this)}
					className="mb-4"
				/>

				<CardNumCtrler
					cardLabels={this.cardLabels}
					unvalid={this.state.unvalid.cardNum}
					getData={this.props.getData.bind(this)}
					className="mb-4"
				/>

				<ExpirationDateCtrler
					expiration={this.state.expiration}
					unvalid={this.state.unvalid.expiration}
					getData={this.props.getData.bind(this)}
					className="mb-4"
				/>

				<SafeCodeCtrler
					safeCode={this.state.safeCode}
					unvalid={this.state.unvalid.safeCode}
					getData={this.props.getData.bind(this)}
					className="mb-4"
				/>
			</>
		);
	}
}

export default PayByCard;