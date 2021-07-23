import { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import { renderErrMsg } from '../../util';
import Label from './Label';

class EmailCtrler extends Component {
  renderEmail({ input, meta }) {
    const { error, touched } = meta;
		const inputClassName = `form-control ${(error && touched) && 'border-danger'}`;

    return (
      <Fragment>
        <input
          { ...input }
          type="email"
          className={inputClassName}
        />
        {renderErrMsg({ meta, rootEl: document.querySelector('#email-err') })}
      </Fragment>
    );
  }

  render() {
    return (
      <div className={`email-ctrler ${this.props.className || ''}`}>
        <Label>填寫付款人Email</Label>
        <div className="col-md-6">
          <Field 
            name="email"
            component={this.renderEmail}
          />
        </div>
        <div id="email-err"></div>
      </div>
    );
  }
}

export default EmailCtrler;