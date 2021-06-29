import React from 'react';
import CardNumCtrler from '../controllers/CardNumCtrler';
import InstallmentCtrler from '../controllers/InstallmentCtrler';
import ExpirationDateCtrler from '../controllers/ExpirationDateCtrler';
import SafeCodeCtrler from '../controllers/SafeCodeCtrler';

class PayByCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			installment: '',
			cardNum: Array(4).fill(''),
			cardNumInputFocused: null,
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
		this.handleInstallmentChange = this.handleInstallmentChange.bind(this);
		this.handleCardNumInput = this.handleCardNumInput.bind(this);
		this.handleCardNumInputFocus = this.handleCardNumInputFocus.bind(this);
		this.handleExpirationChange = this.handleExpirationChange.bind(this);
		this.handleSafeCodeChange = this.handleSafeCodeChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInstallmentChange(e) {
		this.setState((state) => ({
			installment: e.target.value,
			unvalid: {
				...state.unvalid,
				installment: false,
			},
		}));
	}

	handleCardNumInput(e) {
		const col = +e.target.dataset.col;
		const value = e.target.value;
		const setStateNum = (val) => {
			this.setState((state) => {
				const cardNum = state.cardNum.slice();
				cardNum.splice(col, 1, val);
				return { cardNum };
			});
		};

		if (value.length !== 4 || Number.isNaN(+value)) {
			setStateNum('');
			return;
		}

		setStateNum(value);
		this.setState(
			(state) => (
				{ cardNumInputFocused: col + 1 >= state.cardNum.length ? null : col + 1 }
			),
			() => {
				if (this.state.cardNum.filter((num) => num).length > 3) {
					const cardNum = this.state.cardNum.join('');
					this.setState((state) => ({
						unvalid: {
							...state.unvalid,
							cardNum: !this.validateCardNum(cardNum),
						},
					}));
				}
			}
		);
	}

	validateCardNum(cardNum) {
		if (cardNum.length < 16) {
			return false;
		}

		const newCardNum = cardNum.split('').map((num, index) => (
			(index + 1) % 2 === 0 ? +num : +num * 2
		)).map((num) => (
			num > 9 ? `${num}`.split('').map((n) => +n) : num
		)).flat().reduce((a, e) => a + e, 0);

		return newCardNum % 10 === 0;
	}

	checkCardLabel(cardNum) {
		const firstTwoChar = cardNum.substr(0, 2);
		const firstThreeChar = cardNum.substr(0, 3);
		const firstFourChar = cardNum.substr(0, 4);

		if (cardNum.startsWith('4')) {
			return 'visa';
		}
		if (+firstTwoChar >= 51 && +firstTwoChar <= 55) {
			return 'master-card';
		}
		if (firstFourChar === '1800' || firstFourChar === '2131' || (+firstThreeChar >= 300 && +firstThreeChar <= 399)) {
			return 'jcb';
		}
		return false;
	}

	handleCardNumInputFocus(e) {
		this.setState({
			cardNumInputFocused: +e.target.dataset.col,
		});
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
		const cardNum = this.state.cardNum.join('');
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
		if (!this.validateCardNum(cardNum)) {
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

	componentDidMount() {
		this.props.handleSubmitMethod(this.handleSubmit);
	}

	render() {
		const cardLabels = [
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
					checked={this.state.installment}
					unvalid={this.state.unvalid.installment}
					handleChange={this.handleInstallmentChange}
					className="mb-4"
				/>

				<CardNumCtrler
					inputFocused={this.state.cardNumInputFocused}
					unvalid={this.state.unvalid.cardNum}
					cardLabels={cardLabels}
					cardLabelChecked={this.checkCardLabel(this.state.cardNum.join(''))}
					handleNumInput={this.handleCardNumInput}
					handleFocus={this.handleCardNumInputFocus}
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