import { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import { renderErrMsg } from '../../util';
import bankList from '../../assets/bankList.json';
import Label from './Label';

class BankCtrler extends Component {

  renderOptions() {
    let banks = [ { code: 'placeholder', name: '選擇銀行' } ];
    banks = banks.concat(Object.values(bankList).flat());

    return banks.map((bank) => (
      <option key={bank.code} value={bank.code} disabled={bank.code === 'placeholder'}>
        {bank.name}
      </option>
    ));
  }

  renderBank = ({ input, meta }) => {
    const { error, touched } = meta;
    const onSelectChange = (e) => {
      const { value } = e.target;
      input.onChange(value);
    };

    return (
      <Fragment>
        <select
          defaultValue="placeholder"
          onChange={onSelectChange}
          className={`form-select ${(error && touched) && 'border-danger'}`}
        >
          {this.renderOptions()}
        </select>
        {renderErrMsg({ meta, rootEl: document.querySelector('#store-err') })}
      </Fragment>
    );
  }

  render() {
    return (
      <div className={`select-bank-ctrler ${this.props.className || ''}`}>
        <Label>付款銀行</Label>
        <div className="col-md-6">
          <Field
            name="bank"
            component={this.renderBank}
          />
        </div>
        <div id="bank-err"></div>
      </div>
    );
  }
}

export default BankCtrler;