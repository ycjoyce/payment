import React from 'react';

class ShowCardLabel extends React.Component {
	render() {
		const labels = this.props.labels.map((label, index, arr) => {
			let className = 'card-label form-control-sketch';
			if (this.props.checked === label.title) {
				className += ' light';
			}
			if (index !== arr.length - 1) {
				className += ' me-1';
			}
			
			return (
				<img
					className={className}
					src={label.img.default}
					alt={label.title}
					data-label={label.title}
					key={label.title}
				/>
			);
		});

		let containerClassName = 'card-label-box d-flex';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		return (
			<div className={containerClassName}>
				{labels}
			</div>
		);
	}
}

export default ShowCardLabel;