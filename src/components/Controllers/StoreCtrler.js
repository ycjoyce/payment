import { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import { renderErrMsg } from '../../util';
import Label from './Label';

class StoreCtrler extends Component {
  stores = [
		{
			value: 'placeholder',
			title: '選擇商店',
		},
		{
			value: '7-11',
			title: '7-11',
		},
		{
			value: 'fami-mart',
			title: '全家',
		},
		{
			value: 'hi-life',
			title: '萊爾富',
		},
		{
			value: 'ok-mart',
			title: 'OK mart',
		}
	];

  renderOptions() {
    return this.stores.map((store) => (
      <option key={store.value} value={store.value}>
        {store.title}
      </option>
    ));
  }

  renderStore = ({ input, meta }) => {
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
      <div className={`select-store-ctrler ${this.props.className || ''}`}>
        <Label>付款超商</Label>
        <div className="col-md-6">
          <Field
            name="store"
            component={this.renderStore}
          />
        </div>
        <div id="store-err"></div>
      </div>
    );
  }
}

export default StoreCtrler;