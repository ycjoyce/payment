import React from 'react';
import EmailCtrler from './EmailCtrler';
import BasicCtrler from './BasicCtrler';

class ConfirmCheckCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmCheck: false,
			unvalid: {
				confirmCheckUnvalid: false,
			},
		};

		this.handleConfirmCheck = this.handleConfirmCheck.bind(this);
	}

	handleConfirmCheck(e) {
		const data = {
			confirmCheck: e.target.checked,
			unvalid: {
				confirmCheck: !e.target.checked,
			},
		};
		this.setState(data);
		this.props.getData(data);
	}

	render() {
		let containerClassName = 'confirm-check-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		return (
			<div className={containerClassName}>
				<EmailCtrler
					unvalid={this.props.emailUnvalid}
					getEmail={this.props.getData}
					className="mb-4"
				/>
				
				<BasicCtrler
					unvalid={this.props.confirmCheckUnvalid}
					errorMsg="請勾選"
				>
					<label className="confirm-check d-inline-flex">
						<input
							type="checkbox"
							checked={this.props.confirmCheck}
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