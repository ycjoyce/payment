import React from 'react';
import BasicCtrler from './BasicCtrler';

class InstallmentCtrler extends React.Component {
	handleChange = (e) => {
		this.props.getData({ installment: e.target.value });
	}

	makeRadios(installments) {
		return installments.map(({ title, value }, index, arr) => (
			<label
				className={index === arr.length - 1 ? '' : 'me-3'}
				key={value}
			>
				<input
					type="radio"
					name="installment"
					value={value}
					checked={value === this.props.installment}
					onChange={this.handleChange}
					className="me-2 form-check-input"
				/>
				{title}
			</label>
		));
	}

	render() {
		const { className, installments, unvalid } = this.props;
		const containerClassName = `installment-ctrler ${className || ''}`;
		const radios = this.makeRadios(installments);

		return (
			<div className={containerClassName}>
				<BasicCtrler
					unvalid={unvalid}
					errorMsg="請選擇一次或分期付款"
				>
					{radios}
				</BasicCtrler>
			</div>
		);
	}
}

export default InstallmentCtrler;