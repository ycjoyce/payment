import React from 'react';
import EmailCtrler from './EmailCtrler';
import BasicCtrler from './BasicCtrler';

class ConfirmCheckCtrler extends React.Component {
	handleEmailChange = (email) => {
		this.props.getData(email);
	}

	handleConfirmCheck = (e) => {
		this.props.getData({ confirmCheck: e.target.checked });
	}

	render() {
		const {
			className,
			confirmCheck,
			unvalid,
		} = this.props;
		const containerClassName = `confirm-check-ctrler ${className || ''}`;

		return (
			<div className={containerClassName}>
				<EmailCtrler
					unvalid={unvalid.email}
					getData={this.handleEmailChange}
					className="mb-4"
				/>
				
				<BasicCtrler
					unvalid={unvalid.confirmCheck}
					errorMsg="請勾選"
				>
					<label className="confirm-check d-inline-flex">
						<input
							type="checkbox"
							checked={confirmCheck}
							onChange={this.handleConfirmCheck}
							className="form-check-input confirm-check-ctrler me-2 flex-shrink-0"
						/>
						<p className="form-check-label mb-0">
							請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的E-mail信箱
						</p>
					</label>
				</BasicCtrler>
			</div>
		);
	}
}

export default ConfirmCheckCtrler;