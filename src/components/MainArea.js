import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import StepBar from './StepBar';

class MainArea extends Component {
	mainContentRef = createRef();

	componentDidMount() {
		setTimeout(() => this.getMainContentTop(), 0);
	}

	getMainContentTop() {
		const { top } = this.mainContentRef.current.getBoundingClientRect();
		this.props.getMainContentTop(top);
	}

	render() {
		return (
			<main className={`main-area ${this.props.className || ''}`}>
				<StepBar className="justify-content-center my-4" />
				<div
					ref={this.mainContentRef}
					className="main-content shadow p-4 overflow-scroll flex-grow-1 bg-white"
				>
					{this.props.children}
				</div>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return { step: state.step };
}

export default connect(
	mapStateToProps
)(MainArea);