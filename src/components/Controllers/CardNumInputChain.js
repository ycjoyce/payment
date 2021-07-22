import { Component, Fragment, createRef } from 'react';
import { Field } from 'redux-form';

class CardNumInputChain extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = [];
    for (let i = 0; i < 4; i++) {
      this.inputRefs.push(createRef());
    }
  }

  cardNum = { 1: '', 2: '', 3: '', 4: '' };

  renderInput = ({ idx, input, last }) => {
    const onChange = () => {
      input.onChange(this.cardNum);
    };

    const onInputChange = (e) => {
      const idx = +e.target.dataset.idx;
      if (e.target.value.length > 3) {
        this.inputRefs[idx + 1 > 3 ? idx : idx + 1].current.focus();
      }
      this.cardNum[idx + 1] = e.target.value;
      onChange();
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

  renderInputChain = ({ input }) => {
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
