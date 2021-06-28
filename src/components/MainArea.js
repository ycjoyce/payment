import React from 'react';
import StepBar from './StepBar';
import MainContentBox from './MainContentBox';
import PayMethod from './stepContent/PayMethod';
import PayByCard from './stepContent/PayByCard';
import PayByWebATM from './stepContent/PayByWebATM';
import PayByStore from './stepContent/PayByStore';
import ShowFinish from './stepContent/ShowFinish';
import ShowStoreFinish from './stepContent/ShowStoreFinish';
import ConfirmCheckCtrler from './controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from './BtnsToChangeStep';

class MainArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			payMethod: '',
			email: '',
			confirmCheck: false,
			unvalid: {
				email: false,
				confirmCheck: false,
			},
			submitMethod: null,
		};
		this.handleStepClick = this.handleStepClick.bind(this);
		this.handlePayMethodClick = this.handlePayMethodClick.bind(this);
		this.handleChangeStep = this.handleChangeStep.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleConfirmCheck = this.handleConfirmCheck.bind(this);
		this.handleSubmitMethod = this.handleSubmitMethod.bind(this);
		this.handleSetUnvalid = this.handleSetUnvalid.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
	}

	handleStepClick(e) {
		const step = e.target.dataset.step;
		this.setState({ step });
	}

	handlePayMethodClick(payMethod) {
		this.setState({ payMethod });
	}

	initConfirmData() {
		this.setState({
			email: '',
			confirmCheck: false,
			unvalid: {
				email: false,
				confirmCheck: false,
			},
		});
	}

	handleChangeStep(direction) {
		if (!['next', 'prev'].includes(direction)) {
			return;
		}
		this.initConfirmData();
		if (direction === 'next' && this.state.step < this.stepLength) {
			this.setState((state) => (
				{ step: state.step + 1 }
			));
			return;
		}
		if (direction === 'prev' && this.state.step > 1) {
			this.setState((state) => (
				{ step: state.step - 1 }
			));
			return;
		}
	}

	handleEmailChange(e) {
		this.setState((state) => ({
			email: e.target.value,
			unvalid: {
				...state.unvalid,
				email: !this.validateEmail(e.target.value),
			},
		}));
	}

	validateEmail(email) {
		const rule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
		return rule.test(email);
	}

	handleConfirmCheck(e) {
		this.setState({
			confirmCheck: e.target.checked,
		});
		if (e.target.checked) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					confirmCheck: false,
				},
			}));
		}
	}

	handleSubmitMethod(val) {
		this.setState({
			submitMethod: val,
		});
	}

	handleSetUnvalid(col, val) {
		this.setState((state) => ({
			unvalid: {
				...state.unvalid,
				[col]: val,
			},
		}));
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

		const confirmArea = (
			<>
				<ConfirmCheckCtrler
					email={this.state.email}
					emailUnvalid={this.state.unvalid.email}
					confirmCheck={this.state.confirmCheck}
					confirmCheckUnvalid={this.state.unvalid.confirmCheck}
					handleEmailChange={this.handleEmailChange}
					handleConfirmCheck={this.handleConfirmCheck}
					className="mb-4"
				/>

				<BtnsToChangeStep
					handleChangeStep={this.handleChangeStep}
					handleSubmit={this.state.submitMethod}
				/>
			</>
		);

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
							email={this.state.email}
							confirmCheck={this.state.confirmCheck}
							validateEmail={this.validateEmail}
							handleSubmitMethod={this.handleSubmitMethod}
							handleChangeStep={this.handleChangeStep}
							handleSetUnvalid={this.handleSetUnvalid}
						>
							{confirmArea}
						</PayByCard>
					),
					'convenience-store': (
						<PayByStore
							email={this.state.email}
							confirmCheck={this.state.confirmCheck}
							validateEmail={this.validateEmail}
							handleSubmitMethod={this.handleSubmitMethod}
							handleChangeStep={this.handleChangeStep}
							handleSetUnvalid={this.handleSetUnvalid}
						>
							{confirmArea}
						</PayByStore>
					),
					'web-atm': (
						<PayByWebATM
							email={this.state.email}
							confirmCheck={this.state.confirmCheck}
							validateEmail={this.validateEmail}
							handleSubmitMethod={this.handleSubmitMethod}
							handleChangeStep={this.handleChangeStep}
							handleSetUnvalid={this.handleSetUnvalid}
						>
							{confirmArea}
						</PayByWebATM>
					),
				},
			},
			3: {
				title: {
					'default-show': '您的訂單已完成付款！',
					store: '您的訂單已成立！',
				},
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
		let title = '';
		let subtitle = '';
		let content = stepMap[curStep].content;
		
		if (stepMap[curStep].value === 'fill-in-info') {
			subtitle = payMethods.find((method) => method.value === this.state.payMethod).title;
			content = stepMap[curStep].content[this.state.payMethod];
		}

		if (stepMap[curStep].value === 'finish') {
			if (this.state.payMethod === 'convenience-store') {
				title = stepMap[curStep].title.store;
				content = stepMap[curStep].content.store;
			} else {
				title = stepMap[curStep].title['default-show'];
				content = stepMap[curStep].content['default-show'];
			}
		} else {
			title = `${titleStep} ${stepMap[curStep].title}`
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

export default MainArea;