import React from 'react';

class StepBar extends React.Component {
	render() {
		const steps = [];
		for (let i = 0; i < this.props.steps; i++) {
			let className = 'step-bar-item';
			if (i + 1 <= this.props.curStep) {
				className += ' bgc-sdr';
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

		return (
			<ol
				className="step-bar"
				onClick={this.props.handleClick}
			>
				{steps}
			</ol>
		);
	}
}

export default StepBar;