import { Component } from 'react';
import { Field } from 'redux-form';

class InstallmentCtrler extends Component {
  renderInstallmentCtrler = ({ input, installment, className }) => {
    return (
      <label className={className || ''}>
        <input
          {...input}
          type="radio"
          value={installment.value}
          checked={installment.value === input.value}
          className="me-2 form-check-input"
        />
        {installment.title}
      </label>
    );
  }
  
  render() {
    return (
      <div className={`installment-ctrler ${this.props.className || ''}`}>
        <Field
          name="installment"
          component={this.renderInstallmentCtrler}
          installment={{ title: '一次付款', value: 'pay-once' }}
          className="me-3"
        />
        <Field
          name="installment"
          component={this.renderInstallmentCtrler}
          installment={{ title: '分期付款', value: 'installment-plan' }}
        />
      </div>
    );
  }
}

export default InstallmentCtrler;