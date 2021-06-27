import React from 'react';
import BasicCtrler from './BasicCtrler';

class EmailCtrler extends React.Component {
	render() {
		let containerClassName = 'email-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}
		let inputClassName = 'form-control';
		if (this.props.unvalid) {
			inputClassName += ' border-danger';
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="填寫付款人信箱"
					errorMsg="請輸入正確信箱"
					unvalid={this.props.unvalid}
				>
					<div className="col-md-6">
						<input
							type="email"
							value={this.props.value}
							className={inputClassName}
							onChange={this.props.handleChange}
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default EmailCtrler;