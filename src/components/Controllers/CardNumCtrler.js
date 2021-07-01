import React from 'react';
import BasicCtrler from './BasicCtrler';
import ShowCardLabel from './ShowCardLabel';
import InputChain from './InputChain';
import { validateCardNum } from '../../assets/js/util';

class CardNumCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardNum: Array(4).fill(''),
			inputFocused: null,
			unvalid: {
				cardNum: false,
			},
		};
		
		this.handleNumInputFocus = this.handleNumInputFocus.bind(this);
		this.handleNumInput = this.handleNumInput.bind(this);
	}

	handleNumInputFocus(e) {
		this.setState({
			inputFocused: +e.target.dataset.col,
		});
	}

	handleNumInput(e) {
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
				{ inputFocused: col + 1 >= state.cardNum.length ? null : col + 1 }
			),
			() => {
				if (this.state.cardNum.filter((num) => num).length > 3) {
					const cardNum = this.state.cardNum.join('');
					this.setState((state) => ({
						unvalid: {
							...state.unvalid,
							cardNum: !validateCardNum(cardNum),
						},
					}));
					this.props.getData({
						cardNum,
						unvalid: {
							cardNum: !validateCardNum(cardNum),
						},
					});
				}
			}
		);
	}

  	render() {
		const chainClassName = 'd-flex align-items-center col-lg-6';
		let containerClassName = 'card-num-ctrler';
		let inputClassName = 'form-control';

		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		if (this.props.unvalid || this.state.unvalid.cardNum) {
			inputClassName += ' border-danger';
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="信用卡號"
					errorMsg="請輸入正確信用卡號"
					unvalid={this.props.unvalid || this.state.unvalid.cardNum}
				>
					<div className="d-flex flex-wrap flex-lg-nowrap align-items-end">
						<div className={chainClassName}>
							<InputChain
								length={4}
								inputMaxLen="4"
								inputClassName={inputClassName}
								inputFocused={this.state.inputFocused}
								handleInput={this.handleNumInput}
								handleInputFocus={this.handleNumInputFocus}
							/>
						</div>
						<ShowCardLabel
							labels={this.props.cardLabels}
							cardNum={this.state.cardNum.join('')}
							unvalid={this.state.unvalid.cardNum}
							className="ms-lg-3 mt-lg-0 mt-2"
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default CardNumCtrler;