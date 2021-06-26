import React from 'react';
import SelectBankCtrler from '../controllers/SelectBankCtrler';
import ConfirmCheckCtrler from '../controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from '../BtnsToChangeStep';

class PayByWebATM extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bank: '選擇銀行',
		};
		this.handleBankSelect = this.handleBankSelect.bind(this);
	}

	handleBankSelect(e) {
		this.setState({
			bank: e.target.value,
		});
	}

  render() {
		return (
			<>
				<SelectBankCtrler
					value={this.state.bank}
					handleChange={this.handleBankSelect}
					className="mb-4"
				/>

				<ConfirmCheckCtrler
					email={this.props.email}
					handleEmailChange={this.props.handleEmailChange}
					confirmCheck={this.props.confirmCheck}
					handleConfirmCheck={this.props.handleConfirmCheck}
					className="mb-4"
				/>

				<BtnsToChangeStep
					handleChangeStep={this.props.handleChangeStep}
				/>
			</>
		);
	}
}

export default PayByWebATM;