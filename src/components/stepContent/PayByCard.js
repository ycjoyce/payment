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
				year: '選擇年',
				month: '選擇月',
			},
			safeCode: '',
			unvalid: {
				installment: false,
				cardNum: false,
				expiration: false,
				safeCode: false,
			},
		};

		this.handleExpirationChange = this.handleExpirationChange.bind(this);
		this.handleSafeCodeChange = this.handleSafeCodeChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getDataFromCtrlers = this.getDataFromCtrlers.bind(this);
	}

	handleExpirationChange(e) {
		const type = e.target.dataset.type;
		const val = e.target.value;
		this.setState(
			(state) => ({
				expiration: {
					...state.expiration,
					[type]: val,
				},
			}),
			() => {
				const { year, month } = this.state.expiration;
				if (!Number.isNaN(+year) && !Number.isNaN(+month)) {
					this.setState((state)=> ({
						unvalid: {
							...state.unvalid,
							expiration: false,
						}
					}));
				}
			}
		);
	}

	handleSafeCodeChange(e) {
		if (Number.isNaN(+e.target.value)) {
			this.setState((state)=> ({
				unvalid: {
					...state.unvalid,
					safeCode: true,
				}
			}));
			return;
		}
		this.setState((state)=> ({
			unvalid: {
				...state.unvalid,
				safeCode: false,
			},
			safeCode: e.target.value,
		}));
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
		if (this.state.safeCode.length < 3 || this.state.safeCodeUnvalid) {
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
					unvalid={this.state.unvalid.cardNum}
					getData={this.getDataFromCtrlers}
					className="mb-4"
				/>

				<ExpirationDateCtrler
					yearVal={this.state.expiration.year}
					monthVal={this.state.expiration.month}
					unvalid={this.state.unvalid.expiration}
					handleChange={this.handleExpirationChange}
					className="mb-4"
				/>

				<SafeCodeCtrler
					value={this.state.safeCode}
					unvalid={this.state.unvalid.safeCode}
					handleChange={this.handleSafeCodeChange}
					className="mb-4"
				/>
			</>
		);
	}
}

export default PayByCard;