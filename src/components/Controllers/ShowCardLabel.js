import React from 'react';

class ShowCardLabel extends React.Component {
	render() {
		const labels = this.props.labels.map((label) => {
			let className = 'card-label';
			if (this.props.checked === label.title) {
				className += ' light';
			}
			
			return (
				<input
					className={className}
					type="image"
					src={label.img.default}
					alt={label.title}
					data-label={label.title}
					key={label.title}
				/>
			);
		});

		return (
			<div className="card-label-box">
				{labels}
			</div>
		);
	}
}

export default ShowCardLabel;