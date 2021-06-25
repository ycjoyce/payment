import React from 'react';

class BasicCtrler extends React.Component {
	render() {
		return (
			<>
				<label className="ctrler-title">
					{this.props.title}
				</label>
				{this.props.children}
				{
					this.props.unvalid &&
					<span className="error-msg text-sm">
						{this.props.errorMsg}
					</span>
				}
			</>
		);
	}
}

BasicCtrler.defaultProps = {
	unvalid: false,
	errorMsg: '',
};

export default BasicCtrler;