import React from 'react';

class InputChain extends React.Component {
    constructor(props) {
        super(props);

        this.inputRefs = [];
		for (let i = 0; i < this.props.length; i++) {
			this.inputRefs.push(React.createRef());
        }
    }

    componentDidUpdate(prevProps) {
		if (this.props.inputFocused !== prevProps.inputFocused) {
			if (prevProps.inputFocused === null || this.props.inputFocused === null) {
				return;
			}
			this.inputRefs[+this.props.inputFocused].current.focus();
		}
    }

    makeInputChain() {
        const inputChain = [];
        for (let i = 0; i < this.props.length; i++) {
			inputChain.push(
				<input
					type="text"
					maxLength={this.props.inputMaxLen}
					key={i}
					className={`${this.props.inputClassName} ${i !== this.props.length - 1 && ' me-2 me-sm-0 px-1 px-sm-2'}`}
					data-col={i}
					onInput={this.props.handleInput}
					onFocus={this.props.handleInputFocus}
					ref={this.inputRefs[i]}
				/>
			);
			if (i !== this.props.length - 1) {
				inputChain.push(
					<span
						className="mx-1 d-none d-sm-block"
						key={`${i}-span`}
					>
						—
					</span>
				);
			}
        }
        return inputChain;
    }

    render() {
        return (
            <>
                {this.makeInputChain()}
            </>
        );
    }
}

export default InputChain;