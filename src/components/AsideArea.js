import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';

class AsideArea extends Component {
	constructor(props) {
		super(props);
		this.state = { windowWidth: 0 };
		this.getWindowWidth = this.getWindowWidth.bind(this);
	}

	componentDidMount() {
		this.getWindowWidth();
		window.addEventListener('resize', this.getWindowWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.getWindowWidth);
	}

	getWindowWidth() {
		this.setState({ windowWidth: document.documentElement.offsetWidth });
	}

	renderFinish() {
		if (this.state.windowWidth < 576) {
			return null;
		}
		return (
			<Fragment>
				<p className="fs-4 d-inline-block title-spacing text-end me-4">
					<span className="decoration-item fw-light" data-side="top">|</span>
					<span className="d-block">Finish</span>
					<span className="decoration-item fw-light" data-side="bottom">|</span>
				</p>
				<div
					className="decoration-bg-box rounded-start rounded-3 bg-light"
				></div>
			</Fragment>
		);
	}

	renderContent() {
		if (!this.props.finish) {
			return <OrderInfo windowWidth={this.state.windowWidth} />;
		}
		return this.renderFinish();
	}

	render() {
		const basicClassName = `aside-area ${this.props.className || ''}`;
		if (!this.props.top) {
			return <aside className={basicClassName}></aside>;
		}
		return (
			<aside
				className={`
					${basicClassName}
					${this.props.finish ? ' d-flex justify-content-end' : ''}
				`}
				style={{ top: `${this.props.top}px` }}
			>
				{this.renderContent()}
			</aside>
		);
	}
}

function mapStateToProps(state) {
	const finishStepIdx = Object.values(state.steps).findIndex((step) => step.value === 'finish');
	if (finishStepIdx === -1) {
		return { finish: false };
	}
	return { finish: state.curStep === +Object.keys(state.steps)[finishStepIdx] };
}

export default connect(mapStateToProps)(AsideArea);