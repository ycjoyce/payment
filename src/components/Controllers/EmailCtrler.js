import React from 'react';
import BasicCtrler from './BasicCtrler';
import { validateEmail } from '../../assets/js/util';

class EmailCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			unvalid: {
				email: false,
			},
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
	}

	handleEmailChange(e) {
		const data = {
			email: e.target.value,
			unvalid: {
				email: !validateEmail(e.target.value),
			},
		};
		this.setState(data);
		if (typeof this.props.getEmail === 'function') {
			this.props.getEmail(data);
		}
	}

	render() {
		let containerClassName = 'email-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}
		let inputClassName = 'form-control';
		if (this.props.unvalid || this.state.unvalid.email) {
			inputClassName += ' border-danger';
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="填寫付款人信箱"
					errorMsg="請輸入正確信箱"
					unvalid={this.props.unvalid || this.state.unvalid.email}
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