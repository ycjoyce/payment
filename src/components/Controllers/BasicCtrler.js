import React from 'react';

class BasicCtrler extends React.Component {
	render() {
		return (
			<>
				<label className="form-label d-block">
					{this.props.title}
				</label>
				{this.props.children}
				{
					this.props.unvalid &&
					<small className="error-msg text-danger d-block">
						{this.props.errorMsg}
					</small>
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