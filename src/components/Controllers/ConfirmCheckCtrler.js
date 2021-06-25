import React from 'react';
import EmailCtrler from './EmailCtrler';

class ConfirmCheckCtrler extends React.Component {
	render() {
		return (
			<>
				<EmailCtrler
					value={this.props.email}
					handleChange={this.props.handleEmailChange}
				/>
				<label className="confirm-check">
					<input
						type="checkbox"
						checked={this.props.confirmCheck}
						onChange={this.props.handleConfirmCheck}
						className="form-ctrler confirm-check-ctrler"
					/>
					<p className="confirm-check-desc">
						請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的E-mail信箱
					</p>
				</label>
			</>
		);
	}
}

export default ConfirmCheckCtrler;