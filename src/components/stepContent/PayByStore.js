import React from 'react';
import SelectStoreCtrler from '../controllers/SelectStoreCtrler';

class PayByStore extends React.Component {
	state = {
		store: 'placeholder',
		unvalid: {
			store: false,
		},
	};
	
	stores = [
		{
			value: 'placeholder',
			title: '選擇商店',
		},
		{
			value: '7-11',
			title: '7-11',
		},
		{
			value: 'fami-mart',
			title: '全家',
		},
		{
			value: 'hi-life',
			title: '萊爾富',
		},
		{
			value: 'ok-mart',
			title: 'OK mart',
		}
	];

	handleSelectStore = (store) => {
		this.setState({
			store,
			unvalid: { store: store === 'placeholder' },
		});
	}

	handleSubmit = () => {
		const err = [];
		if (this.state.store === 'placeholder') {
			this.setState({
				unvalid: { store: true },
			});
			err.push('store');
		}
		if (err.length < 1) {
			this.props.submitData({
				store: this.stores.find((store) => store.value === this.state.store).title,
				time: Date.now(),
			});
		}
		return err;
	}

	componentDidMount() {
		this.props.handleSubmitMethod({ submitMethod: this.handleSubmit });
	}

  	render() {
		return (
			<SelectStoreCtrler
				stores={this.stores}
				value={this.state.store}
				unvalid={this.state.unvalid.store}
				getData={this.handleSelectStore}
				className="mb-4"
			/>
		);
	}
}

export default PayByStore;