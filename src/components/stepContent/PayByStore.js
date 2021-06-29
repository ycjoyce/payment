import React from 'react';
import SelectStoreCtrler from '../controllers/SelectStoreCtrler';

class PayByStore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			store: 'placeholder',
			unvalid: {
				store: false,
			},
		};
		this.handleStoreSelect = this.handleStoreSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleStoreSelect(e) {
		this.setState((state) => ({
			store: e.target.value,
			unvalid: {
				...state.unvalid,
				store: false,
			},
		}));
	}

	handleSubmit() {
		const err = [];
		if (this.state.store === 'placeholder') {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					store: true,
				},
			}));
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
		this.props.handleSubmitMethod(this.handleSubmit);
	}

  	render() {
		this.stores = [
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
		
		return (
			<SelectStoreCtrler
				stores={this.stores}
				value={this.state.store}
				unvalid={this.state.unvalid.store}
				handleChange={this.handleStoreSelect}
				className="mb-4"
			/>
		);
	}
}

export default PayByStore;