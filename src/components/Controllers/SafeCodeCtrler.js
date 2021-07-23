import { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import { renderErrMsg } from '../../util';
import Label from './Label';

class SafeCodeCtrler extends Component {
  renderSafeCode = ({ input, meta }) => {
    const inputClassName = `
      form-control
      ${(meta.error && meta.touched) && ' border-danger'}
    `;

    return (
      <Fragment>
        <input
          {...input}
          className={inputClassName}
          maxLength="3"
        />
        <img
          src={require('../../assets/img/back-three.svg').default}
          alt="背面末三碼"
          className="save-code-img form-control-sketch ms-3"
        />
        {renderErrMsg({ meta, rootEl: document.querySelector('#safe-code-err') })}
      </Fragment>
    );
  }

  render() {
    return (
      <div className={`safe-code-ctrler ${this.props.className || ''}`}>
        <Label>背面末三碼</Label>
        <div className="col-lg-3 d-inline-flex align-items-end">
          <Field
            name="safeCode"
            component={this.renderSafeCode}
          />
        </div>
        <div id="safe-code-err"></div>
      </div>
    );
  }
}

export default SafeCodeCtrler;

