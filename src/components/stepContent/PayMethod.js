import React from 'react';

class PayMethod extends React.Component {
	render() {
		const methodBoxes = this.props.methods.map((method) => {
			let className = 'pay-method-box btn col-sm-3 col-lg-2 mx-2 my-2 my-sm-0';
			let imgClassName = 'pay-method-img d-block mx-auto';

			if (this.props.checked === method.value) {
				className += ' btn-primary text-white';
				imgClassName += ' light';
			} else {
				className += ' btn-light';
			}

			return (
				<div
					key={method.value}
					className={className}
					onClick={() => this.props.handlePayMethodClick({ payMethod: method.value })}
				>
					<img
						className={imgClassName}
						src={method.img.default}
						alt={method.value}
					/>

					<small>
						{method.title}
					</small>
				</div>
			);
		});

		return (
			<>
				<div className="pay-method-box-container row justify-content-center flex-wrap my-5">
					{methodBoxes}
				</div>

				<button
					className="btn btn-primary text-white ms-auto d-block"
					disabled={!this.props.checked}
					onClick={() => this.props.handleChangeStep('next')}
				>
					<small>下一步</small>
				</button>
			</>
		);
	}
}

export default PayMethod;