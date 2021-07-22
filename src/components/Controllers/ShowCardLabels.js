import { Component } from 'react';

class ShowCardLabels extends Component {
  labels = [
		{
			title: 'visa',
			img: require('../../assets/img/visa.svg'),
		},
		{
			title: 'master-card',
			img: require('../../assets/img/mastercard.svg'),
		},
		{
			title: 'jcb',
			img: require('../../assets/img/jcb.svg'),
		}
	];

  checkCardLabel(cardNum) {
    if (cardNum.includes(undefined)) {
      return false;
    }
    
    const newCardNum = cardNum.join('');
    if (Number.isNaN(+newCardNum)) {
      return false;
    }

		const firstTwoChar = newCardNum.substr(0, 2);
		const firstThreeChar = newCardNum.substr(0, 3);
		const firstFourChar = newCardNum.substr(0, 4);
		
		if (newCardNum.length !== 16) {
			return false;
		} 
		if (newCardNum.startsWith('4')) {
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

  renderLabels() {
    const { cardNum } = this.props;

    if (!cardNum) {
      return null;
    }

		return this.labels.map((label, index, arr) => {
			const className = `
        card-label form-control-sketch
        ${this.checkCardLabel(cardNum) === label.title ? ' light' : ''}
        ${index !== arr.length - 1 ? ' me-1' : ''}
      `;
			
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
	}

  render() {
		return (
			<div className={`card-label-box d-flex ${this.props.className || ''}`}>
				{this.renderLabels()}
			</div>
		);
	}
}

export default ShowCardLabels;