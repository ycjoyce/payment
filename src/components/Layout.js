import { Component } from 'react';
import { connect } from 'react-redux';
import { setCurStep } from '../actions';
import TitleBar from './TitleBar';
import AsideArea from './AsideArea';
import MainArea from './MainArea';

class Layout extends Component {
	state = { asideTop: 0 };
	
	componentDidUpdate() {
		if (!this.props.matchStep) {
			this.props.setCurStep(this.props.step.step);
		}
	}

	renderTitle() {
		const payMethodMap = {
			'credit-card': '信用卡 / 金融卡',
			'convenience-store': '超商付款',
			'web-atm': 'Web ATM',
		};

		let step = `STEP${this.props.step.step}`;
		let title = this.props.title.default;
		let subtitle = payMethodMap[this.props.subType];

		if (this.props.step.value === 'finish') {
			step = '';
			subtitle = null;

			if (this.props.subType === 'convenience-store') {
				title = this.props.title[this.props.subType];
			}
		}

		return (
			<TitleBar
				title={`${step}${title}`}
				subtitle={subtitle}
			/>
		);
	}

	render() {
		return (
			<div className="outer-container row g-0">
				<AsideArea
					top={this.state.asideTop}
					className="col-sm-3 align-self-start"
				/>

				<MainArea
					getMainContentTop={(top) => this.setState({ asideTop: top })}
					className="col-sm-9 d-flex flex-column"
				>
					{this.renderTitle()}
					{this.props.children}
				</MainArea>
			</div>
		);
	}
}

function mapStateToProps(state, { curPage }) {
	const [mainType, subType] = curPage.substr(1).split('/');
	const idx = Object.values(state.steps).findIndex((step) => step.value === mainType);
	const step = +Object.keys(state.steps)[idx];
	
	return {
		subType,
		step: { step, value: state.steps[step] ? state.steps[step].value : {} },
		title: state.steps[step] ? state.steps[step].title : {},
		matchStep: step === state.curStep,
	};
}

export default connect(
	mapStateToProps,
	{ setCurStep }
)(Layout);