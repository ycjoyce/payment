import React from 'react';
import BasicCtrler from './BasicCtrler';

class EmailCtrler extends React.Component {
	handleEmailChange = (e) => {
		this.props.getData({ email: e.target.value });
	}

	render() {
		const { className, unvalid } = this.props;
		const containerClassName = `email-ctrler ${className || ''}`;
		const inputClassName = `form-control ${unvalid && 'border-danger'}`;

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="填寫付款人信箱"
					errorMsg="請輸入正確信箱"
					unvalid={unvalid}
				>
					<div className="col-md-6">
						<input
							type="email"
							className={inputClassName}
							onChange={this.handleEmailChange}
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default EmailCtrler;