import React from 'react';
import StepBar from './StepBar';
import MainContentBox from './MainContentBox';
import PayMethod from './stepContent/PayMethod';
import PayByCard from './stepContent/PayByCard';

class MainArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			payMethod: '',
		};
		this.handleStepClick = this.handleStepClick.bind(this);
		this.handlePayMethodClick = this.handlePayMethodClick.bind(this);
		this.handleChangeStep = this.handleChangeStep.bind(this);
	}

	handleStepClick(e) {
		const step = e.target.dataset.step;
		this.setState({ step });
	}

	handlePayMethodClick(payMethod) {
		this.setState({ payMethod });
	}

	handleChangeStep(direction) {
		switch (direction) {
			case 'next':
				if (this.state.step < this.stepLength) {
					this.setState((state) => (
						{ step: state.step + 1 }
					));
				}
				break;
			case 'prev':
				if (this.state.step > 1) {
					this.setState((state) => (
						{ step: state.step - 1 }
					));
				}
				break;
			default:
				break;
		}
	}

	render() {
		const payMethods = [
			{
				title: '信用卡/金融卡',
				value: 'credit-card',
			},
			{
				title: '超商付款',
				value: 'convenience-store',
			},
			{
				title: 'Web ATM',
				value: 'web-atm',
			},
		];
		const stepMap = {
			1: {
				title: '選擇付款方式',
				value: 'choose-pay-method',
				content: (
					<PayMethod
						methods={payMethods}
						checked={this.state.payMethod}
						handlePayMethodClick={this.handlePayMethodClick}
						handleChangeStep={this.handleChangeStep}
					/>
				),
			},
			2: {
				title: '填寫付款資訊',
				value: 'fill-in-info',
				content: {
					'credit-card': (
						<PayByCard
							handleChangeStep={this.handleChangeStep}
						/>
					),
					'convenience-store': '',
					'web-atm': '',
				},
			},
			3: {
				title: '您的訂單已完成付款',
				value: 'finish',
				content: '',
			},
		};
		const curStep = this.state.step;
		const lastStepTitle = stepMap[Object.keys(stepMap).pop()].title;
		const titleStep = stepMap[curStep].title === lastStepTitle ? '' : `STEP${curStep}. `;
		const title = `${titleStep}${stepMap[curStep].title}`;
		let subtitle = '';
		let content = stepMap[curStep].content;
		
		if (stepMap[curStep].value === 'fill-in-info') {
			subtitle = payMethods.find((method) => method.value === this.state.payMethod).title;
			content = stepMap[curStep].content[this.state.payMethod];
		}

		this.stepLength = Object.keys(stepMap).length;

		return (
			<main>
				<StepBar
					steps={this.stepLength}
					curStep={curStep}
					handleClick={this.handleStepClick}
				/>

				<MainContentBox
					title={title}
					subtitle={subtitle}
				>
					{content}
				</MainContentBox>
			</main>
		);
	}
}

export default MainArea;