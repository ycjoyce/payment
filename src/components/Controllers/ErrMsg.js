import { Component } from 'react';
import { createPortal } from 'react-dom';

class ErrMsg extends Component {
  constructor(props) {
    super(props);
    const small = document.createElement('small');
    small.className = 'error-msg text-danger d-block mt-1';
    this.el = small;
  }

  componentDidMount() {
    this.props.rootEl.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.rootEl.removeChild(this.el);
  }

  render() {
    return createPortal(
      this.props.children,
      this.el
    );
  }
}

export default ErrMsg;
