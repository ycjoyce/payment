import React from 'react';
import BasicCtrler from './BasicCtrler';

class SafeCodeCtrler extends React.Component {
	render() {
		let inputClassName = 'form-ctrler';
		if (this.props.unvalid) {
			inputClassName += ' error';
		}

		return (
			<BasicCtrler
				title="背面末三碼"
				unvalid={this.props.unvalid}
				errorMsg="請輸入正確背面末三碼"
			>
				<input
					value={this.props.value}
					onChange={this.props.handleChange}
					type="text"
					className={inputClassName}
					maxLength="3"
				/>
				<img
					src={require('../../assets/img/back-three.svg').default}
					alt="背面末三碼"
					className="save-code-sketch"
				/>
			</BasicCtrler>
		);
	}
}

export default SafeCodeCtrler;