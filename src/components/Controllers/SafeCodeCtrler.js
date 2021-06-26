import React from 'react';
import BasicCtrler from './BasicCtrler';

class SafeCodeCtrler extends React.Component {
	render() {
		let inputClassName = 'form-control';
		if (this.props.unvalid) {
			inputClassName += ' border-danger';
		}
		
		let containerClassName = 'safe-code-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="背面末三碼"
					unvalid={this.props.unvalid}
					errorMsg="請輸入正確背面末三碼"
				>
					<div className="d-inline-flex align-items-end">
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
							className="save-code-img form-control-sketch ms-3"
						/>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

SafeCodeCtrler.defaultProps = {
	className: '',
};

export default SafeCodeCtrler;