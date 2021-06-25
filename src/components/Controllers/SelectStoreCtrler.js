import React from 'react';
import BasicCtrler from './BasicCtrler';

class SelectStoreCtrler extends React.Component {
    render() {
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
            <BasicCtrler title="付款超商">
                <select
                    value={this.props.value}
                    onChange={this.props.handleChange}
                >
                    {stores}            
                </select>
            </BasicCtrler>
        );
    }
}

export default SelectStoreCtrler;