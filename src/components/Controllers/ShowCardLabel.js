import React from 'react';

class ShowCardLabel extends React.Component {
	checkCardLabel(cardNum) {
		const firstTwoChar = cardNum.substr(0, 2);
		const firstThreeChar = cardNum.substr(0, 3);
		const firstFourChar = cardNum.substr(0, 4);
		
		if (cardNum.length !== 16 || this.props.unvalid) {
			return false;
		} 
		if (cardNum.startsWith('4')) {
			return 'visa';
		}
		if (+firstTwoChar >= 51 && +firstTwoChar <= 55) {
			return 'master-card';
		}
		if (firstFourChar === '1800' || firstFourChar === '2131' || (+firstThreeChar >= 300 && +firstThreeChar <= 399)) {
			return 'jcb';
		}
		return false;
	}

	render() {
		let containerClassName = 'card-label-box d-flex';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		const labels = this.props.labels.map((label, index, arr) => {
			let className = 'card-label form-control-sketch';
			if (this.checkCardLabel(this.props.cardNum) === label.title) {
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

		return (
			<div className={containerClassName}>
				{labels}
			</div>
		);
	}
}

export default ShowCardLabel;