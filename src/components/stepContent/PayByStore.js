import React from 'react';
import ConfirmCheckCtrler from '../controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from '../BtnsToChangeStep';
import SelectStoreCtrler from '../controllers/SelectStoreCtrler';

class PayByStore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			store: '選擇商店',
		};
		this.handleStoreSelect = this.handleStoreSelect.bind(this);
	}

	handleStoreSelect(e) {
		this.setState({
			store: e.target.value,
		});
	}

  render() {
		return (
			<>
				<SelectStoreCtrler
					value={this.state.store}
					handleChange={this.handleStoreSelect}
				/>
				<ConfirmCheckCtrler
					email={this.props.email}
					handleEmailChange={this.props.handleEmailChange}
					confirmCheck={this.props.confirmCheck}
					handleConfirmCheck={this.props.handleConfirmCheck}
				/>
				<BtnsToChangeStep
					handleChangeStep={this.props.handleChangeStep}
				/>
			</>
		);
	}
}

export default PayByStore;