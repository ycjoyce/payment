import { Component } from 'react';
import { Field } from 'redux-form';
import { renderErrMsg } from '../../util';

class ConfirmCheckCtrler extends Component {
  renderConfirmCheck({ input, meta }) {
    return (
      <label className="confirm-check d-inline-flex">
        <input
          { ...input }
          type="checkbox"
          className="form-check-input confirm-check-ctrler me-2 flex-shrink-0"
        />
        <p className="form-check-label mb-0">
          請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的E-mail信箱
        </p>
        {renderErrMsg({ meta, rootEl: document.querySelector('#confirm-check-err') })}
      </label>
    );
  }

  render() {
    return (
      <div className={`confirm-check-ctrler ${this.props.className || ''}`}>
        <Field
          name="confirmCheck"
          component={this.renderConfirmCheck} 
        />
        <div id="confirm-check-err"></div>
      </div>
    );
  }
}

export default ConfirmCheckCtrler;
