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
			mainContentTop: 0,
		};

		this.storeSubmitData = {
			store: '',
			time: '',
		};

		this.handleStepClick = this.handleStepClick.bind(this);
		this.handlePayMethodClick = this.handlePayMethodClick.bind(this);
		this.handleChangeStep = this.handleChangeStep.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleConfirmCheck = this.handleConfirmCheck.bind(this);
		this.handleSubmitMethod = this.handleSubmitMethod.bind(this);
		this.handleSetUnvalid = this.handleSetUnvalid.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.handleBackToFirstStep = this.handleBackToFirstStep.bind(this);
		this.handleStoreSubmitData = this.handleStoreSubmitData.bind(this);
		this.handleGetMainContentTop = this.handleGetMainContentTop.bind(this);
	}

	componentDidUpdate() {
		if (this.stepMap[this.state.step].value === 'finish') {
			this.props.handleFinish(true);
		}
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

	handleBackToFirstStep () {
		this.setState({
			payMethod: '',
		});
		this.initConfirmData();
		this.setState({
			step: 1,
		});
		this.props.handleFinish(false);
	}

	handleChangeStep(direction) {
		if (!['next', 'prev'].includes(direction)) {
			return;
		}
		this.initConfirmData();
		if (direction === 'next' && this.state.step < Object.keys(this.stepMap).length) {
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

	handleStoreSubmitData(data) {
		this.storeSubmitData = data;
	}

	handleGetMainContentTop(val) {
		this.props.handleGetTop(val);
		this.setState({ mainContentTop: val });
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

		const submitDataTime = new Date(this.storeSubmitData.time);

		const showStoreFinishListItems = [
			{
				title: '付款超商',
				content: this.storeSubmitData.store,
			},
			{
				title: '付款代碼',
				content: this.storeSubmitData.time,
			},
			{
				title: '付款期限',
				content: `${submitDataTime.toLocaleDateString()} ${submitDataTime.toLocaleTimeString()}`,
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

		this.stepMap = {
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
							handleSubmitData={this.handleStoreSubmitData}
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
						<ShowFinish
							handleChangeStep={this.handleBackToFirstStep}
						/>
					),
					store: (
						<ShowStoreFinish
							listItems={showStoreFinishListItems}
							handleChangeStep={this.handleBackToFirstStep}
						/>
					),
				},
			},
		};

		const curStep = this.state.step;
		const lastStepTitle = this.stepMap[Object.keys(this.stepMap).pop()].title;
		const titleStep = this.stepMap[curStep].title === lastStepTitle ? '' : `STEP${curStep}. `;
		let title = '';
		let subtitle = '';
		let content = this.stepMap[curStep].content;
		
		if (this.stepMap[curStep].value === 'fill-in-info') {
			subtitle = payMethods.find((method) => method.value === this.state.payMethod).title;
			content = this.stepMap[curStep].content[this.state.payMethod];
		}

		if (this.stepMap[curStep].value === 'finish') {
			if (this.state.payMethod === 'convenience-store') {
				title = this.stepMap[curStep].title.store;
				content = this.stepMap[curStep].content.store;
			} else {
				title = this.stepMap[curStep].title['default-show'];
				content = this.stepMap[curStep].content['default-show'];
			}
		} else {
			title = `${titleStep} ${this.stepMap[curStep].title}`
		}

		return (
			<main
				className={this.props.className}
			>
				<StepBar
					steps={Object.keys(this.stepMap).length}
					curStep={curStep}
					className="justify-content-center my-4"
				/>

				<MainContentBox
					title={title}
					subtitle={subtitle}
					handleGetTop={this.handleGetMainContentTop}
				>
					{content}
				</MainContentBox>
			</main>
		);
	}
}

export default MainArea;