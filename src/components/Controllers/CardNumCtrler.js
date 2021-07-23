import { Component } from 'react';
import { connect } from 'react-redux';
import Label from './Label';
import CardNumInputChain from './CardNumInputChain';
import ShowCardLabels from './ShowCardLabels';

class CardNumCtrler extends Component {
  render() {
    return (
      <div className={`card-num-ctrler ${this.props.className || ''}`}>
        <Label>信用卡號</Label>

        <div className="d-flex flex-wrap flex-lg-nowrap align-items-end">
          <CardNumInputChain />

          <ShowCardLabels
            cardNum={this.props.cardNum}
            className="ms-lg-3 mt-lg-0 mt-2"
          />
        </div>

        <div id="card-num-err"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.form.Payment.values) {
    return { cardNum: '' };
  }
  const { cardNum } = state.form.Payment.values;
  return { cardNum: Object.values(cardNum).join('') };
}

export default connect(mapStateToProps)(CardNumCtrler);