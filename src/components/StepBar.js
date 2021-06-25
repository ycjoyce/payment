import React from 'react';

class StepBar extends React.Component {
	render() {
		const steps = [];
		for (let i = 0; i < this.props.steps; i++) {
			let className = 'step-bar-item badge p-0';
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

		let olClassName = 'step-bar d-flex flex-wrap ps-0';
		if (this.props.className) {
			olClassName += ` ${this.props.className}`;
		}

		return (
			<ol className={olClassName}>
				{steps}
			</ol>
		);
	}
}

export default StepBar;