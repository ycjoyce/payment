import React from 'react';
import BasicCtrler from './BasicCtrler';

class ExpirationDateCtrler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expiration: {
				year: 'placeholder',
				month: 'placeholder',
			},
			unvalid: {
				expiration: false,
			},
		};

		const { yearOptions, monthOptions } = this.getOptions(new Date().getFullYear());
		this.yearOptions = yearOptions;
		this.monthOptions = monthOptions;

		this.handleChange = this.handleChange.bind(this);
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
			options = options.map((option) => (
				<option
					disabled={option.value === placeholder[type].value}
					key={option.value}
					value={option.value}
				>
					{option.title}
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

	handleChange(e) {
		const type = e.target.dataset.type;
		const val = e.target.value;
		this.setState(
			(state) => ({
				expiration: {
					...state.expiration,
					[type]: val,
				},
			}),
			() => {
				const { year, month } = this.state.expiration;
				if (typeof this.props.getData === 'function') {
					this.props.getData({
						expiration: { year, month },
					});
				}
				
				if (!Number.isNaN(+year) && !Number.isNaN(+month)) {
					this.setState((state)=> ({
						unvalid: {
							...state.unvalid,
							expiration: false,
						}
					}));
					if (typeof this.props.getData === 'function') {
						this.props.getData({
							unvalid: { expiration: false },
						});
					}
				}
			}
		);
	}

	render() {
		let containerClassName = 'expiration-date-ctrler';
		if (this.props.className) {
			containerClassName += ` ${this.props.className}`;
		}

		let selectorClassName = 'form-select';
		if (this.props.unvalid || this.state.unvalid.expiration) {
			selectorClassName += ' border-danger';
		}

		return (
			<div className={containerClassName}>
				<BasicCtrler
					title="有效月年"
					unvalid={this.props.unvalid || this.state.unvalid.expiration}
					errorMsg="請選擇有效月年"
				>
					<div className="col-md-6 d-inline-flex align-items-center">
						<select
							className={selectorClassName}
							onChange={this.handleChange}
							value={this.state.expiration.year}
							data-type="year"
						>
							{this.yearOptions}
						</select>

						<span className="mx-2">/</span>

						<select
							className={selectorClassName}
							onChange={this.handleChange}
							value={this.state.expiration.month}
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