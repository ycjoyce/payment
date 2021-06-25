import React from 'react';
import BasicCtrler from './BasicCtrler';

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
					className="ctrler-chain-item form-ctrler"
					data-col={i}
					onInput={this.props.handleNumInput}
					onFocus={this.props.handleFocus}
					ref={this.inputRefs[i]}
				/>
			);
		}
		let chainClassName = 'ctrler-chain';
		if (this.props.unvalid) {
			chainClassName += ' error';
		}

		return (
			<div className="card-num-ctrler">
				<BasicCtrler
					title="信用卡號"
					errorMsg="輸入卡號錯誤"
					unvalid={this.props.unvalid}
				>
					<div className={chainClassName}>
						{inputChain}
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default CardNumCtrler;