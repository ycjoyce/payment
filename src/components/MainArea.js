import React from 'react';
import StepBar from './StepBar';
import MainContentBox from './MainContentBox';
import PayMethod from './stepContent/PayMethod';
import PayByCard from './stepContent/PayByCard';
import PayByWebATM from './stepContent/PayByWebATM';
import PayByStore from './stepContent/PayByStore';
import ShowFinish from './stepContent/ShowFinish';
import ShowStoreFinish from './stepContent/ShowStoreFinish';

class MainArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			payMethod: '',
			email: '',
			confirmCheck: false,
		};
		this.handleStepClick = this.handleStepClick.bind(this);
		this.handlePayMethodClick = this.handlePayMethodClick.bind(this);
		this.handleChangeStep = this.handleChangeStep.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleConfirmCheck = this.handleConfirmCheck.bind(this);
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

	handleEmailChange(e) {
		this.setState({
			email: e.target.value,
		});
	}

	handleConfirmCheck(e) {
		this.setState({
			confirmCheck: e.target.checked,
		});
	}

	render() {
		const payMethods = [
			{
				title: '信用卡/金融卡',
				value: 'credit-card',
				img: require('../assets/img/credit-card.svg'),
			},
			{
				title: '超商付款',
				value: 'convenience-store',
				img: require('../assets/img/shop.svg'),
			},
			{
				title: 'Web ATM',
				value: 'web-atm',
				img: require('../assets/img/web-atm.svg'),
			},
		];
		const showStoreFinishListItems = [
			{
				title: '付款超商',
				content: '全家便利商店',
			},
			{
				title: '付款代碼',
				content: 'HSD5DSK2349',
			},
			{
				title: '付款期限',
				content: '2021-07-25 23:59:59',
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
							email={this.state.email}
							handleEmailChange={this.handleEmailChange}
							confirmCheck={this.state.confirmCheck}
							handleConfirmCheck={this.handleConfirmCheck}
						/>
					),
					'convenience-store': (
						<PayByStore
							email={this.state.email}
							handleEmailChange={this.handleEmailChange}
							confirmCheck={this.state.confirmCheck}
							handleConfirmCheck={this.handleConfirmCheck}
							handleChangeStep={this.handleChangeStep}
						/>
					),
					'web-atm': (
						<PayByWebATM
							email={this.state.email}
							handleEmailChange={this.handleEmailChange}
							confirmCheck={this.state.confirmCheck}
							handleConfirmCheck={this.handleConfirmCheck}
							handleChangeStep={this.handleChangeStep}
						/>
					),
				},
			},
			3: {
				title: '您的訂單已完成付款',
				value: 'finish',
				content: {
					'default-show': (
						<ShowFinish/>
					),
					store: (
						<ShowStoreFinish
							listItems={showStoreFinishListItems}
						/>
					),
				},
			},
		};
		const curStep = this.state.step;
		const lastStepTitle = stepMap[Object.keys(stepMap).pop()].title;
		const titleStep = stepMap[curStep].title === lastStepTitle ? '' : `STEP${curStep}. `;
		const title = `${titleStep} ${stepMap[curStep].title}`;
		let subtitle = '';
		let content = stepMap[curStep].content;
		
		if (stepMap[curStep].value === 'fill-in-info') {
			subtitle = payMethods.find((method) => method.value === this.state.payMethod).title;
			content = stepMap[curStep].content[this.state.payMethod];
		}

		if (stepMap[curStep].value === 'finish') {
			if (this.state.payMethod === 'convenience-store') {
				content = stepMap[curStep].content.store;
			} else {
				content = stepMap[curStep].content['default-show'];
			}
		}

		this.stepLength = Object.keys(stepMap).length;

		return (
			<main className={this.props.className}>
				<StepBar
					steps={this.stepLength}
					curStep={curStep}
					className="justify-content-center my-4"
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

MainArea.defaultProps = {
	className: '',
};

export default MainArea;