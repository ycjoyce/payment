import React from 'react';
import SelectBankCtrler from '../controllers/SelectBankCtrler';
import { valiCheckBeforeSubmit } from '../../assets/js/util';

class PayByWebATM extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bank: 'placeholder',
			unvalid: {
				bank: false,
			},
		};
		this.handleBankSelect = this.handleBankSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleBankSelect(e) {
		this.setState((state) => ({
			bank: e.target.value,
			unvalid: {
				...state.unvalid,
				bank: false,
			},
		}));
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
		valiCheckBeforeSubmit.call(this, err);
	}

	componentDidMount() {
		this.props.handleSubmitMethod(this.handleSubmit);
	}

  	render() {
		return (
			<>
				<SelectBankCtrler
					value={this.state.bank}
					unvalid={this.state.unvalid.bank}
					handleChange={this.handleBankSelect}
					className="mb-4"
				/>

				{this.props.children}
			</>
		);
	}
}

export default PayByWebATM;