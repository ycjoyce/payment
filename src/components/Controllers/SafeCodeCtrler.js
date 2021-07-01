import React from 'react';
import BasicCtrler from './BasicCtrler';

class SafeCodeCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			safeCode: '',
			unvalid: {
				safeCode: false,
			},
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		if (Number.isNaN(+e.target.value)) {
			this.setState((state)=> ({
				unvalid: {
					...state.unvalid,
					safeCode: true,
				}
			}));
			if (typeof this.props.getData === 'function') {
				this.props.getData({
					unvalid: { safeCode: true },
				});
			}
			return;
		}
		this.setState((state)=> ({
			unvalid: {
				...state.unvalid,
				safeCode: false,
			},
			safeCode: e.target.value,
		}));
		if (typeof this.props.getData === 'function') {
			this.props.getData({
				safeCode: e.target.value,
				unvalid: { safeCode: false },
			});
		}
	}

	render() {
		let inputClassName = 'form-control';
		if (this.props.unvalid || this.state.unvalid.safeCode) {
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
					unvalid={this.props.unvalid || this.state.unvalid.safeCode}
					errorMsg="請輸入正確背面末三碼"
				>
					<div className="col-lg-3 d-inline-flex align-items-end">
						<input
							value={this.state.safeCode}
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