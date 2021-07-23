import { Link } from 'react-router-dom';

function BtnsToChangeStep() {
	return (
		<div className="d-flex justify-content-between">
			<Link
				to="/choose-pay-method"
				className="btn btn-secondary"
			>
				<small>回上一步</small>
			</Link>

			<button
				className="btn btn-primary text-white"
			>
				<small>確認付款</small>
			</button>
		</div>
	);
}

export default BtnsToChangeStep;