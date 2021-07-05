import React from 'react';

class StepBar extends React.Component {
	makeSteps() {
		const steps = [];

		for (let i = 0; i < this.props.steps; i++) {
			let className = 'step-bar-item badge rounded-circle p-0';
			if (i + 1 <= this.props.curStep) {
				className += ' bg-secondary';
			} else {
				className += ' bg-info';
			}

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
		const { className } = this.props;
		const containerClassName = `step-bar d-flex flex-wrap ps-0 ${className || ''}`;

		return (
			<ol className={containerClassName}>
				{this.makeSteps()}
			</ol>
		);
	}
}

export default StepBar;