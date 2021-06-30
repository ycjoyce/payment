import React from 'react';
import CardNumCtrler from '../controllers/CardNumCtrler';
import InstallmentCtrler from '../controllers/InstallmentCtrler';
import ExpirationDateCtrler from '../controllers/ExpirationDateCtrler';
import SafeCodeCtrler from '../controllers/SafeCodeCtrler';
import { setStateWithData, validateCardNum } from '../../assets/js/util';

class PayByCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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

		this.cardLabels = [
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

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getDataFromCtrlers = this.getDataFromCtrlers.bind(this);
	}

	handleSubmit() {
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

	getDataFromCtrlers(data) {
		setStateWithData.call(this, data);
	}

	componentDidMount() {
		this.props.handleSubmitMethod(this.handleSubmit);
	}

	render() {
		const installment = [
			{
				title: '一次付款',
				value: 'pay-once',
			},
			{
				title: '分期付款',
				value: 'installment-plan',
			}
		];
		
		return (
			<>
				<InstallmentCtrler
					installments={installment}
					unvalid={this.state.unvalid.installment}
					getData={this.getDataFromCtrlers}
					className="mb-4"
				/>

				<CardNumCtrler
					cardLabels={this.cardLabels}
					unvalid={this.state.unvalid.cardNum}
					getData={this.getDataFromCtrlers}
					className="mb-4"
				/>

				<ExpirationDateCtrler
					unvalid={this.state.unvalid.expiration}
					getData={this.getDataFromCtrlers}
					className="mb-4"
				/>

				<SafeCodeCtrler
					unvalid={this.state.unvalid.safeCode}
					getData={this.getDataFromCtrlers}
					className="mb-4"
				/>
			</>
		);
	}
}

export default PayByCard;