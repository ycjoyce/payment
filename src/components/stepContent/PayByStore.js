import React from 'react';
import SelectStoreCtrler from '../controllers/SelectStoreCtrler';
import { valiCheckBeforeSubmit } from '../../assets/js/util';

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
		valiCheckBeforeSubmit.call(this, err);
	}

	componentDidMount() {
		this.props.handleSubmitMethod(this.handleSubmit);
	}

  	render() {
		const stores = [
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
			<>
				<SelectStoreCtrler
					stores={stores}
					value={this.state.store}
					unvalid={this.state.unvalid.store}
					handleChange={this.handleStoreSelect}
					className="mb-4"
				/>

				{this.props.children}
			</>
		);
	}
}

export default PayByStore;