import React from 'react';
import StepBar from './StepBar';
import MainContentBox from './MainContentBox';

class MainArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			mainContentTop: 0,
		};

		this.stepMap = {
			1: {
				title: '選擇付款方式',
				value: 'choose-pay-method',
			},
			2: {
				title: '填寫付款資訊',
				value: 'fill-in-info',
			},
			3: {
				title: {
					'default-show': '您的訂單已完成付款！',
					store: '您的訂單已成立！',
				},
				value: 'finish',
			},
		};

		this.handleChangeStep = this.handleChangeStep.bind(this);
		this.handleBackToFirstStep = this.handleBackToFirstStep.bind(this);
		this.handleGetMainContentTop = this.handleGetMainContentTop.bind(this);
	}

	componentDidUpdate() {
		if (this.stepMap[this.state.step].value === 'finish') {
			this.props.handleFinish(true);
		}
	}

	handleChangeStep(step) {
		this.setState({ step });
	}

	handleBackToFirstStep() {
		this.setState({ step: 1 });
		this.props.handleFinish(false);
	}

	handleGetMainContentTop(val) {
		this.props.handleGetTop(val);
		this.setState({ mainContentTop: val });
	}

	render() {
		return (
			<main
				className={this.props.className}
			>
				<StepBar
					steps={Object.keys(this.stepMap).length}
					curStep={this.state.step}
					className="justify-content-center my-4"
				/>

				<MainContentBox
					curStep={this.state.step}
					stepMap={this.stepMap}
					handleGetTop={this.handleGetMainContentTop}
					handleChangeStep={this.handleChangeStep}
					handleBackToFirstStep={this.handleBackToFirstStep}
				/>
			</main>
		);
	}
}

export default MainArea;