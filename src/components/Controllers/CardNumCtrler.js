import React from 'react';
import BasicCtrler from './BasicCtrler';
import ShowCardLabel from './ShowCardLabel';
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

		this.inputRefs = [];
		for (let i = 0; i < 4; i++) {
			this.inputRefs.push(React.createRef());
		}

		this.handleNumInput = this.handleNumInput.bind(this);
		this.handleNumInputFocus = this.handleNumInputFocus.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.inputFocused !== prevState.inputFocused) {
			if (prevState.inputFocused === null || this.state.inputFocused === null) {
				return;
			}
			this.inputRefs[+this.state.inputFocused].current.focus();
		}
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

	handleNumInputFocus(e) {
		this.setState({
			inputFocused: +e.target.dataset.col,
		});
	}

  	render() {
		const inputChain = [];
		const chainClassName = 'd-flex align-items-center';
		let containerClassName = 'card-num-ctrler';
		let inputClassName = 'form-control';

		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		if (this.props.unvalid || this.state.unvalid.cardNum) {
			inputClassName += ' border-danger';
		}

		for (let i = 0; i < 4; i++) {
			if (i !== 3) {
				inputClassName += ' me-2 me-sm-0 px-1 px-sm-2';
			}
			inputChain.push(
				<input
					type="text"
					maxLength="4"
					key={i}
					className={inputClassName}
					data-col={i}
					onInput={this.handleNumInput}
					onFocus={this.handleNumInputFocus}
					ref={this.inputRefs[i]}
				/>
			);
			if (i !== 3) {
				inputChain.push(
					<span
						className="mx-1 d-none d-sm-block"
						key={`${i}-span`}
					>
						—
					</span>
				);
			}
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
							{inputChain}
						</div>
						<ShowCardLabel
							labels={this.props.cardLabels}
							cardNum={this.state.cardNum.join('')}
							className="ms-lg-3 mt-lg-0 mt-2"
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default CardNumCtrler;