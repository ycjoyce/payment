import React from 'react';
import BasicSelector from './BasicSelector';

class SelectStoreCtrler extends React.Component {
    render() {
        let containerClassName = 'confirm-check-ctrler';
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
				value={this.props.value}
				unvalid={this.props.unvalid}
				errorMsg="請選擇付款超商"
				options={stores}
				handleChange={this.props.handleChange}
			/>
        );
    }
}

export default SelectStoreCtrler;