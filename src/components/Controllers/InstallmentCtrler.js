import React from 'react';

class InstallmentCtrler extends React.Component {
	render() {
		const installmentInputs = this.props.installments.map((item) => (
			<label
				className="installment-ctrler"
				key={item.value}
			>
				<input
					type="radio"
					name="installment"
					value={item.value}
					checked={item.value === this.props.checked}
					onChange={this.props.handleChange}
				/>
				{item.title}
			</label>
		));

		return (
			<>
				{installmentInputs}
			</>
		);
	}
}

export default InstallmentCtrler;