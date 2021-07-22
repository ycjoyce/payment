import React from 'react';
import BasicSelector from './BasicSelector';

class SelectStoreCtrler extends React.Component {
    handleChange = (e) => {
        this.props.getData(e.target.value);
    }
    
    render() {
        const { stores, className, value, unvalid } = this.props;
        const containerClassName = `select-store-ctrler ${className || ''}`;
        const options = stores.map((store) => (
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
				value={value}
				unvalid={unvalid}
				errorMsg="請選擇付款超商"
				options={options}
				handleChange={this.handleChange}
			/>
        );
    }
}

export default SelectStoreCtrler;