import React from 'react';

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
			inputChain.push(
				<input
					type="text"
					maxLength="4"
					key={i}
					className="ctrler-input-chain-item"
					data-col={i}
					onInput={this.props.handleNumInput}
					onFocus={this.props.handleFocus}
					ref={this.inputRefs[i]}
				/>
			);
		}
		let chainClassName = 'ctrler-input-chain';
		if (this.props.unvalid) {
			chainClassName += ' error';
		}

		return (
			<div className="card-num-ctrler">
				<label className="ctrler-title">
					信用卡號
				</label>
				<div className={chainClassName}>
					{inputChain}
				</div>
				{
					this.props.unvalid &&
					<span className="error-msg text-sm">
						輸入卡號錯誤
					</span>
				}
			</div>
		);
	}
}

export default CardNumCtrler;