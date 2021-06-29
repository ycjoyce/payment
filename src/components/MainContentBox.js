import React from 'react';
import PayMethod from './stepContent/PayMethod';
import PayByCard from './stepContent/PayByCard';
import PayByWebATM from './stepContent/PayByWebATM';
import PayByStore from './stepContent/PayByStore';
import ShowFinish from './stepContent/ShowFinish';
import ShowStoreFinish from './stepContent/ShowStoreFinish';
import ConfirmCheckCtrler from './controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from './BtnsToChangeStep';
import { valiCheckBeforeSubmit } from '../assets/js/util';

class MainContentBox extends React.Component {
	constructor(props) {
		super(props);
		this.mainContent = React.createRef();
		this.state = {
			payMethod: '',
			submitMethod: null,
			email: '',
			confirmCheck: false,
			unvalid: {
				email: false,
				confirmCheck: false,
			},
		};
		this.payMethods = [
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

		this.handlePayMethodClick = this.handlePayMethodClick.bind(this);
		this.handleChangeStep = this.handleChangeStep.bind(this);
		this.getSubmitMethod = this.getSubmitMethod.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleConfirmCheck = this.handleConfirmCheck.bind(this);
		this.handleSetUnvalid = this.handleSetUnvalid.bind(this);
		this.getSubmittedData = this.getSubmittedData.bind(this);
		this.handleBackToFirstStep = this.handleBackToFirstStep.bind(this);
	}

	componentDidMount() {
		this.props.handleGetTop(this.mainContent.current.offsetTop);
	}

	getTitle(curStep) {
		let title = '';
		let subtitle = '';

		if (this.props.stepMap[curStep].value !== 'finish') {
			title = `STEP${curStep}. ${this.props.stepMap[curStep].title}`;
		} else {
			const type = this.state.payMethod === 'convenience-store' ? 'store' : 'default-show';
			title = this.props.stepMap[curStep].title[type];
		}
		
		if (this.props.stepMap[curStep].value === 'fill-in-info') {
			subtitle = this.payMethods.find((method) => method.value === this.state.payMethod).title;
		}

		return { title, subtitle };
	}

	getContent(curStep) {
		if (this.props.stepMap[curStep].value === 'choose-pay-method') {
			return <PayMethod
				methods={this.payMethods}
				checked={this.state.payMethod}
				handlePayMethodClick={this.handlePayMethodClick}
				handleChangeStep={this.handleChangeStep}
			/>;
		}
		if (this.props.stepMap[curStep].value === 'fill-in-info') {
			if (this.state.payMethod === 'credit-card') {
				return <PayByCard
					handleSubmitMethod={this.getSubmitMethod}
				/>
			}
			if (this.state.payMethod === 'convenience-store') {
				return <PayByStore
					handleSubmitMethod={this.getSubmitMethod}
					submitData={this.getSubmittedData}
				/>
			}
			if (this.state.payMethod === 'web-atm') {
				return <PayByWebATM
					handleSubmitMethod={this.getSubmitMethod}
				/>
			}
		}
		if (this.props.stepMap[curStep].value === 'finish') {
			if (this.state.payMethod === 'convenience-store') {
				return <ShowStoreFinish
					handleChangeStep={this.handleBackToFirstStep}
					listItems={[
						{
							title: '付款超商',
							content: this.submittedData.store,
						},
						{
							title: '付款代碼',
							content: this.submittedData.time,
						},
						{
							title: '付款期限',
							content: `${new Date(this.submittedData.time).toLocaleDateString()} ${new Date(this.submittedData.time).toLocaleTimeString()}`,
						},
					]}
				/>
			}
			return <ShowFinish
				handleChangeStep={this.handleBackToFirstStep}
			/>
		}
		return undefined;
	}
	
	handleBackToFirstStep () {
		this.setState({
			payMethod: '',
		});
		this.initConfirmData();
		this.props.handleBackToFirstStep();
	}

	handlePayMethodClick(payMethod) {
		this.setState({
			payMethod,
		});
	}

	getSubmitMethod(val) {
		this.setState({
			submitMethod: val,
		});
	}

	getSubmittedData(data) {
		this.submittedData = data;
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
		if (direction === 'next' && this.props.curStep < Object.keys(this.props.stepMap).length) {
			this.props.handleChangeStep(this.props.curStep + 1);
			return;
		}
		if (direction === 'prev' && this.props.curStep > 1) {
			this.props.handleChangeStep(this.props.curStep - 1);
			return;
		}
	}

	handleSubmit() {
		if (typeof this.state.submitMethod !== 'function') {
			return;
		}
		const err = this.state.submitMethod();
		valiCheckBeforeSubmit.call(this, err);
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

	handleSetUnvalid(col, val) {
		this.setState((state) => ({
			unvalid: {
				...state.unvalid,
				[col]: val,
			},
		}));
	}

	render() {
		const { title, subtitle } = this.getTitle(this.props.curStep);

		return (
			<div
				className="main-content shadow p-4 overflow-scroll flex-grow-1 bg-white"
				ref={this.mainContent}
			>
				<div className="content-title-bar text-center mb-4">
					<h2 className="content-title d-inline-block fs-4 title-bgc-secondary title-spacing">
						{title}
					</h2>

					{
						subtitle &&
						<small className="fw-bold d-block">
							{subtitle}
						</small>
					}
				</div>
				
				{this.getContent(this.props.curStep)}
				
				{
					this.props.stepMap[this.props.curStep].value === 'fill-in-info' &&
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
							handleSubmit={this.handleSubmit}
						/>
					</>
				}
			</div>
		);
	}
}

export default MainContentBox;