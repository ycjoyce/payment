import React from 'react';
import EmailCtrler from './EmailCtrler';

class ConfirmCheckCtrler extends React.Component {
	render() {
		let containerClassName = 'confirm-check-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		return (
			<div className={containerClassName}>
				<EmailCtrler
					value={this.props.email}
					handleChange={this.props.handleEmailChange}
					className="mb-4"
				/>
				<label className="confirm-check d-inline-flex">
					<input
						type="checkbox"
						checked={this.props.confirmCheck}
						onChange={this.props.handleConfirmCheck}
						className="form-check-input confirm-check-ctrler me-2 flex-shrink-0"
					/>
					<p className="form-check-label mb-0">
						請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的E-mail信箱
					</p>
				</label>
			</div>
		);
	}
}

export default ConfirmCheckCtrler;