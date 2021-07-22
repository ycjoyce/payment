import React from 'react';
import BasicCtrler from './BasicCtrler';

class SafeCodeCtrler extends React.Component {
	handleChange = (e) => {
		this.props.getData({ safeCode: e.target.value });
	}

	render() {
		const { unvalid, className, safeCode } = this.props;
		const containerClassName = `safe-code-ctrler ${className || ''}`;
		const inputClassName = `form-control ${unvalid && 'border-danger'}`;

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="背面末三碼"
					unvalid={unvalid}
					errorMsg="請輸入正確背面末三碼"
				>
					<div className="col-lg-3 d-inline-flex align-items-end">
						<input
							value={safeCode}
							onChange={this.handleChange}
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

export default SafeCodeCtrler;