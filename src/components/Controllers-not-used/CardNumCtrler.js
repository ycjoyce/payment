import React from 'react';
import BasicCtrler from './BasicCtrler';
import ShowCardLabel from './ShowCardLabel';
import InputChain from './InputChain';

class CardNumCtrler extends React.Component {
	state = {
		cardNum: Array(4).fill(''),
		inputFocused: null,
	};

	handleNumInputFocus = (e) => {
		this.setState({ inputFocused: +e.target.dataset.col });
	}

	handleNumInput = (e) => {
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
				if (this.state.cardNum.filter((num) => num).length < 4) {
					return;
				}
				const cardNum = this.state.cardNum.join('');
				this.props.getData({ cardNum });
			}
		);
	}

  	render() {
		const { inputFocused, cardNum } = this.state;
		const { className, unvalid, cardLabels } = this.props;
		const chainClassName = 'd-flex align-items-center col-lg-6';
		const containerClassName = `card-num-ctrler ${className || ''}`;
		const inputClassName = `form-control ${unvalid && 'border-danger'}`;

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="信用卡號"
					errorMsg="請輸入正確信用卡號"
					unvalid={unvalid}
				>
					<div className="d-flex flex-wrap flex-lg-nowrap align-items-end">
						<div className={chainClassName}>
							<InputChain
								length={4}
								inputMaxLen="4"
								inputClassName={inputClassName}
								inputFocused={inputFocused}
								handleInput={this.handleNumInput}
								handleInputFocus={this.handleNumInputFocus}
							/>
						</div>
						<ShowCardLabel
							labels={cardLabels}
							cardNum={cardNum.join('')}
							unvalid={unvalid}
							className="ms-lg-3 mt-lg-0 mt-2"
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default CardNumCtrler;