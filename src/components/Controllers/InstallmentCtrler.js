import React from 'react';
import BasicCtrler from './BasicCtrler';

class InstallmentCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			installment: '',
		};

		this.handleInstallmentChange = this.handleInstallmentChange.bind(this);
	}

	handleInstallmentChange(e) {
		this.setState({ installment: e.target.value });
		if (typeof this.props.getData === 'function') {
			this.props.getData({
				installment: e.target.value,
				unvalid: {
					installment: false,
				},
			});
		}
	}

	render() {
		let containerClassName = 'installment-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		const installmentInputs = this.props.installments.map((item, index, arr) => (
			<label
				className={index === arr.length - 1 ? '' : 'me-3'}
				key={item.value}
			>
				<input
					type="radio"
					name="installment"
					value={item.value}
					checked={item.value === this.state.installment}
					onChange={this.handleInstallmentChange}
					className="me-2 form-check-input"
				/>
				{item.title}
			</label>
		));

		return (
			<div className={containerClassName}>
				<BasicCtrler
					unvalid={this.props.unvalid}
					errorMsg="請選擇一次或分期付款"
				>
					{installmentInputs}
				</BasicCtrler>
			</div>
		);
	}
}

export default InstallmentCtrler;