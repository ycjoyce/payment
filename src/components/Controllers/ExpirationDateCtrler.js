import React from 'react';
import BasicCtrler from './BasicCtrler';

class ExpirationDateCtrler extends React.Component {
	constructor(props) {
		super(props);

		const { yearOptions, monthOptions } = this.getOptions(new Date().getFullYear());
		this.yearOptions = yearOptions;
		this.monthOptions = monthOptions;
	}

	getOptions(curYear) {
		const placeholder = {
			year: {
				title: '選擇年',
				value: 'placeholder',
			},
			month: {
				title: '選擇月',
				value: 'placeholder',
			},
		};
		const makeOptions = (type, { start, end }) => {
			let options = [placeholder[type]];
			for (let i = start; i <= end; i++) {
				options.push({
					title: i,
					value: i,
				});
			}
			options = options.map(({ value, title }) => (
				<option
					disabled={value === placeholder[type].value}
					key={value}
					value={value}
				>
					{title}
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
		
		return { yearOptions, monthOptions };
	}

	handleChange = (e) => {
		const type = e.target.dataset.type;
		const val = e.target.value;
		this.props.getData({ expiration: { [type]: val } });
	}

	render() {
		const {
			className,
			unvalid,
			expiration: { year, month },
		} = this.props;
		const containerClassName = `expiration-date-ctrler ${className || ''}`;
		const selectorClassName = `form-select ${(unvalid) && 'border-danger'}`;

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="有效月年"
					unvalid={unvalid}
					errorMsg="請選擇有效月年"
				>
					<div className="col-md-6 d-inline-flex align-items-center">
						<select
							className={selectorClassName}
							onChange={this.handleChange}
							value={year}
							data-type="year"
						>
							{this.yearOptions}
						</select>

						<span className="mx-2">/</span>

						<select
							className={selectorClassName}
							onChange={this.handleChange}
							value={month}
							data-type="month"
						>
							{this.monthOptions}
						</select>
					</div>
				</BasicCtrler>
			</div>
		);
	}
}

export default ExpirationDateCtrler;