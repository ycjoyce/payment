import React from 'react';
import BasicCtrler from './BasicCtrler';
import { validateEmail } from '../../assets/js/util';

class EmailCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			emailUnvalid: false,
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
	}

	handleEmailChange(e) {
		const data = {
			email: e.target.value,
			emailUnvalid: !validateEmail(e.target.value),
		};
		this.setState(data);
		this.props.getEmail(data);
	}

	render() {
		let containerClassName = 'email-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}
		let inputClassName = 'form-control';
		if (this.props.unvalid || this.state.unvalid) {
			inputClassName += ' border-danger';
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="填寫付款人信箱"
					errorMsg="請輸入正確信箱"
					unvalid={this.props.unvalid || this.state.unvalid}
				>
					<div className="col-md-6">
						<input
							type="email"
							value={this.state.email}
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