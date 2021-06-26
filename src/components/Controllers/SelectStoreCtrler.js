import React from 'react';
import BasicCtrler from './BasicCtrler';

class SelectStoreCtrler extends React.Component {
    render() {
        let containerClassName = 'confirm-check-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
        }
        
        const placeholder = '選擇商店';
        let stores = [
            placeholder,
            '7-11',
            '全家',
            '萊爾富',
            'OK mart',
        ];
        stores = stores.map((store) => (
            <option
                key={store}
                value={store}
                disabled={store === placeholder}
            >
                {store}
            </option>
        ));

        return (
            <div className={containerClassName}>
                <BasicCtrler title="付款超商">
                    <div className="col-md-6">
                        <select
                            value={this.props.value}
                            className="form-select"
                            onChange={this.props.handleChange}
                        >
                            {stores}            
                        </select>
                    </div>
                </BasicCtrler>
            </div>
        );
    }
}

export default SelectStoreCtrler;