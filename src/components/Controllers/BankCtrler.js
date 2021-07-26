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
        {`${bank.code === 'placeholder' ? '' : bank.code} ${bank.name}`}
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
        {renderErrMsg({ meta, rootEl: document.querySelector('#bank-err') })}
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
        <ol className="mt-4 ps-4">
          <li>
            請準備晶片金融卡＋晶片讀卡機，我們將引導您至指定金融機構之網路ATM進行交易手續。
          </li>
          <li>
            持對應機構之金融卡可享免跨行轉帳手續費，若無以上金融機構發行之金融卡，可自由選擇其一金融機構進行後續交易流程。
          </li>
        </ol>
      </div>
    );
  }
}

export default BankCtrler;