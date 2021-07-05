import React from 'react';
import StepBar from './StepBar';
import MainContentBox from './MainContentBox';

class MainArea extends React.Component {
	state = {
		step: 1,
		mainContentTop: 0,
	};

	stepMap = {
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

	handleChangeStep = (step) => {
		if (step === 'first') {
			this.setState({ step: 1 });
			this.props.handleFinish(false);
			return;
		}
		this.setState({ step });
	}

	handleGetMainContentTop = (val) => {
		this.props.handleGetTop(val);
		this.setState({ mainContentTop: val });
	}

	componentDidUpdate() {
		if (this.stepMap[this.state.step].value === 'finish') {
			this.props.handleFinish(true);
		}
	}

	render() {
		const { className } = this.props;
		const containerClassName = `main-area ${className || ''}`;

		return (
			<main
				className={containerClassName}
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
				/>
			</main>
		);
	}
}

export default MainArea;