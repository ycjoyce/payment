import React from 'react';
import BasicCtrler from './BasicCtrler';

class EmailCtrler extends React.Component {
	render() {
		let containerClassName = 'email-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler title="填寫付款人信箱">
					<div className="d-inline-block">
						<input
							type="email"
							value={this.props.value}
							className="form-control"
							onChange={this.props.handleChange}
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

EmailCtrler.defaultProps = {
	className: '',
};

export default EmailCtrler;