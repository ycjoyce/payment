import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { getStores } from '../../actions';
import { renderErrMsg } from '../../util';
import Label from './Label';

class StoreCtrler extends Component {
  componentDidMount() {
    this.props.getStores();
  }

  renderOptions(stores) {
    const options = [{ value: 'placeholder', title: '選擇商店' }, ...stores];
    return options.map((store) => (
      <option
        key={store.value}
        value={store.value}
        disabled={store.value === 'placeholder'}
      >
        {store.title}
      </option>
    ));
  }

  renderStore = ({ input, meta, stores }) => {
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
          {this.renderOptions(stores)}
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
            stores={this.props.stores}
          />
        </div>
        <div id="store-err"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let stores = Object.entries(state.stores);

  if (stores.length < 1) {
    return { stores: [] };
  }

  stores = stores.map(([key, val]) => ({ value: key, title: val }));
  return { stores };
}

export default connect(
  mapStateToProps,
  { getStores }
)(StoreCtrler);