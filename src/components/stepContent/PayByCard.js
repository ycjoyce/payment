import React from 'react';
import CardNumCtrler from '../controllers/CardNumCtrler';
import InstallmentCtrler from '../controllers/InstallmentCtrler';
import ShowCardLabel from '../controllers/ShowCardLabel';
import ExpirationDateCtrler from '../controllers/ExpirationDateCtrler';
import SafeCodeCtrler from '../controllers/SafeCodeCtrler';
import ConfirmCheckCtrler from '../controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from '../BtnsToChangeStep';

class PayByCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			installment: '一次付款',
			cardNum: Array(4).fill(''),
			cardNumInputFocused: null,
			cardNumUnvalid: null,
			expirationYear: '選擇年',
			expirationMonth: '選擇月',
			safeCode: '',
			safeCodeUnvalid: false,
		};
		this.handleInstallmentChange = this.handleInstallmentChange.bind(this);
		this.handleCardNumInput = this.handleCardNumInput.bind(this);
		this.handleCardNumInputFocus = this.handleCardNumInputFocus.bind(this);
		this.handleExpirationChange = this.handleExpirationChange.bind(this);
		this.handleSafeCodeChange = this.handleSafeCodeChange.bind(this);
	}

	handleInstallmentChange(e) {
		this.setState({ installment: e.target.value });
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
					this.setState({
						cardNumUnvalid: !this.validateCardNum(cardNum),
					});
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
		const newType = `${type[0].toUpperCase()}${type.substr(1)}`;
		const val = e.target.value;
		this.setState({
			[`expiration${newType}`] : val,
		});
	}

	handleSafeCodeChange(e) {
		if (Number.isNaN(+e.target.value)) {
			this.setState({
				safeCodeUnvalid: true,
			});
			return;
		}
		this.setState({
			safeCodeUnvalid: false,
			safeCode: e.target.value,
		});
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

		return (
			<>
				<section className="content-section">
					<InstallmentCtrler
						installments={installment}
						checked={this.state.installment}
						handleChange={this.handleInstallmentChange}
					/>
				</section>

				<section className="content-section">
					<CardNumCtrler
						handleNumInput={this.handleCardNumInput}
						handleFocus={this.handleCardNumInputFocus}
						inputFocused={this.state.cardNumInputFocused}
						unvalid={this.state.cardNumUnvalid}
					/>
					<ShowCardLabel
						labels={cardLabels}
						checked={this.checkCardLabel(this.state.cardNum.join(''))}
					/>
				</section>

				<section className="content-section">
					<ExpirationDateCtrler
						handleChange={this.handleExpirationChange}
						yearVal={this.state.expirationYear}
						monthVal={this.state.expirationMonth}
					/>
				</section>

				<section className="content-section">
					<SafeCodeCtrler
						value={this.state.safeCode}
						handleChange={this.handleSafeCodeChange}
						unvalid={this.state.safeCodeUnvalid}
					/>
				</section>

				<section className="content-section">
					<ConfirmCheckCtrler
						email={this.props.email}
						handleEmailChange={this.props.handleEmailChange}
						confirmCheck={this.props.confirmCheck}
						handleConfirmCheck={this.props.handleConfirmCheck}
					/>
				</section>

				<section className="content-section">
					<BtnsToChangeStep
						handleChangeStep={this.props.handleChangeStep}
					/>
				</section>
			</>
		);
	}
}

export default PayByCard;