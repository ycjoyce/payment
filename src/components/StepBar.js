import { Component } from 'react';
import { connect } from 'react-redux';

class StepBar extends Component {
	renderSteps() {
		const steps = [];

		for (let i = 0; i < this.props.steps; i++) {
			const bgc = i + 1 <= this.props.curStep ? 'bg-secondary' : 'bg-info';
			const className = `step-bar-item badge rounded-circle p-0 ${bgc}`;

			steps.push(
				<li
					key={i}
					className={className}
					data-step={i + 1}
				>
					{i + 1}
				</li>
			);
		}

		return steps;
	}

	render() {
		return (
			<ol
				className={`step-bar d-flex flex-wrap ps-0 ${this.props.className || ''}`}
			>
 				{this.renderSteps()}
 			</ol>
		);
	}
}

function mapStateToProps(state) {
	return {
		steps: Object.keys(state.steps).length,
		curStep: state.curStep,
	};
}

export default connect(mapStateToProps)(StepBar);