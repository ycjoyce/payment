import React from 'react';

class BtnsToChangeStep extends React.Component {
  render() {
		return (
			<div>
				<button
					className="btn btn-solid-sdr corner-round-sm"
					onClick={() => this.props.handleChangeStep('prev')}
				>
					回上一步
				</button>

				<button
					className="btn btn-solid-pmr corner-round-sm"
					onClick={() => this.props.handleChangeStep('next')}
				>
					確認付款
				</button>
			</div>
		);
	}
}

export default BtnsToChangeStep;