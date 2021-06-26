import React from 'react';
import BasicCtrler from './BasicCtrler';
import ShowCardLabel from './ShowCardLabel';

class CardNumCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.inputRefs = [];
		for (let i = 0; i < 4; i++) {
			this.inputRefs.push(React.createRef());
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.inputFocused !== prevProps.inputFocused) {
			if (!prevProps.inputFocused && prevProps.inputFocused !== 0) {
				return;
			}
			if (!this.props.inputFocused && this.props.inputFocused !== 0) {
				return;
			}
			this.inputRefs[+this.props.inputFocused].current.focus();
		}
	}

  render() {
		const inputChain = [];
		for (let i = 0; i < 4; i++) {
			let inputClassName = 'form-control';
			if (this.props.unvalid) {
				inputClassName += ' border-danger';
			}
			inputChain.push(
				<input
					type="text"
					maxLength="4"
					key={i}
					className={inputClassName}
					data-col={i}
					onInput={this.props.handleNumInput}
					onFocus={this.props.handleFocus}
					ref={this.inputRefs[i]}
				/>
			);
			if (i !== 3) {
				inputChain.push(
					<span
						className="mx-1"
						key={`${i}-span`}
					>
						—
					</span>
				);
			}
		}

		let chainClassName = 'd-flex align-items-center';
		if (this.props.unvalid) {
			chainClassName += ' error';
		}

		let containerClassName = 'card-num-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="信用卡號"
					errorMsg="輸入卡號錯誤"
					unvalid={this.props.unvalid}
				>
					<div className="d-flex flex-wrap flex-lg-nowrap align-items-end">
						<div className={chainClassName}>
							{inputChain}
						</div>
						<ShowCardLabel
							labels={this.props.cardLabels}
							checked={this.props.cardLabelChecked}
							className="ms-lg-3 mt-lg-0 mt-2"
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default CardNumCtrler;