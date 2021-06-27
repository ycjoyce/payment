import React from 'react';

class BtnsToChangeStep extends React.Component {
  render() {
		return (
			<div className="d-flex justify-content-between">
				<button
					className="btn btn-secondary"
					onClick={() => this.props.handleChangeStep('prev')}
				>
					<small>回上一步</small>
				</button>

				<button
					className="btn btn-primary text-white"
					onClick={this.props.handleSubmit}
				>
					<small>確認付款</small>
				</button>
			</div>
		);
	}
}

export default BtnsToChangeStep;