import { Component, Fragment, createRef } from 'react';
import { Field } from 'redux-form';
import ErrMsg from './ErrMsg';

class CardNumInputChain extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = [];
    for (let i = 0; i < 4; i++) {
      this.inputRefs.push(createRef());
    }

    this.state = {
      cardNum: { 1: '', 2: '', 3: '', 4: '' },
    };
  }

  renderInput = ({ idx, input, last = false }) => {
    const onInputChange = (e) => {
      const idx = +e.target.dataset.idx;
      if (e.target.value.length > 3) {
        this.inputRefs[idx + 1 > 3 ? idx : idx + 1].current.focus();
      }
      this.setState(
        (state) => {
          return {
            cardNum: { ...state.cardNum, [idx + 1]: e.target.value },
          };
        },
        () => input.onChange(this.state.cardNum)
      );
      input.onChange(this.state.cardNum);
    };

    return (
      <input
        maxLength={4}
        data-idx={idx}
        className={`form-control ${last && 'me-2 me-sm-0 px-1 px-sm-2'}`}
        ref={this.inputRefs[idx]}
        onChange={onInputChange}
      />
    );
  }

  renderInputChain = ({ input, meta }) => {
    const chain = [];

    for (let i = 0; i < 4; i++) {
      if (i !== 3) {
        chain.push(
          <Fragment key={i}>
            {this.renderInput({ idx: i, input, last: false })}
            <span className="mx-1 d-none d-sm-block">—</span>
          </Fragment>
        );
        continue;
      }
      chain.push(
        <Fragment key={i}>
          {this.renderInput({ idx: i, input, last: true })}
        </Fragment>
      );
    }

    if (meta.error && meta.touched) {
      chain.push(
        <ErrMsg
          key={meta.error}
          meta={meta}
          rootEl={document.querySelector('#card-num-err')}
        />
      );
    }

    return chain;
  }
  
  render() {
    return (
      <div className="d-flex align-items-center col-lg-6">
        <Field
          name="cardNum"
          component={this.renderInputChain}
        />
      </div>
    );
  }
}

export default CardNumInputChain;
