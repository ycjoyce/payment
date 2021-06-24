import React from 'react';

class PayMethod extends React.Component {
	render() {
		const methodBoxes = this.props.methods.map((method) => {
			let className = 'pay-method-box';
			if (this.props.checked === method.value) {
				className += ' bgc-pmr';
			}
			return (
				<div
					key={method.value}
					className={className}
					onClick={() => this.props.handlePayMethodClick(method.value)}
				>
					{method.title}
				</div>
			);
		});

		return (
			<>
				{methodBoxes}

				<button
					className="corner-round-sm btn-solid-pmr"
					disabled={!this.props.checked}
					onClick={() => this.props.handleChangeStep('next')}
				>
					下一步
				</button>
			</>
		);
	}
}

export default PayMethod;