import React from 'react';
import bankList from '../../assets/bankList.json';
import SelectBankCtrler from '../controllers/SelectBankCtrler';

class PayByWebATM extends React.Component {
	state = {
		bank: 'placeholder',
		unvalid: { bank: false },
	};

	handleBankSelect = (bank) => {
		this.setState({
			bank,
			unvalid: { bank: bank === 'placeholder' },
		});
	}

	handleSubmit = (e) => {
		const err = [];
		if (this.state.bank === 'placeholder') {
			this.setState({
				unvalid: { bank: true },
			});
			err.push('bank');
		}
		return err;
	}

	componentDidMount() {
		this.props.handleSubmitMethod({ submitMethod: this.handleSubmit });
	}

  	render() {
		return (
			<SelectBankCtrler
				bankList={bankList}
				bank={this.state.bank}
				unvalid={this.state.unvalid.bank}
				getData={this.handleBankSelect}
				className="mb-4"
			/>
		);
	}
}

export default PayByWebATM;