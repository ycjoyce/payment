import React from 'react';
import PayMethod from './stepContent/PayMethod';
import PayByCard from './stepContent/PayByCard';
import PayByWebATM from './stepContent/PayByWebATM';
import PayByStore from './stepContent/PayByStore';
import ShowFinish from './stepContent/ShowFinish';
import ShowStoreFinish from './stepContent/ShowStoreFinish';
import ConfirmCheckCtrler from './controllers/ConfirmCheckCtrler';
import BtnsToChangeStep from './BtnsToChangeStep';
import { validCheckBeforeSubmit, setStateWithData, validateEmail } from '../assets/js/util';

class MainContentBox extends React.Component {
	constructor(props) {
		super(props);
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

		this.mainContent = React.createRef();

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

		this.handleChangeStep = this.handleChangeStep.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getSubmittedData = this.getSubmittedData.bind(this);
		this.handleBackToFirstStep = this.handleBackToFirstStep.bind(this);
	}

	getTitle(curStep) {
		const { stepMap } = this.props;
		const { payMethod } = this.state;
		let title = '';
		let subtitle = '';

		if (stepMap[curStep].value !== 'finish') {
			title = `STEP${curStep}. ${stepMap[curStep].title}`;
		} else {
			const type = payMethod === 'convenience-store' ? 'store' : 'default-show';
			title = stepMap[curStep].title[type];
		}
		
		if (stepMap[curStep].value === 'fill-in-info') {
			subtitle = this.payMethods.find((method) => method.value === payMethod).title;
		}

		return { title, subtitle };
	}

	getContent(curStep) {
		const { stepMap } = this.props;
		const { payMethod } = this.state;

		if (stepMap[curStep].value === 'choose-pay-method') {
			return <PayMethod
				methods={this.payMethods}
				checked={payMethod}
				handlePayMethodClick={setStateWithData.bind(this)}
				handleChangeStep={this.handleChangeStep}
			/>;
		}
		if (stepMap[curStep].value === 'fill-in-info') {
			if (payMethod === 'credit-card') {
				return <PayByCard
					getData={setStateWithData}
					handleSubmitMethod={setStateWithData.bind(this)}
				/>
			}
			if (payMethod === 'convenience-store') {
				return <PayByStore
					handleSubmitMethod={setStateWithData.bind(this)}
					submitData={this.getSubmittedData}
				/>
			}
			if (payMethod === 'web-atm') {
				return <PayByWebATM
					handleSubmitMethod={setStateWithData.bind(this)}
				/>
			}
		}
		if (stepMap[curStep].value === 'finish') {
			if (payMethod === 'convenience-store') {
				if (!this.submittedData) {
					return undefined
				}
				const time = this.submittedData.time;
				const sevenDays = 1000 * 60 * 60 * 24 * 7;
				return <ShowStoreFinish
					handleChangeStep={this.handleBackToFirstStep}
					listItems={[
						{
							title: '付款超商',
							content: this.submittedData.store,
						},
						{
							title: '付款代碼',
							content: time,
						},
						{
							title: '付款期限',
							content: `${new Date(time + sevenDays).toLocaleDateString()} ${new Date(time).toLocaleTimeString()}`,
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
		this.setState({ payMethod: '' });
		this.initConfirmData();
		this.props.handleChangeStep('first');
	}

	handleChangeStep(direction) {
		const { curStep, stepMap } = this.props;
		if (!['next', 'prev'].includes(direction)) {
			return;
		}

		this.initConfirmData();
		if (direction === 'next' && curStep < Object.keys(stepMap).length) {
			this.props.handleChangeStep(curStep + 1);
			return;
		}
		if (direction === 'prev' && curStep > 1) {
			this.props.handleChangeStep(curStep - 1);
			return;
		}
	}

	handleSubmit() {
		if (typeof this.state.submitMethod !== 'function') {
			return;
		}
		const err = this.state.submitMethod();
		validCheckBeforeSubmit.call(this, err);
	}
	
	getSubmittedData(data) {
		this.submittedData = data;
	}

	componentDidMount() {
		this.props.handleGetTop(this.mainContent.current.offsetTop);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.email !== this.state.email) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					email: !validateEmail(state.email),
				},
			}));
			return;
		}
		if (prevState.confirmCheck !== this.state.confirmCheck) {
			this.setState((state) => ({
				unvalid: {
					...state.unvalid,
					confirmCheck: !state.confirmCheck,
				},
			}));
			return;
		}
	}

	render() {
		const { curStep, stepMap } = this.props;
		const { unvalid } = this.state;
		const { title, subtitle } = this.getTitle(curStep);

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
				
				{this.getContent(curStep)}
				
				{
					stepMap[curStep].value === 'fill-in-info' &&
					<>
						<ConfirmCheckCtrler
							unvalid={unvalid}
							getData={setStateWithData.bind(this)}
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