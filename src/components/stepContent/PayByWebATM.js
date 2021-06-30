import React from 'react';
import bankList from '../../assets/bankList.json';
import SelectBankCtrler from '../controllers/SelectBankCtrler';

class PayByWebATM extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bank: 'placeholder',
			unvalid: {
				bank: false,
			},
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		const err = [];
		if (this.state.bank === 'placeholder') {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					bank: true,
				},
			}));
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
				unvalid={this.state.unvalid.bank}
				getData={this.props.getData.bind(this)}
				className="mb-4"
			/>
		);
	}
}

export default PayByWebATM;