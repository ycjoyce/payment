import React from 'react';
import BasicCtrler from './BasicCtrler';

class EmailCtrler extends React.Component {
	render() {
		return (
			<BasicCtrler title="填寫付款人信箱">
				<input
					type="email"
					value={this.props.value}
					onChange={this.props.handleChange}
				/>
			</BasicCtrler>
		);
	}
}

export default EmailCtrler;