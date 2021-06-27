import React from 'react';
import BasicCtrler from './BasicCtrler';

class InstallmentCtrler extends React.Component {
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
					checked={item.value === this.props.checked}
					onChange={this.props.handleChange}
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