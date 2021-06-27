import React from 'react';
import BasicCtrler from './BasicCtrler';

class ExpirationDateCtrler extends React.Component {
	render() {
		const curYear = new Date().getFullYear();
		const placeholder = {
			year: '選擇年',
			month: '選擇月',
		};
		const makeOptions = (type, { start, end }) => {
			let options = [placeholder[type]];
			for (let i = start; i <= end; i++) {
				options.push(i);
			}
			options = options.map((option) => (
				<option
					disabled={option === placeholder[type]}
					key={option}
					value={option}
				>
					{option}
				</option>
			));
			return options;
		};
		const yearOptions = makeOptions(
			'year',
			{ start: curYear, end: curYear + 10 },
		);
		const monthOptions = makeOptions(
			'month',
			{ start: 1, end: 12 },
		);
		
		let containerClassName = 'expiration-date-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		let selectorClassName = 'form-select';
		if (this.props.unvalid) {
			selectorClassName += ' border-danger';
		}
		
		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="有效月年"
					unvalid={this.props.unvalid}
					errorMsg="請選擇有效月年"
				>
					<div className="col-md-6 d-inline-flex align-items-center">
						<select
							className={selectorClassName}
							onChange={this.props.handleChange}
							value={this.props.yearVal}
							data-type="year"
						>
							{yearOptions}
						</select>
						<span className="mx-2">/</span>
						<select
							className={selectorClassName}
							onChange={this.props.handleChange}
							value={this.props.monthVal}
							data-type="month"
						>
							{monthOptions}
						</select>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default ExpirationDateCtrler;