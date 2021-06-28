import React from 'react';
import BasicCtrler from './BasicCtrler';

class BasicSelector extends React.Component {
    render() {
        let selectClassName = 'form-select';
        if (this.props.unvalid) {
            selectClassName += ' border-danger';
        }

        return (
            <div className={this.props.className || ''}>
                <BasicCtrler
					title={this.props.title}
					unvalid={this.props.unvalid}
					errorMsg={this.props.errorMsg}
				>
					<div className="col-md-6">
						<select
							value={this.props.value}
							className={selectClassName}
							onChange={this.props.handleChange}
						>
							{this.props.options}
						</select>
					</div>
				</BasicCtrler>
				
				{this.props.children}
            </div>
        );
    }
}

export default BasicSelector;