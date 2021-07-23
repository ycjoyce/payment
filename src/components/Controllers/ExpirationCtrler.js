import { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import { renderErrMsg } from '../../util';
import Label from './Label';

class ExpirationCtrler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiration: { year: '', month: '' },
    };
    const { yearOptions, monthOptions } = this.renderOptions(new Date().getFullYear());
    this.yearOptions = yearOptions;
    this.monthOptions = monthOptions;
  }

  renderOptions(curYear) {
		const makeOptions = ({ start, end }) => {
			let options = [];
			for (let i = start; i <= end; i++) {
				options.push({
					title: i,
					value: i,
				});
			}
			options = options.map(({ value, title }) => (
				<option key={value} value={value}>
					{title}
				</option>
			));
			return options;
		};
		const yearOptions = makeOptions(
			{ start: curYear, end: curYear + 10 },
		);
		const monthOptions = makeOptions(
			{ start: 1, end: 12 },
		);
		
		return { yearOptions, monthOptions };
	}

  renderSelect({ input, meta, type }) {
    const selectorClassName = `
      form-select
      ${(meta.error && meta.touched) && ' border-danger'}
    `;
    const onSelectChange = (e) => {
      const { value, dataset: { type } } = e.target;
      this.setState(
        (state) => ({ expiration: { ...state.expiration, [type]: value } }),
        () => input.onChange(this.state.expiration)
      );
    };
    const typeMap = { year: '年', month: '月' };

    return (
      <select
        className={selectorClassName}
        onChange={onSelectChange}
        data-type={type}
        defaultValue="placeholder"
      >
        <option value="placeholder" disabled>
          {`選擇${typeMap[type]}`}
        </option>
        {this[`${type}Options`]}
      </select>
    );
  }

  renderExpiration = ({ input, meta }) => {
		return (
      <Fragment>
        {this.renderSelect({ input, meta, type: 'year' })}

        <span className="mx-2">/</span>

        {this.renderSelect({ input, meta, type: 'month' })}
        
        {renderErrMsg({ meta, rootEl: document.querySelector('#expiration-err') })}
      </Fragment>
    );
  }

  render() {
    return (
      <div className={`expiration-date-ctrler ${this.props.className || ''}`}>
        <Label>有效年月</Label>

        <div className="col-md-6 d-inline-flex align-items-center">
          <Field
            name="expiration"
            component={this.renderExpiration}
          />
        </div>

        <div id="expiration-err"></div>
      </div>
    );
  }
}

export default ExpirationCtrler;