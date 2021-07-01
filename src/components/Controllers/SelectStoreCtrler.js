import React from 'react';
import BasicSelector from './BasicSelector';

class SelectStoreCtrler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: 'placeholder',
            unvalid: {
                store: false,
            },
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
		this.setState((state) => ({
			store: e.target.value,
			unvalid: {
				...state.unvalid,
				store: false,
			},
        }));
        if (typeof this.props.getData === 'function') {
            this.props.getData({
                store: e.target.value,
                unvalid: { store: false },
            });
        }
    }
    
    render() {
        let containerClassName = 'select-store-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
        }
        
        const stores = this.props.stores.map((store) => (
            <option
                key={store.value}
                value={store.value}
                disabled={store.value === 'placeholder'}
            >
                {store.title}
            </option>
        ));

        return (
            <BasicSelector
				className={containerClassName}
				title="付款超商"
				value={this.state.store}
				unvalid={this.state.unvalid.store || this.props.unvalid}
				errorMsg="請選擇付款超商"
				options={stores}
				handleChange={this.handleChange}
			/>
        );
    }
}

export default SelectStoreCtrler;